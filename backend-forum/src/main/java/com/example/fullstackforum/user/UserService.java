package com.example.fullstackforum.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserService userService) {
        this.userService = userService;
    }

    Long createUser(UserDto user) {

        String password = bCryptP
    }
}
