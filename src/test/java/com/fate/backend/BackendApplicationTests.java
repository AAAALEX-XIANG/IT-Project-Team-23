package com.fate.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.controller.AccountController;
import com.model.RegisterRequest;
import com.model.Result;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	private AccountController accountController;

	@Test
	void registerTest() {
		RegisterRequest request = new RegisterRequest();
		request.setStudentId("123456");
		request.setEmailaddress("alex@student.unimelb.edu.au");
		request.setFirstname("Zhengkang");
		request.setLastname("Xiang");
		request.setPassword("123456");
		request.setUsername("Alex");
		Result result = accountController.register(request);
		assertEquals("Success", result.getReason());
	}

	@Test
	void loginTest() {
		Result result = accountController.login("aaaalex@foxmail.com", "123456");
		assertEquals("User", result.getReason());
	}

}
