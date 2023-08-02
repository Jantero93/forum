package com.example.fullstackforum.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        var userDb = userRepository.findByEmail(email);

        if (userDb.isEmpty()) {
            log.warn("No user with email: {}" + email);
            return null;
        }

        return userDb.get();
    }

    public User saveUser(User user) {
        log.info("Saving user {}", user.getEmail());
        return userRepository.save(user);
    }
}
