package com.controller;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

//This file/class is made for the usage of helping the frontend to route these different web pages.
// It's actually not belong to any of the backend service but help intergrate the frontend websites and the Spring server as a single server to deploy.

@Controller
public class HomeController {

    @RequestMapping({ "/*", "/admin/*", "/guest/dashboard/*", "/guest/category/*" })
    public String pageRouter() {
        return "index";
    }
}
