package com.example.fullstackforum.posts;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class PostController {

    private final PostService postService;

    @PostMapping("post")
    public PostDto savePost(@RequestBody NewPostRequest request) {
        return postService.savePost(request);
    }
}
