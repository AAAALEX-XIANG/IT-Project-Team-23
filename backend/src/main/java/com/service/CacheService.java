package com.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.model.Attachment;
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
        System.out.println("Find an existed userCache");
        return userCache;
    }

    public Result upload(String email, MultipartFile file) throws IOException {
        UserCache userCache = new UserCache(email);
        userCache.setAttachment(file);
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

    public List<Attachment> getFileFromCache(String email, List<String> files){
        List<UserCache> userCaches  = cacheRepository.findAllByEmailaddress(email);
        List<Attachment> output = new ArrayList<>();
        for(String file : files){
            for(UserCache i : userCaches){
                if(i.getAttachments().getFilename().equals(file)){
                    output.add(i.getAttachments());
                    break;
                }
            }
        }
        
        return output;
    }

}
