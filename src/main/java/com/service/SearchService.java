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
        List<User> users = new ArrayList<>();
        User userId = userRepository.findByStudentId(info);
        User userEmail = userRepository.findByEmailaddress(info);
        List<User> userFirstname = userRepository.findUserByFirstname(info);
        List<User> userLastname = userRepository.findUserByLastname(info);
        List<User> userUsername = userRepository.findUserByUsername(info);
        addToUsers(users, userId);
        addToUsers(users, userEmail);
        for (User i : userFirstname) {
            addToUsers(users, i);
        }
        for (User i : userLastname) {
            addToUsers(users, i);
        }
        for (User i : userUsername) {
            addToUsers(users, i);
        }
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

    private void addToUsers(List<User> users, User user) {
        if (user == null) {
            return;
        }
        if (users.contains(user)) {
            return;
        }
        users.add(user);
    }
}
