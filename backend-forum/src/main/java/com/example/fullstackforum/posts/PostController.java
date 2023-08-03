package com.example.fullstackforum.posts;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
@Slf4j
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

    @PutMapping("posts/{id}")
    public PostDto updatePost(@PathVariable Integer id, @RequestBody PostDto updatedDto) {
        if (!Objects.equals(id, updatedDto.id())) {
            log.warn("Path variable id and RequestBody id do not match");
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Path variable id and RequestBody id do not match"
            );
        }

        return postService.updatePost(updatedDto);
    }
}

