package com.example.fullstackforum.user;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    public UserController() {}

    @PostMapping("/user")
    void createUser(@RequestBody UserDto userDto) {
        log.info("Creating new user: " + userDto);

        System.out.println("");
    }
}
