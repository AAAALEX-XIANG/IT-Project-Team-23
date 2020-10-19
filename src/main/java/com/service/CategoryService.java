package com.service;

import java.util.ArrayList;
import java.util.List;

import com.model.AllCategoryResult;
import com.model.Category;
import com.model.CategoryRequest;
import com.model.Result;
import com.model.User;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private UserRepository userRepository;

    // Add a category to the frontend
    public Result addCategory(CategoryRequest request) {
        Result result = new Result();
        User user = userRepository.findByEmailaddress(request.getEmail());
        // Check if the email is existed
        if (user == null) {
            result.setNoEmail();
            return result;
        }
        // Check if there is already an exist category with the same name
        if (user.existCategory(request.getCategoryName()) != null) {
            result.setResult(false);
            result.setReason("Category already exists");
            return result;
        }
        result.setSuccess();
        user.addCategory(request.getCategoryName());
        userRepository.save(user);
        return result;
    }

    public Result deleteCategory(CategoryRequest request) {
        Result result = new Result();
        User user = userRepository.findByEmailaddress(request.getEmail());
        // Check if the email is existed
        if (user == null) {
            result.setNoEmail();
            return result;
        }
        user.removeCategory(request.getCategoryName());
        result.setSuccess();
        userRepository.save(user);
        return result;
    }

    public AllCategoryResult getAllCategory(String email) {
        User user = userRepository.findByEmailaddress(email);
        List<String> output = new ArrayList<>();
        for (Category i : user.getCategories()) {
            output.add(i.getName());
        }
        AllCategoryResult result = new AllCategoryResult();
        result.setCategories(output);
        return result;
    }
}
