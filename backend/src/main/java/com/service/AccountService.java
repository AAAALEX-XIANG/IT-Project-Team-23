package com.service;

import java.util.List;

import com.model.Profile;
import com.model.RegisterRequest;
import com.model.Result;
import com.model.User;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//Service for handling queries for the database.
@Service
public class AccountService {

    @Autowired
    private UserRepository userRepository;
    
    public Result register(RegisterRequest request){
        User ifRegistered = userRepository.findByEmailaddress(request.getEmailaddress());
        Result result = new Result();
        if (ifRegistered != null) {
            result.setResult(false);
            result.setReason("Emailaddress already exists!");
            return result;
        }
        result.setResult(true);
        result.setReason("Success");
        Profile profile = new Profile(request.getFirstname(), request.getLastname(), request.getUsername());
        User user = new User(request.getEmailaddress(), request.getPassword(), profile);
        userRepository.save(user);
        return result;
    }

    

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Result login(String email, String password){
        Result result = new Result();
        User user = userRepository.findByEmailaddress(email);
        if (user == null) {
            result.setResult(false);
            result.setReason("Failure");
            return result;
        }
        if (!user.getPassword().equals(password)) {
            result.setResult(false);
            result.setReason("Failure");
            return result;
        } else {
            result.setResult(true);
            result.setReason("Success");
            return result;
        }
    }
}
