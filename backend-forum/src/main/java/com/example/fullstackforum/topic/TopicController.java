package com.example.fullstackforum.topic;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/topics/")
public class TopicController {

    private final TopicService topicService;

    @GetMapping("{id}")
    public TopicWithPostsDto getTopicWithPosts(@PathVariable("id") Integer id) {
        return topicService.getTopicWithPostsByTopicId(id);
    }

    @PostMapping("topic")
    public TopicDto createNewTopic(@RequestBody NewTopicRequest request) {
        return topicService.createNewTopic(request);
    }

}
