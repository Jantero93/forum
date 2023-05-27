package com.example.fullstackforum.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.Collections;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService
            (UserRepository userRepository,
             RoleRepository roleRepository,
             PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Long createUser(String username, String password) {
        log.info("Creating user with user username {}", username);

        var existingUser = userRepository.findByUsername(username);

        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with username already exists");
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPasswordHash(passwordEncoder.encode(password));

        var userRoleDb = roleRepository.findByName(ERole.ROLE_USER);
        newUser.setRoles(Collections.singleton(userRoleDb));

        var userDb = userRepository.save(newUser);

        return userDb.getId();
    }
}
