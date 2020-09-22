package com.repositories;

import java.util.List;

import com.model.UserCache;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CacheRepository extends MongoRepository<UserCache, String>{
    public UserCache findByEmailaddress(String emailaddress);
    public void deleteByEmailaddress(String emailaddress);
    public List<UserCache> findAllByEmailaddress(String emailaddress);
}
