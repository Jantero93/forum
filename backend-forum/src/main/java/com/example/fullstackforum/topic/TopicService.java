package com.example.fullstackforum.topic;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Slf4j
public class TopicService {

    private final TopicRepository topicRepository;
    private final TopicMapper topicMapper;


    public TopicWithPostsDto getTopicWithPostsByTopicId(Integer id) {
        log.info("Getting topic with posts by topic id: {}", id);

        var topicDb = topicRepository.findById(id);

        if (topicDb.isEmpty()) {
            log.warn("No topic found with id: {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No topic with id " + id);
        }

        var topic = topicDb.get();

        return topicMapper.mapTopicToTopicWithPostsDto(topic);
    }
}
