package com.controller;

import java.util.List;

import com.model.RegisterRequest;
import com.model.Result;
import com.model.User;
import com.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//Control account-related requests from the user's browser
@CrossOrigin("*")
@RestController
@RequestMapping("api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // get all user account
    @GetMapping("/show")
    public List<User> getAllUsers() {
        return accountService.getAllUsers();
    }

    // register as a normal user
    @PostMapping("/register")
    public Result register(@RequestBody RegisterRequest request) {
        return accountService.register(request);
    }

    // register as an administrator
    @PostMapping("/register-admin")
    public Result registerAdmin(@RequestParam String adminId, @RequestParam String email,
            @RequestParam String password) {
        return accountService.registerAdmin(adminId, email, password);
    }

    // Same login request for both users and administrators
    @PostMapping("/login")
    public Result login(@RequestParam String email, @RequestParam String password) {
        return accountService.login(email, password);
    }
}