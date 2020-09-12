package com.controller;

import java.io.IOException;

import com.model.Result;
import com.model.User;
import com.repositories.UserRepository;
import com.model.Avatar;
import com.model.Profile;
import com.service.AccountService;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/profile")
public class ProfileController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/viewprofile")
    public Profile getProfile(@RequestParam String email) {
        return accountService.getUserProfile(email);
    }

    @PutMapping("/updateAvatar")
    public Result updateAvatar(@RequestParam String email, @RequestParam(required = false) MultipartFile image)
            throws IOException {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        if (image == null) {
            result.setReason("Empty File!");
            result.setResult(false);
        }
        String filetype = image.getContentType();
        String type = filetype.substring(0, filetype.lastIndexOf("/"));
        if (!type.equals("image")) {
            result.setReason("Must be a image!");
            result.setResult(false);
            return result;
        }
        Avatar avatar = new Avatar(image.getOriginalFilename(), image.getContentType(), new Binary(image.getBytes()), image.getSize());
        user.getProfile().setAvatar(avatar);
        userRepository.save(user);
        result.setReason("Update sccuess!");
        result.setResult(true);
        return result;
    }

    @DeleteMapping("/deleteAvatar")
    public Result deleteAvatar(@RequestParam String email) {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        user.getProfile().removeAvatar();;
        userRepository.save(user);
        result.setReason("Delete success!");
        result.setResult(true);
        return result;
    }
}