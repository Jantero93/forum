package com.example.fullstackforum.helpers;

import com.example.fullstackforum.auth.AuthenticationService;
import com.example.fullstackforum.auth.RegisterRequest;
import com.example.fullstackforum.user.UserRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserLoggedService {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserRepository userRepository;


    public String createAndLogInTestUser(String username, String password) {
        var authRes = authenticationService.register(new RegisterRequest(username, password));
        return authRes.getToken();
    }

    public void deleteTestUser(String username) {
        var user = userRepository.findByEmail(username);
        user.ifPresent(value -> userRepository.delete(value));
    }
}

