package com.controller;

import com.model.AllCategoryResult;
import com.model.CategoryRequest;
import com.model.Result;
import com.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Add a new category for user
    @PostMapping("/addCategory")
    public Result addCategory(@RequestBody CategoryRequest request) {
        return categoryService.addCategory(request);

    }

    // Delete a new category for user
    @PostMapping("/deleteCategory")
    public Result deleteCategory(@RequestBody CategoryRequest request) {
        return categoryService.deleteCategory(request);

    }

    // Show all categories of a user
    @PostMapping("/showCategories")
    public AllCategoryResult showCategories(@RequestParam String email) {
        return categoryService.getAllCategory(email);
    }
}