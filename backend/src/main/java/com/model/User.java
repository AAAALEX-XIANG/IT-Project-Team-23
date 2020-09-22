package com.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by Jiehuang Shi on 2020/8/31.
 * Modified by Alex
 */

@Document(collection = "User")
public class User {

    private String studentId;
    private String password;
    private String emailaddress;
    private Profile profile;
    private List<Category> categories;

    public User(String emailaddress, String password, String studentId, Profile profile) {
        this.emailaddress = emailaddress;
        this.password = password;
        this.profile = profile;
        this.studentId = studentId;
        this.categories = new ArrayList<>();
    }

    public void addCategory(String name){
        Category category = new Category(name);
        categories.add(category);
    }

    public void removeCategory(String name){
        Category category = existCategory(name);
        if(category != null){
            categories.remove(category);
        }
    }

    public Category existCategory(String name){
        for(Category i : categories){
            if (name.equals(i.getName())){
                return i;
            }
        }
        return null;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailaddress() {
        return emailaddress;
    }

    public void setEmailaddress(String emailaddress) {
        this.emailaddress = emailaddress;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}