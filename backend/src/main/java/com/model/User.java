package com.model;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by Jiehuang Shi on 2020/8/31.
 * Modified by Alex
 */

@Document(collection = "User")
public class User {

    @Id
    private ObjectId id;


    private String firstname;
    private String lastname;
    private String password;
    private String emailaddress;
    private String username;
    private List<Category> categories;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public User(String firstname, String lastname, String password, String emailaddress, String username) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.emailaddress = emailaddress;
        this.username = username;
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

}