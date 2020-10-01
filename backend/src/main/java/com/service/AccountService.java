package com.service;

import java.util.List;

import com.encoder.Md5Util;
import com.model.Administrator;
import com.model.Profile;
import com.model.RegisterRequest;
import com.model.Result;
import com.model.User;
import com.repositories.AdminRepository;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//Service for handling queries for the database.
@Service
public class AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    public Result register(RegisterRequest request) {
        Result result = new Result();

        // Check if email address already registered in the administrators' database
        Administrator ifRegisteredAdmin = adminRepository.findByEmailaddress(request.getEmailaddress());

        // Check if email address already registered in the students' database
        User ifRegisteredUser = userRepository.findByEmailaddress(request.getEmailaddress());

        if (ifRegisteredAdmin != null || ifRegisteredUser != null) {
            result.setResult(false);
            result.setReason("Emailaddress already exists!");
            return result;
        }

        // Check if student ID already registered in the student's database
        User ifRegisteredId = userRepository.findByStudentId(request.getStudentId());
        if (ifRegisteredId != null) {
            result.setResult(false);
            result.setReason("Student ID already exists!");
            return result;
        }

        // Register the user's information and create a profile
        result.setSuccess();
        Profile profile = new Profile(request.getFirstname(), request.getLastname(), request.getUsername());
        User user = new User(request.getStudentId(), request.getEmailaddress(), Md5Util.md5(request.getPassword()),
                profile);
        userRepository.save(user);
        return result;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Result login(String email, String password) {
        Result result = new Result();
        final String fail = "Login Failure";

        // Check if this login belongs to an administrator
        Administrator admin = adminRepository.findByEmailaddress(email);
        if (admin != null) {
            if (admin.getPassword().equals(Md5Util.md5(password))) {
                result.setResult(true);
                result.setReason("Administrator");
                return result;
            } else {
                result.setResult(false);
                result.setReason(fail);
                return result;
            }
        }
        // Check if it is a correct login for a standard user
        User user = userRepository.findByEmailaddress(email);
        if (user == null) {
            result.setResult(false);
            result.setReason(fail);
            return result;
        }
        if (!user.getPassword().equals(Md5Util.md5(password))) {
            result.setResult(false);
            result.setReason(fail);
            return result;
        } else {
            result.setResult(true);
            result.setReason("User");
            return result;
        }
    }

    // This method is used for registering adminsitrator in this system only
    // There should be no interface for user to call this methods.
    public Result registerAdmin(String id, String email, String password) {
        Result result = new Result();

        Administrator ifRegisteredId = adminRepository.findByAdminId(id);
        if (ifRegisteredId != null) {
            result.setReason("Admin ID already exist!");
            result.setResult(false);
            return result;
        }
        Administrator ifRegisteredEmail = adminRepository.findByEmailaddress(email);
        if (ifRegisteredEmail != null) {
            result.setReason("Email already exist");
            result.setResult(false);
            return result;
        }

        Administrator admin = new Administrator(id, email, Md5Util.md5(password));
        adminRepository.save(admin);
        result.setSuccess();
        return result;
    }
}
