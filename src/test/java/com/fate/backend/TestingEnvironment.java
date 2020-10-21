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

//Do not run this test class as a whole, set up the correct kind of test environment that you want 
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

    // Decide how many accounts to be stored in the database at first
    private final Integer numOfAccounts = 1000;

    // Environment setted for ServiceLayerTests
    @Test
    void setUpTestingEnvironment() {
        // Clear Database
        clearDatabase();
        RegisterRequest request = new RegisterRequest();
        // Set up the user account
        request.setStudentId("999999");
        request.setEmailaddress("lacey@gmail.com");
        request.setFirstname("Hongyi");
        request.setLastname("Gu");
        request.setPassword("123456");
        request.setUsername("Ellen");
        Result resultUser = accountService.register(request);
        assertEquals("Success", resultUser.getReason());
        assert (resultUser.isResult());
        // Set up the admin account
        Result resultAdmin = accountService.registerAdmin("001", "alex@admin.com", "123456");
        assertEquals("Success", resultAdmin.getReason());
        assert (resultAdmin.isResult());
        generateAccounts();
    }

    void generateAccounts() {
        RegisterRequest request = new RegisterRequest();
        for (int i = 0; i < numOfAccounts; i++) {
            request.setStudentId("999999" + Integer.toString(i));
            request.setEmailaddress("alex" + Integer.toString(i) + "@gmail.com");
            request.setFirstname("Zhengkang");
            request.setLastname("Xiang");
            request.setPassword("123456");
            request.setUsername("Alex");
            Result result = accountService.register(request);
            assertEquals("Success", result.getReason());
        }
    }

    // Simply clear the database
    @Test
    void clearDatabase() {
        // Clear Database
        adminRepository.deleteAll();
        cacheRepository.deleteAll();
        userRepository.deleteAll();
        assertEquals(0, adminRepository.count());
        assertEquals(0, cacheRepository.count());
        assertEquals(0, userRepository.count());
    }

}
