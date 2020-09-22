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
            System.out.println("firstname:" + users);
            for (User i: userFirstname) {
                System.out.println("firstname:" + users.contains(i));
                if (!users.contains(i)) {
                    users.add(i);
                }
            }
        }
        if (userLastname!= null) {
            System.out.println("lastname:" + users);
            for (User i: userLastname) {
                System.out.println("lastname:" + users.contains(i));
                if (!users.contains(i)) {
                    users.add(i);
                }
            }
        }
        if (userUsername!= null) {
            System.out.println("username:" + users);
            for (User i: userUsername) {
                System.out.println("username:" + users.contains(i));
                if (!users.contains(i)) {
                    users.add(i);
                }
            }
        } 
        return users;
    }
}
