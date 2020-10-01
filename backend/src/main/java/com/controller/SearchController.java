package com.controller;

import java.util.List;

import com.model.User;
import com.service.SearchService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    // Handle the request from the frontend for searching a user by the
    // administrator
    @GetMapping("/show")
    public List<User> showUser(@RequestParam String info) {
        return searchService.showUser(info);
    }
}
