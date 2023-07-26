package com.example.fullstackforum.topic;

import com.example.fullstackforum.posts.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TopicMapper {

    private final PostMapper postMapper;

    public TopicDto mapTopicToDto(Topic topic) {
        return TopicDto.builder()
                .id(topic.getId())
                .creator(topic.getUser().getEmail())
                .createdTime(topic.getCreatedTime())
                .header(topic.getHeading())
                .message(topic.getMessage())
                .build();
    }

    public TopicWithPostsDto mapTopicToTopicWithPostsDto(Topic topic) {
        return TopicWithPostsDto.builder()
                .createdTime(topic.getCreatedTime())
                .creator(topic.getUser().getEmail())
                .id(topic.getId())
                .header(topic.getHeading())
                .message(topic.getMessage())
                .posts(
                        topic.getPosts().stream().map(postMapper::mapPostToPostDto).toList()
                ).build();
    }
}
