package com.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.model.Artifact;
import com.model.Attachment;
import com.model.Category;
import com.model.Profile;
import com.model.User;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuestService {

    @Autowired
    private UserRepository userRepository;

    // Find the user's account by his own link
    private User findUser(String link) {
        return userRepository.findUserByLink(link);
    }

    public Map<String, Map<String, List<String>>> showContent(String link) {
        User user = findUser(link);
        if (user == null) {
            return null;
        }
        return showPublicContent(user);
    }

    // Filter the pulic informtation from this account to the guest
    public Map<String, Map<String, List<String>>> showPublicContent(User user) {
        Map<String, Map<String, List<String>>> output = new HashMap<>();
        for (Category i : user.getCategories()) {
            Map<String, List<String>> innerOutput = new HashMap<>();
            for (Artifact x : i.getArtifacts()) {
                // Only add content which are public to the output
                if (x.getPrivacy().equals("public")) {
                    List<String> innerList = new ArrayList<>();
                    innerList.add(x.getDescription());
                    for (Attachment y : x.getAttachments()) {
                        innerList.add(y.getFilename());
                    }
                    innerOutput.put(x.getTitle(), innerList);
                }
            }
            // Show the category iff there is at least one element public
            if (innerOutput.size() > 0) {
                output.put(i.getName(), innerOutput);
            }
        }
        return output;
    }

    // Get the profile of a user by his link
    public Profile showProfile(String link) {
        User user = findUser(link);
        if (user == null) {
            return null;
        }
        return user.getProfile();
    }
}
