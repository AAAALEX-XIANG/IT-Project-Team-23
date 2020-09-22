package com.repositories;

import java.util.List;

import com.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
    public User findByEmailaddress(String emailaddress);
    public User findByStudentId(String studentId);

    @Query(value = "{ 'profile.firstname': '?0' }")
    public List<User> findUserByFirstname(String firstname);

    @Query(value = "{ 'profile.lastname': '?0' }")
    public List<User> findUserByLastname(String lastname);
    
    @Query(value = "{ 'profile.username': '?0' }")
    public List<User> findUserByUsername(String username);
}
