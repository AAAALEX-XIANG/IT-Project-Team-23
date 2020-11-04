package com.repositories;

import java.util.List;

import com.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmailaddress(String emailaddress);

    public User findByStudentId(String studentId);

    @Query(value = "{'profile.firstname': {$regex : ?0, $options: 'i'}}")
    public List<User> findUserByFirstnameRegex(String firstname);

    @Query(value = "{'profile.lastname': {$regex : ?0, $options: 'i'}}")
    public List<User> findUserByLastnameRegex(String lastname);

    @Query(value = "{'profile.username': {$regex : ?0, $options: 'i'}}")
    public List<User> findUserByUsernameRegex(String username);

    @Query(value = "{'profile.firstname': {$regex : /^?0$/, $options: 'i'}}")
    public List<User> findUserByFirstname(String firstname);

    @Query(value = "{'profile.lastname': {$regex : /^?0$/, $options: 'i'}}")
    public List<User> findUserByLastname(String lastname);

    @Query(value = "{'profile.username': {$regex : /^?0$/, $options: 'i'}}")
    public List<User> findUserByUsername(String username);

    @Query(value = "{ 'profile.link': '?0' }")
    public User findUserByLink(String link);
}
