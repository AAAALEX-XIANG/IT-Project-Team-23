package com.service;

import java.util.ArrayList;
import java.util.List;

import com.model.User;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class SearchService {
    @Autowired 
    private UserRepository userRepository;
    public List<User> showUser(String info) {
        List<User> users = new ArrayList<>();
        User userId = userRepository.findByStudentId(info);
        User userEmail = userRepository.findByEmailaddress(info);
        List<User> userFirstname = userRepository.findUserByFirstname(info);
        List<User> userLastname = userRepository.findUserByLastname(info);
        List<User> userUsername = userRepository.findUserByUsername(info);
        if (userId!= null) {
            if (!users.contains(userId)) {
                users.add(userId);
            }
        }
        if (userEmail!= null) {
            if (!users.contains(userEmail)) {
                users.add(userEmail);
            }
        }
        if (userFirstname!= null) {
            for (User i: userFirstname) {
                if (!users.contains(i)) {
                    users.add(i);
                }
            }
        }
        if (userLastname!= null) {
            for (User i: userLastname) {
                if (!users.contains(i)) {
                    users.add(i);
                }
            }
        }
        if (userUsername!= null) {
            for (User i: userUsername) {
                if (!users.contains(i)) {
                    users.add(i);
                }
            }
        }
        return users;
    }
}
