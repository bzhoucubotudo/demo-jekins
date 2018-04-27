package com.eumji.thymeleaf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
@ComponentScan(value = "com.eumji.thymeleaf.*")
@SpringBootApplication
@ServletComponentScan
public class ThymeleafApplication {
    public static void main(String[] args) {
        SpringApplication.run(ThymeleafApplication.class,args);
    }
}
