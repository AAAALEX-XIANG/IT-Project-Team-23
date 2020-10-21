package com.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.model.User;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, List<String>> showUser(String info) {
        String[] names = info.split(" ");
        // If any accurate account has been found
        User userId = userRepository.findByStudentId(info);
        if (userId != null) {
            return userToMap(userId);
        }
        User userEmail = userRepository.findByEmailaddress(info);
        if (userEmail != null) {
            return userToMap(userEmail);
        }

        List<User> users = new ArrayList<>();

        for (String name : names) {
            users.addAll(userRepository.findUserByFirstname(name));
            users.addAll(userRepository.findUserByLastname(name));
            users.addAll(userRepository.findUserByUsername(name));
        }

        System.out.println(users.size());
        // If any accurate name has been found
        if (!users.isEmpty()) {
            return usersToMap(users);
        }

        // Search for incompete names at last
        for (String name : names) {
            users.addAll(userRepository.findUserByFirstnameRegex(name));
            users.addAll(userRepository.findUserByLastnameRegex(name));
            users.addAll(userRepository.findUserByUsernameRegex(name));
        }
        return usersToMap(users);
    }

    private Map<String, List<String>> userToMap(User user) {
        Map<String, List<String>> map = new HashMap<>();
        List<String> userInfo = new ArrayList<>();
        userInfo.add(user.getEmailaddress());
        userInfo.add(user.getProfile().getUsername());
        userInfo.add(user.getProfile().getFirstname());
        userInfo.add(user.getProfile().getLastname());
        userInfo.add(user.getProfile().getLink());
        userInfo.add(user.getProfile().getDescription());
        map.put(user.getStudentId(), userInfo);
        return map;
    }

    private Map<String, List<String>> usersToMap(List<User> users) {
        Map<String, List<String>> map = new HashMap<>();
        for (User i : users) {
            List<String> userInfo = new ArrayList<>();
            userInfo.add(i.getEmailaddress());
            userInfo.add(i.getProfile().getUsername());
            userInfo.add(i.getProfile().getFirstname());
            userInfo.add(i.getProfile().getLastname());
            userInfo.add(i.getProfile().getLink());
            userInfo.add(i.getProfile().getDescription());
            map.put(i.getStudentId(), userInfo);
        }
        return map;
    }
}
