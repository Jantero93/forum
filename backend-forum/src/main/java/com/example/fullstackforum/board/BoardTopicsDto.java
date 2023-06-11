package com.example.fullstackforum.board;

import com.example.fullstackforum.topic.TopicDto;
import lombok.Builder;

import java.util.List;

@Builder
public record BoardTopicsDto(Integer id, String name, String adjective, List<TopicDto> topics) {
}
