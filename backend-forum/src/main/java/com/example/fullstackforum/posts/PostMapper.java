package com.example.fullstackforum.posts;

import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    public PostDto mapPostToPostDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .createdTime(post.getCreatedTime())
                .updatedTime(post.getUpdatedTime())
                .user(post.getUser().getEmail())
                .votes(post.getVotes())
                .message(post.getMessage())
                .userId(post.getUser().getId())
                .build();
    }
}
