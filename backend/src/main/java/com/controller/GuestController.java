package com.controller;

import com.model.Profile;
import com.service.GuestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/guest")
public class GuestController {

    @Autowired
    private GuestService guestService;

    // Handle the request from frontend to get all the public content of a user
    @PostMapping("/showUserPublic")
    public Map<String, Map<String, List<String>>> findPubByLink(@RequestParam String link) {
        return guestService.showContent(link);
    }

    // Handle the requets from the frontend to get the profile of a user
    @PostMapping("/showUserProfile")
    public Profile findProfileByLink(@RequestParam String link) {
        return guestService.showProfile(link);
    }
}
