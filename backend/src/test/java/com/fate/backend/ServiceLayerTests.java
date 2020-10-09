package com.fate.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.model.RegisterRequest;
import com.model.Result;
import com.service.AccountService;
import com.service.SearchService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServiceLayerTests {

	@Autowired
	private AccountService accountService;

	@Autowired
	private SearchService searchservice;

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

	@Test
	void loginServiceFalseEmailTest() {
		Result result = accountService.login("jiehuang@gmail.com", "123456");
		assertEquals("Login Failure", result.getReason());
	}

	@Test
	void loginServiceFalsepasswordTest() {
		Result result = accountService.login("alex@gmail.com", "111111");
		assertEquals("Login Failure", result.getReason());
	}

	@Test
	void searchServiceSearchbyUsername() {
		assertEquals(1, searchservice.showUser("Alex").size());
	}

	@Test
	void searchServiceSearchbyUserID() {
		assertEquals(1, searchservice.showUser("999999").size());
	}

	@Test
	void searchServiceSearchbyEmailAddress() {
		assertEquals(1, searchservice.showUser("alex@gmail.com").size());
	}

	@Test
	void searchServiceSearchbyFirstname() {
		assertEquals(1, searchservice.showUser("Zhengkang").size());
	}

	@Test
	void searchServiceSearchbyLastname() {
		assertEquals(1, searchservice.showUser("Xiang").size());
	}
	
	@Test
	void searchServiceSearchbyInformationNotInDatabase() {
		assertEquals(0, searchservice.showUser("ooppppppps").size());
	}
	
}
