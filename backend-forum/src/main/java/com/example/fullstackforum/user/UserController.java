package com.example.fullstackforum.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    HashMap<String, Long> createUser(@RequestBody UserDto userDto) {
        log.info("Creating new user: " + userDto);
        var userId = userService.createUser(userDto.username(), userDto.password());

        var response = new HashMap<String, Long>();
        response.put("userId", userId);

        return response;
    }
}
