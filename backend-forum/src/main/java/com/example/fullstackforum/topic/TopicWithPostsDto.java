package com.example.fullstackforum.topic;

import com.example.fullstackforum.posts.PostDto;
import lombok.Builder;

import java.util.Date;
import java.util.List;

@Builder
public record TopicWithPostsDto(
        Integer id,
        String header,
        String message,
        String creator,
        Date createdTime,
        List<PostDto> posts
) {
}
