package com.spring.nasaApi.SpringNASAAPI.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping(value = {"/", "/home", "/fetch"})
    public String index(){
        return "index";
    }
}