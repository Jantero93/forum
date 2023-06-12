package com.example.fullstackforum.topic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TopicMapper {

    public TopicDto mapTopicToDto(Topic topic) {
        return TopicDto.builder()
                .creator(topic.getUser().getEmail())
                .createdTime(topic.getCreatedTime())
                .header(topic.getHeading())
                .message(topic.getMessage())
                .posts(null)
                .build();
    }
}