package com.example.fullstackforum.posts;

import lombok.Builder;

import java.util.Date;

@Builder
public record PostDto(
        Integer id,
        String message,
        Integer votes,
        Date createdTime,
        Date updatedTime,
        String user,
        Integer userId
) {
}
