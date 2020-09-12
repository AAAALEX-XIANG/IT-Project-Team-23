package com.repositories;

import com.model.UserCache;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CacheRepository extends MongoRepository<UserCache, String>{
    public UserCache findByEmailaddress(String emailaddress);


}
