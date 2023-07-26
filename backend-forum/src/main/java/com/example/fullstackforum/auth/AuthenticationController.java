package com.example.fullstackforum.auth;

import com.example.fullstackforum.posts.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final PostRepository postRepository;

    @GetMapping("a")
    public Object test() {
        var post = postRepository.findById(5852);
        if (post.isPresent()) {
            var db = post.get();
            return db.getVotes();
        }

        return 123;


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
