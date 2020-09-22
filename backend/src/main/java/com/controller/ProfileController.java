package com.controller;

import java.io.IOException;

import com.model.Result;
import com.model.Profile;
import com.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin("*")
@RestController
@RequestMapping("api/profile")
public class ProfileController {


    @Autowired
    private ProfileService profileService;

    @PostMapping("/viewprofile")
    public Profile getProfile(@RequestParam String email) {
        return profileService.getUserProfile(email);
    }

    @PostMapping("/updateAvatar")
    public Result updateAvatar(@RequestParam String email, @RequestParam(required = false) MultipartFile image)
            throws IOException {
        return profileService.updateAvatar(email, image);
    }

    @PostMapping("/deleteAvatar")
    public Result deleteAvatar(@RequestParam String email) {
        return profileService.deleteAvatar(email);
    }

    @PostMapping("/updateProfile")
    public Result updateProfile(@RequestParam String email, @RequestParam String firstname, @RequestParam String lastname, @RequestParam String username) {
        return profileService.updateProfile(email, firstname, lastname, username);
    }

    @PostMapping("/generate-link")
    public String generateLink(@RequestParam String email){
        return profileService.generateLink(email);
    }
}