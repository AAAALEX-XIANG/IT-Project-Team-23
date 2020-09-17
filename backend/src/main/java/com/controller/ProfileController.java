package com.controller;

import java.io.IOException;

import com.model.Result;
import com.model.Profile;
import com.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin("*")
@RestController
@RequestMapping("api/profile")
public class ProfileController {


    @Autowired
    private ProfileService profileService;

    @GetMapping("/viewprofile")
    public Profile getProfile(@RequestParam String email) {
        return profileService.getUserProfile(email);
    }

    @PutMapping("/updateAvatar")
    public Result updateAvatar(@RequestParam String email, @RequestParam(required = false) MultipartFile image)
            throws IOException {
        return profileService.updateAvatar(email, image);
    }

    @DeleteMapping("/deleteAvatar")
    public Result deleteAvatar(@RequestParam String email) {
        return profileService.deleteAvatar(email);
    }
}