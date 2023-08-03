package com.example.fullstackforum.posts;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class PostController {

    private final PostService postService;

    @PostMapping("posts")
    public PostDto savePost(@RequestBody NewPostRequest request) {
        return postService.savePost(request);
    }

    @PostMapping("posts/{id}/vote")
    public PostDto addVoteToPost(@PathVariable Integer id) {
        return postService.addVoteForPost(id);
    }

    @DeleteMapping("posts/{id}")
    public DeletePostResponse deletePost(@PathVariable Integer id) {
        return postService.deletePost(id);
    }
}

