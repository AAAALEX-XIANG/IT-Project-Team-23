package com.controller;

import java.util.List;

import com.model.LoginRequest;
import com.model.RegisterRequest;
import com.model.RegisterResult;
import com.model.Result;
import com.model.User;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("Team-Of-Fate/ePortfolio")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    // get all user account
	@GetMapping("/show")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}



    // register
	@PostMapping("/register")
	public RegisterResult register(@RequestBody final RegisterRequest request) {
        User ifRegistered = userRepository.findByEmailaddress(request.getEmailaddress());
        RegisterResult result = new RegisterResult();
        if(ifRegistered != null){
            result.setResult(false);
            result.setReason("Emailaddress already exists!");
            return result;
        }
        result.setResult(true);
        result.setReason("Success");

        User user = new User(request.getFirstname(), request.getLastname(),  request.getPassword(), request.getEmailaddress(), request.getUsername());

        userRepository.save(user);
        return result;
    }

    

    
    @PostMapping("/login")
    public Result login(@RequestBody LoginRequest loginRequest) {

        Result result = new Result();
        User user = userRepository.findByEmailaddress(loginRequest.getEmailaddress());
        if(user == null){
            result.setResult(false);
            return result;
        }
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            result.setResult(false);
            return result;
        }
        else {
            result.setResult(true);
            return result;
        }
    }

    /*@GetMapping("/login/{username}")
    public User showUserInformation(@PathVariable String username) {

    } */
}