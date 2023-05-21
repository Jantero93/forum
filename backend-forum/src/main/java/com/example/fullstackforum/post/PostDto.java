package com.example.fullstackforum.post;

import com.example.fullstackforum.topic.TopicDto;
import com.example.fullstackforum.user.UserDto;

import java.util.Date;

public record PostDto(Long id, Date created, Integer votes, UserDto user, TopicDto topic) {
}
