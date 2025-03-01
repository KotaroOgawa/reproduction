package com.reproduction;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
 
    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/search")
    public String search() {
        return "search";
    }

}
