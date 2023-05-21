package com.example.fullstackforum.topic;

import com.example.fullstackforum.post.PostDto;
import com.example.fullstackforum.user.UserDto;

import java.util.Date;
import java.util.List;

public record TopicDto(Long id, Date created, String topicName, List<PostDto> posts, UserDto user) {
}
