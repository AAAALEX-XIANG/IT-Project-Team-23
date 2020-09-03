package com.repositories;

import com.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
    public User findByEmailaddress(String Emailaddress); 
    public User findByUsername(String Username); 
}
