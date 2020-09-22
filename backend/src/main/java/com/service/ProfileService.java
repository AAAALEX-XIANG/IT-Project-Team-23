package com.service;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.encoder.Md5Util;
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
            return result;
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

    public Result updateProfile(String email, String firstname, String lastname, String username) {
        User user = userRepository.findByEmailaddress(email);
        Result result = new Result();
        if (user == null) {
            result.setResult(false);
            return result;
        }
        user.getProfile().setFirstname(firstname);
        user.getProfile().setLastname(lastname);
        user.getProfile().setUsername(username);
        userRepository.save(user);
        result.setReason("Update success!");
        result.setResult(true);
        return result;
    } 


    public String generateLink(String email){
       User user = userRepository.findByEmailaddress(email);
       String studentId = user.getStudentId();
       Profile profile = user.getProfile();
       //getting current date time using calendar class
       DateFormat df = new SimpleDateFormat("dd/MM/yy HH:mm:ss"); 
       Calendar calobj = Calendar.getInstance();
       String date = df.format(calobj.getTime());
       String output = email + studentId + date;
       profile.setLink(output);
       userRepository.save(user);
       return Md5Util.md5(output);
    }
}
