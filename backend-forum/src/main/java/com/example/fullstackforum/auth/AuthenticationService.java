package com.example.fullstackforum.auth;

import com.example.fullstackforum.security.JwtService;
import com.example.fullstackforum.user.Role;
import com.example.fullstackforum.user.User;
import com.example.fullstackforum.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthenticationResponse register(RegisterRequest request) {
        log.info("Registering request: " + request);

        if(!isRequestParametersValid(request)) {
            log.warn("Invalid request parameters");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Empty username or password");
        }

        var userDb = userService.getUserByEmail(request.getEmail());

        if (userDb != null) {
            log.warn("Creating new user failed, user exists already: {}", request.getEmail());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already registered");
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        var savedUser = userService.saveUser(user);

        log.info("User registration successful: {}", savedUser.getEmail());

        var jwtToken = jwtService.generateToken(user);

        log.info("JWT generated for user: {}", request.getEmail());

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationReqeust request) {
        log.info("Authentication request: {}", request);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            log.info("Authentication successful, email: {}", request.getEmail());
        } catch (Exception e) {
            log.info("Authentication failed for user: {}", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        var user = userService.getUserByEmail(request.getEmail());

        if (user == null) {
            log.warn("No user found with email: {}", request.getEmail());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No user found with email: " + request.getEmail());
        }

        var jwtToken = jwtService.generateToken(user);

        log.info("JWT generated for user: {}", request.getEmail());

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User getAuthenticatedRequestUser() {
        try {
            var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            var user = userService.getUserByEmail(userDetails.getUsername());

            if (user == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No authenticated user found");
            }

            return user;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No authenticated user found");
        }
    }

    private boolean isRequestParametersValid(RegisterRequest request) {
        var isNameEmpty = request.getEmail().isBlank() || request.getEmail().isEmpty();
        var isPasswordEmpty = request.getPassword().isBlank() || request.getPassword().isEmpty();
        return !isNameEmpty && !isPasswordEmpty;
    }
}
