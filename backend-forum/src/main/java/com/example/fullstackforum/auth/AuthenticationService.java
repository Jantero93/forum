package com.example.fullstackforum.auth;

import com.example.fullstackforum.security.JwtService;
import com.example.fullstackforum.security.user.Role;
import com.example.fullstackforum.security.user.User;
import com.example.fullstackforum.security.user.UserRepository;
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

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        log.info("Registering request: " + request);

        var userDb = userRepository.findByEmail(request.getEmail());

        if (userDb.isPresent()) {
            log.warn("Creating new user failed, user exists already: {}", request.getEmail());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already registered");
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        var savedUser = userRepository.save(user);

        log.info("User registration successful: {}", savedUser.getEmail());

        var jwtToken = jwtService.generateToken(user);

        log.info("JWT generated for user: {}", request.getEmail());

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(savedUser.getEmail())
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

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);

        log.info("JWT generated for user: {}", request.getEmail());

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .build();
    }

    public UserDetails getRequestUserDetails() {
        return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
