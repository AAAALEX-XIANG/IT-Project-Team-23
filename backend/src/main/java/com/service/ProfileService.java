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


    public Result updateAvatar(String email, MultipartFile image) throws IOException {
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


    public Result deleteAvatar(String email) {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        user.getProfile().removeAvatar();;
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
}
