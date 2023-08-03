package com.example.fullstackforum.topic;

import com.example.fullstackforum.auth.AuthenticationService;
import com.example.fullstackforum.board.BoardRepository;
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
    private final AuthenticationService authenticationService;
    private final BoardRepository boardRepository;

    public TopicWithPostsDto getTopicWithPostsByTopicId(Integer id) {
        log.info("Getting topic with posts by topic id: {}", id);

        var topicDb = topicRepository.findById(id);

        if (topicDb.isEmpty()) {
            log.warn("No topic found with id: {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No topic with id " + id);
        }

        var topic = topicDb.get();

        log.info("Filtering deleted posts");
        var onlyNotDeletedPosts = topic.getPosts().stream()
                .filter(post -> !post.isDeleted())
                .toList();

        topic.setPosts(onlyNotDeletedPosts);
        return topicMapper.mapTopicToTopicWithPostsDto(topic);
    }

    public Topic getTopicById(Integer id) {
        var topic = topicRepository.findById(id);

        if (topic.isEmpty()) {
            log.warn("No topic found with id: {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No topic with id " + id);
        }

        return topic.get();
    }

    public TopicDto createNewTopic(NewTopicRequest request) {
        log.info("Creating new topic with request: {}", request);

        var user = authenticationService.getAuthenticatedRequestUser();

        var board = boardRepository.findByName(request.boardName());

        if (board.isEmpty()) {
            log.warn("No board found with board name: {}", request.boardName());
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No board found with name: " + request.boardName()
            );
        }

        var topic = Topic.builder()
                .message(request.message())
                .heading(request.heading())
                .board(board.get())
                .user(user)
                .build();

        var topicDb = topicRepository.save(topic);

        log.info("Topic created successfully, topic id: {}", topic.getId());

        return topicMapper.mapTopicToDto(topicDb);
    }
}
