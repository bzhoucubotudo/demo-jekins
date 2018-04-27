package com.eumji.thymeleaf.config;

/**
 * @author zhoub32 on 2018/4/13.
 */
import com.eumji.thymeleaf.Servlet.AdServlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServletConfigure {
    /**
     * 代码注册servlet(不需要@ServletComponentScan注解)
     */
    @Bean
    public ServletRegistrationBean servletRegistrationBean() {
        return new ServletRegistrationBean(new AdServlet(), "/servlet/adServlet");// ServletName默认值为首字母小写，即myServlet1
    }

}
