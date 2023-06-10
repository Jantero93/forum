package com.example.fullstackforum.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @GetMapping("a")
    public ResponseEntity<Map<String, String>> test() {
        var test = new HashMap<String, String>();
        test.put("msg", "test");
        return ResponseEntity.ok(test);
    }

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationReqeust request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
