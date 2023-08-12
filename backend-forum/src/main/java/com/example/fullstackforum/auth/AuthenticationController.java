package com.example.fullstackforum.auth;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final EntityManager em;

    @GetMapping("a")
    public Object test() {
        var deleteCommand = "DELETE FROM #TABLE#";
        var tableNames = List.of("tokens", "posts", "topics", "users_", "boards", "statistics");
        tableNames.forEach(name -> {
            var query = deleteCommand.replace("#TABLE#", name);

            try {
                em.createNativeQuery(query).getResultStream();

            } catch (Exception e) {
            }

        });

        return null;
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
