package com.fate.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.model.RegisterRequest;
import com.model.Result;
import com.service.AccountService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServiceLayerTests {

	@Autowired
	private AccountService accountService;

	@Test
	void registerServiceSuccessTest() {
		RegisterRequest request = new RegisterRequest();
		request.setStudentId("910000");
		request.setEmailaddress("emile@gmail.com");
		request.setFirstname("Zhili");
		request.setLastname("Chen");
		request.setPassword("123456");
		request.setUsername("Emile");
		Result result = accountService.register(request);
		assertEquals("Success", result.getReason());
	}

	@Test
	void registerServiceDuplicateEmailTest() {
		RegisterRequest request = new RegisterRequest();
		request.setStudentId("910001");
		request.setEmailaddress("alex@gmail.com");
		request.setFirstname("Zhengkang");
		request.setLastname("Xiang");
		request.setPassword("123456");
		request.setUsername("Alex");
		Result result = accountService.register(request);
		assertEquals("Emailaddress already exists!", result.getReason());
	}

	@Test
	void registerServiceDuplicateIdTest() {
		RegisterRequest request = new RegisterRequest();
		request.setStudentId("999999");
		request.setEmailaddress("zhengkangx@student.unimelb.edu.au");
		request.setFirstname("Zhengkang");
		request.setLastname("Xiang");
		request.setPassword("123456");
		request.setUsername("Alex");
		Result result = accountService.register(request);
		assertEquals("Student ID already exists!", result.getReason());
	}

	@Test
	void loginServiceUserTest() {
		Result result = accountService.login("alex@gmail.com", "123456");
		assertEquals("User", result.getReason());
	}

}
