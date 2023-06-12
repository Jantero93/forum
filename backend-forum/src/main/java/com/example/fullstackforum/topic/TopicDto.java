package com.example.fullstackforum.topic;

import lombok.Builder;

import java.util.Date;
import java.util.List;

@Builder
public record TopicDto(
        Integer id,
        String header,
        String message,
        String creator,
        Date createdTime
) {
}
