package com.service;

import java.io.IOException;

import com.model.Avatar;
import com.model.Profile;
import com.model.Result;
import com.model.User;
import com.repositories.UserRepository;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    // Update user's avatar on their profile page
    public Result updateAvatar(String email, MultipartFile image) throws IOException {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        if (image == null) {
            result.setReason("Empty File!");
            result.setResult(false);
            return result;
        }
        Avatar avatar = new Avatar(image.getOriginalFilename(), image.getContentType(), new Binary(image.getBytes()),
                image.getSize());
        user.getProfile().setAvatar(avatar);
        userRepository.save(user);
        result.setSuccess();
        return result;
    }

    // Delete user's avatar
    public Result deleteAvatar(String email) {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        user.getProfile().removeAvatar();
        userRepository.save(user);
        result.setReason("Delete success!");
        result.setResult(true);
        return result;
    }

    public Profile getUserProfile(String email) {
        User user = userRepository.findByEmailaddress(email);
        if (user == null) {
            return null;
        }
        return user.getProfile();
    }

    public Result updateProfile(String email, String firstname, String lastname, String username, String description) {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        if (user == null) {
            result.setResult(false);
            return result;
        }
        user.getProfile().setFirstname(firstname);
        user.getProfile().setLastname(lastname);
        user.getProfile().setUsername(username);
        user.getProfile().setDescription(description);
        userRepository.save(user);
        result.setSuccess();
        return result;
    }

    // A non-deteministic method to generate a sharable link for user
    public String generateLink(String email) {
        User user = userRepository.findByEmailaddress(email);
        String studentId = user.getStudentId();
        Profile profile = user.getProfile();
        profile.generateLink(email, studentId);
        userRepository.save(user);
        return profile.getLink();
    }
}
