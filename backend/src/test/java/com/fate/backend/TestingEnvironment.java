package com.fate.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.model.RegisterRequest;
import com.model.Result;
import com.repositories.AdminRepository;
import com.repositories.CacheRepository;
import com.repositories.UserRepository;
import com.service.AccountService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestingEnvironment {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CacheRepository cacheRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountService accountService;

    @Test
    void setUpTestingEnvironment() {
        // Clear Database
        adminRepository.deleteAll();
        cacheRepository.deleteAll();
        userRepository.deleteAll();
        assertEquals(0, adminRepository.count());
        assertEquals(0, cacheRepository.count());
        assertEquals(0, userRepository.count());
        RegisterRequest request = new RegisterRequest();
        request.setStudentId("999999");
        request.setEmailaddress("alex@gmail.com");
        request.setFirstname("Zhengkang");
        request.setLastname("Xiang");
        request.setPassword("123456");
        request.setUsername("Alex");
        Result result = accountService.register(request);
        assertEquals("Success", result.getReason());

    }

}
