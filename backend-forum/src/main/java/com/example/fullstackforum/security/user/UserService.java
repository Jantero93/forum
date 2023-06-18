package com.example.fullstackforum.security.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        var userDb = userRepository.findByEmail(email);

        if (userDb.isEmpty()) {
            log.warn("No user with email: {}" + email);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return userDb.get();
    }
}
