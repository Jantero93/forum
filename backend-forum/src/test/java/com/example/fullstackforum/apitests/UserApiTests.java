package com.example.fullstackforum.apitests;

import com.example.fullstackforum.auth.AuthenticationReqeust;
import com.example.fullstackforum.auth.AuthenticationResponse;
import com.example.fullstackforum.auth.RegisterRequest;
import com.example.fullstackforum.config.TestConfig;
import com.example.fullstackforum.user.Role;
import com.example.fullstackforum.user.User;
import com.example.fullstackforum.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TestConfig testConfig;

    @Test
    void registerUser_ShouldReturnOk() {
        var requestBody = new RegisterRequest("test@email.com", "abcd");

        var res = restTemplate.postForEntity(
                testConfig.getApiUrl() + "auth/register",
                requestBody,
                AuthenticationResponse.class

        );

        var body = res.getBody();


        Assertions.assertNotNull(body);
        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertFalse(body.getToken().isEmpty());
        Assertions.assertFalse(body.getToken().isBlank());

        var userDb = userRepository.findByEmail(requestBody.getEmail());

        Assertions.assertTrue(userDb.isPresent());

        userRepository.delete(userDb.get());
    }

    @Test
    void loginUser_ShouldReturnOk() {
        var mockUpUser = User.builder()
                .email("test@email.com")
                .password(passwordEncoder.encode("123456789"))
                .role(Role.USER)
                .build();

        var requestBody = new AuthenticationReqeust("test@email.com", "123456789");

        var userDb = userRepository.save(mockUpUser);

        var res = restTemplate.postForEntity(
                testConfig.getApiUrl() + "auth/authenticate",
                requestBody,
                AuthenticationResponse.class
        );

        var body = res.getBody();

        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertNotNull(body);
        Assertions.assertFalse(body.getToken().isEmpty());
        Assertions.assertFalse(body.getToken().isBlank());

        userRepository.delete(userDb);
    }
}
