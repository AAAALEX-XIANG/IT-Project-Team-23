package com.repositories;

import com.model.Administrator;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Administrator, String>{
    public Administrator findByEmailaddress(String emailaddress);
    public Administrator findByAdminId (String adminId);
}
