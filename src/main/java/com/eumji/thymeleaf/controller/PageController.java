package com.eumji.thymeleaf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

/**
 * eumji.eumji.indexPage.controller.PageController.java
 *
 * @desc 不积跬步无以至千里, 不积小流无以至千里
 * @author:EumJi
 * @year: 2017
 * @month: 03
 * @day: 26
 * @time: 2017/3/26
 */
@Controller
public class PageController {
    @RequestMapping("/page")
    public String page3(Model model){
        model.addAttribute("userName","张三");
        return "hello";
    }
    @RequestMapping("info/more")
    public String page2(){
        return "hello2";
    }

    @RequestMapping("sys/index")
    public String page(){
        return "sys/test";
    }

    @RequestMapping("sys/test")
    public String test(){
        return "sys/test";
    }


}
