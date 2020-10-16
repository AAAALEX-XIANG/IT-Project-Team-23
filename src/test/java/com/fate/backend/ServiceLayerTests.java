package com.fate.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.SecureRandom;

import com.encoder.Md5Util;
import com.model.Profile;
import com.model.RegisterRequest;
import com.model.Result;
import com.service.AccountService;
import com.service.FileEncodeService;
import com.service.ProfileService;
import com.service.SearchService;

import org.bson.types.Binary;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
class ServiceLayerTests {

	@Autowired
	private AccountService accountService;

	@Autowired
	private ProfileService profileService;

	@Autowired
	private SearchService searchService;

	private final String testFilePathOne = "C:/Users/DELL/Desktop/Git/backend/src/test/java/com/fate/backend/cat.jpg";

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
		assertEquals(1, searchService.showUser("Alex").size());
	}

	@Test
	void searchServiceSearchbyUserID() {
		assertEquals(1, searchService.showUser("999999").size());
	}

	@Test
	void searchServiceSearchbyEmailAddress() {
		assertEquals(1, searchService.showUser("alex@gmail.com").size());
	}

	@Test
	void searchServiceSearchbyFirstname() {
		assertEquals(1, searchService.showUser("Zhengkang").size());
	}

	@Test
	void searchServiceSearchbyLastname() {
		assertEquals(1, searchService.showUser("Xiang").size());
	}

	@Test
	void searchServiceSearchbyInformationNotInDatabase() {
		assertEquals(0, searchService.showUser("ooppppppps").size());
	}

	@Test
	void updateAvatarTest() throws IOException {
		// use your local file path
		String filePath = testFilePathOne;
		File image = new File(filePath);
		FileInputStream fileInputStream = new FileInputStream(image);
		MultipartFile multipartFile = new MockMultipartFile(image.getName(), image.getName(), "image/jpeg",
				fileInputStream);
		Result result = profileService.updateAvatar("alex@gmail.com", multipartFile);
		assertEquals("Success", result.getReason());
	}

	@Test
	void updateEmptyAvatarTest() throws IOException {
		MultipartFile multipartFile = null;
		Result result = profileService.updateAvatar("alex@gmail.com", multipartFile);
		assertEquals("Empty File!", result.getReason());
	}

	@Test
	void getUserProfile() {
		Profile profile = new Profile("Zhengkang", "Xiang", "Alex");
		assertEquals(true, profileEquals(profile, profileService.getUserProfile("alex@gmail.com")));
	}

	@Test
	void updateUserProfile() {
		Result result = profileService.updateProfile("alex@gmail.com", "Zhengkang", "Xiang", "Alex", "description");
		assertEquals("Success", result.getReason());
	}

	boolean profileEquals(Profile expected, Profile actual) {
		return (expected.getFirstname().equals(actual.getFirstname())
				&& expected.getLastname().equals(actual.getLastname())
				&& expected.getUsername().equals(actual.getUsername()));
	}

	@Test
	void encryptPassword() {
		SecureRandom random = new SecureRandom();
		String passwordOne = generateRandomPassword(random.nextInt());
		String encryptedPasswordOne = Md5Util.md5(passwordOne);
		assertNotEquals(passwordOne, encryptedPasswordOne);
		String encryptedPasswordTwo = Md5Util.md5(passwordOne);
		assertEquals(encryptedPasswordOne, encryptedPasswordTwo);
	}

	String generateRandomPassword(int len) {
		// ASCII range - alphanumeric (0-9, a-z, A-Z)
		final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		SecureRandom random = new SecureRandom();
		String password = "";

		// each iteration of loop choose a character randomly from the given ASCII range
		// and append it to StringBuilder instance
		for (int i = 0; i < len; i++) {
			int randomIndex = random.nextInt(chars.length());
			password += chars.charAt(randomIndex);
		}
		return password;
	}

	@Test
	void fileEncryption() throws IOException {
		// use your local file path
		String filePath = testFilePathOne;
		File image = new File(filePath);
		FileInputStream fileInputStream = new FileInputStream(image);
		MultipartFile multipartFile = new MockMultipartFile(image.getName(), image.getName(), "image/jpeg",
				fileInputStream);
		Binary originFile = new Binary(multipartFile.getBytes());
		Binary encodedFile = FileEncodeService.encodeFile(multipartFile.getOriginalFilename(), originFile);
		assertNotEquals(originFile, encodedFile);
		Binary decodedFile = FileEncodeService.decodeFile(multipartFile.getOriginalFilename(), encodedFile);
		assertEquals(originFile, decodedFile);
	}
}
