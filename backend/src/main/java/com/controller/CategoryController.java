package com.controller;

import java.util.ArrayList;
import java.util.List;


import com.model.AllCategoryRequest;
import com.model.Artifact;
import com.model.Category;
import com.model.CategoryRequest;
import com.model.CategoryResult;
import com.model.Result;
import com.model.User;
import com.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("api/categories")
public class CategoryController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addCategory")
    public Result addCategory(@RequestBody CategoryRequest request) {
        Result result = new Result();
        User user = userRepository.findByEmailaddress(request.getEmail());
        if (user.existCategory(request.getCategoryName()) != null) {
            result.setResult(false);
            return result;
        }
        result.setResult(true);
        user.addCategory(request.getCategoryName());
        userRepository.save(user);
        return result;
    }

    @PostMapping("/deleteCategory")
    public Result deleteCategory(@RequestBody CategoryRequest request) {
        Result result = new Result();
        User user = userRepository.findByEmailaddress(request.getEmail());
        if (user == null) {
            result.setResult(false);
            return result;
        }
        user.removeCategory(request.getCategoryName());
        result.setResult(true);
        userRepository.save(user);
        return result;
    }

    @PostMapping("/showCategories")
    public CategoryResult showCategory(@RequestBody AllCategoryRequest request) {
        User user = userRepository.findByEmailaddress(request.getEmail());
        List<String> output = new ArrayList<>();
        for (Category i : user.getCategories()) {
            output.add(i.getName());
        }
        CategoryResult result = new CategoryResult();
        result.setCategories(output);
        return result;
    }






    @PostMapping("/showArtifacts")
    public List<String> showArtifact(@RequestBody CategoryRequest request) {
        User user = userRepository.findByEmailaddress(request.getEmail());
        Category category = user.existCategory(request.getCategoryName());
        List<String> output = new ArrayList<>();
        for (Artifact i : category.getArtifacts()) {
            output.add(i.getTitle());
        }
        return output;
    }

}