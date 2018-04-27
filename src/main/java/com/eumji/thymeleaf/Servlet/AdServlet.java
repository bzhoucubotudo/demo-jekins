package com.eumji.thymeleaf.Servlet;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author zhoub32 on 2018/4/13.
 */
@WebServlet(name="adServlet",urlPatterns="/adServlet")
public class AdServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idStr = req.getParameter("id");
        Long id = Long.valueOf(idStr);
        System.out.println("huluwawa");
        //1、读取Mysql获取数据
        String content = null;
        try {
            content = queryDB(id);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
        }
        if(content != null) {
            //2.1、如果获取到，异步写Redis
//            asyncSetToRedis(idStr, content);
            setToRedis(idStr,content);
//            RedisUtils redisUtils = new RedisUtils();
//            try {
//                redisUtils.set(id, content);
//            }catch (Exception e){
//                e.printStackTrace();
//            }
            //2.2、如果获取到，把响应内容返回
            resp.setCharacterEncoding("UTF-8");
            resp.getWriter().write(content);
        } else {
            //2.3、如果获取不到，返回404状态码
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    private DruidDataSource datasource = null;
    private JedisPool jedisPool = null;

    {
        datasource = new DruidDataSource();
        datasource.setUrl("jdbc:mysql://116.62.164.81:3306/chapter6?useUnicode=true&characterEncoding=utf-8&autoReconnect=true");
        datasource.setUsername("root");
        datasource.setPassword("Pnt2017");
        datasource.setMaxActive(100);

        GenericObjectPoolConfig poolConfig = new GenericObjectPoolConfig();
        poolConfig.setMaxTotal(100);
        jedisPool = new JedisPool(poolConfig, "116.62.164.81", 6379,3600,"123");
//        jedisPool = new JedisPool(poolConfig, "116.62.164.81", 6379);
    }

    private String queryDB(Long id) throws Exception {
        Connection conn = null;
        try {
            conn = datasource.getConnection();
            String sql = "select content from ad_0 where sku_id = ?";
            PreparedStatement psst = conn.prepareStatement(sql);
            psst.setLong(1, id);
            ResultSet rs = psst.executeQuery();
            String content = null;
            if(rs.next()) {
                content = rs.getString("content");
                System.out.println("content: "+content);
            }
            rs.close();
            psst.close();
            return content;
        } catch (Exception e) {
            throw e;
        } finally {
            if(conn != null) {
                conn.close();
            }
        }
    }

    private ExecutorService executorService = Executors.newFixedThreadPool(10);
    private void asyncSetToRedis(final String id, final String content) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                Jedis jedis = null;
                try {
                    jedis = jedisPool.getResource();
                    jedis.setex(id, 5 * 60, content);//5分钟
                } catch (Exception e) {
                    e.printStackTrace();
                    jedisPool.returnBrokenResource(jedis);
                } finally {
                    jedisPool.returnResource(jedis);
                }

            }
        });
    }

    private void setToRedis( String id,  String content) {
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            jedis.setex(id, 5 * 60, content);//5分钟
        } catch (Exception e) {
            e.printStackTrace();
            jedisPool.returnBrokenResource(jedis);
        } finally {
            jedisPool.returnResource(jedis);
        }
    }
}
