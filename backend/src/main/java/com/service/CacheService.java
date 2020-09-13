package com.service;

import java.io.IOException;

import com.model.Result;
import com.model.UserCache;
import com.repositories.CacheRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class CacheService {

    @Autowired
    private CacheRepository cacheRepository;

    public UserCache getCache(String email) {
        UserCache userCache = cacheRepository.findByEmailaddress(email);
        if (userCache == null) {
            userCache = new UserCache(email);
            return userCache;
        } else {
            return userCache;
        }
    }

    public Result upload(String email, MultipartFile file) throws IOException {
        UserCache userCache = getCache(email);
        userCache.addAttachment(file);
        Result result = new Result();
        result.setReason("Success");
        result.setResult(true);
        cacheRepository.save(userCache);
        return result;
    }

    public Result clear(String email){
        cacheRepository.deleteByEmailaddress(email);
        Result result = new Result();
        result.setReason("Success");
        result.setResult(true);
        return result;
    }

}
