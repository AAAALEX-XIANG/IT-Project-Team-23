package com.service;

import java.util.List;

import com.model.LoginRequest;
import com.model.RegisterRequest;
import com.model.RegisterResult;
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
    
    public RegisterResult register(RegisterRequest request){
        User ifRegistered = userRepository.findByEmailaddress(request.getEmailaddress());
        RegisterResult result = new RegisterResult();
        if (ifRegistered != null) {
            result.setResult(false);
            result.setReason("Emailaddress already exists!");
            return result;
        }
        result.setResult(true);
        result.setReason("Success");
        User user = new User(request.getFirstname(), request.getLastname(), request.getPassword(),
                request.getEmailaddress(), request.getUsername());
        userRepository.save(user);
        return result;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Result login(LoginRequest request){
        Result result = new Result();
        User user = userRepository.findByEmailaddress(request.getEmailaddress());
        if (user == null) {
            result.setResult(false);
            return result;
        }
        if (!user.getPassword().equals(request.getPassword())) {
            result.setResult(false);
            return result;
        } else {
            result.setResult(true);
            return result;
        }
    }
}
