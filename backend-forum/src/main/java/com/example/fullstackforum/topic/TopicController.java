package com.example.fullstackforum.topic;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/topics/")
public class TopicController {

    private final TopicService topicService;

    @GetMapping("{id}")
    public TopicWithPostsDto getTopicWithPosts(@PathVariable("id") Integer id) {
        return topicService.getTopicWithPostsByTopicId(id);
    }

}
