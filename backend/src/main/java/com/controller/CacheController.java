package com.controller;

import java.io.IOException;
import com.model.Result;
import com.service.CacheService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "api/cache")
public class CacheController {

    @Autowired
    private CacheService cacheService;

    // get all user account
    @PostMapping("/upload/{email}")
    public Result uploadCache(@PathVariable String email, @RequestParam MultipartFile file) throws IOException {
        if(email == null){
            Result result = new Result();
            result.setReason("Don't get email address");
            result.setResult(false);
            return result;
        }
        return cacheService.upload(email,file);
    }

    @GetMapping("/clear/{email}")
    public Result clearCache(@PathVariable String email){
        if(email == null){
            Result result = new Result();
            result.setReason("Don't get email address");
            result.setResult(false);
            return result;
        }
        return cacheService.clear(email);
    }
}