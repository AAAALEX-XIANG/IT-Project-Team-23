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
        addToUsers(users, userId);
        addToUsers(users, userEmail);
        for (User i: userFirstname) {
            addToUsers(users,i);
        }
        for (User i: userLastname) {
            addToUsers(users,i);
        }
        for (User i: userUsername) {
            addToUsers(users,i);
        }
        return users;
    }

    private void addToUsers(List<User> users, User user){
        if(user == null){
            return;
        }
        if(users.contains(user)){
            return;
        }
        users.add(user);
    }
}
