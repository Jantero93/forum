package com.example.fullstackforum.apitests;

import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.config.TestConfig;
import com.example.fullstackforum.db.DataFakerService;
import com.example.fullstackforum.posts.PostRepository;
import com.example.fullstackforum.user.UserRepository;
import com.example.fullstackforum.topic.TopicRepository;
import com.example.fullstackforum.topic.TopicWithPostsDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TopicApiTests {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TestConfig testConfig;

    @Autowired
    private DataFakerService dataFakerService;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Test
    void getTopic_ShouldReturnOk() {

        // Set up
        var mockupTopic = dataFakerService.generateMockupTopic();
        var mockupBoard = dataFakerService.generateMockupBoard();
        var mockupUser = dataFakerService.generateMockupUser();

        var dbUser = userRepository.save(mockupUser);
        var dbBoard = boardRepository.save(mockupBoard);

        mockupTopic.setBoard(dbBoard);
        mockupTopic.setUser(dbUser);

        var dbTopic = topicRepository.save(mockupTopic);

        // Action
        var requestUrl = testConfig.getApiUrl() + "topics/" + dbTopic.getId();
        var res = restTemplate.getForEntity(
                requestUrl,
                TopicWithPostsDto.class
        );

        var body = res.getBody();

        // Response
        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertNotNull(body);
        Assertions.assertTrue(body.createdTime().before(new Date()));
        // Topic
        Assertions.assertEquals(dbTopic.getId(), body.id());
        Assertions.assertEquals(dbTopic.getHeading(), body.header());
        Assertions.assertEquals(dbTopic.getMessage(), body.message());
        // Relations
        Assertions.assertEquals(dbTopic.getBoard().getId(), dbBoard.getId());
        Assertions.assertEquals(dbTopic.getUser().getId(), dbUser.getId());

        // Clean up
        topicRepository.delete(dbTopic);
        boardRepository.delete(dbBoard);
        userRepository.delete(dbUser);
    }

    @Test
    void getTopic_ShouldReturnNotFound() {

        // Set up
        var mockupTopic = dataFakerService.generateMockupTopic();
        var mockupBoard = dataFakerService.generateMockupBoard();
        var mockupUser = dataFakerService.generateMockupUser();

        var dbUser = userRepository.save(mockupUser);
        var dbBoard = boardRepository.save(mockupBoard);

        mockupTopic.setBoard(dbBoard);
        mockupTopic.setUser(dbUser);

        var dbTopic = topicRepository.save(mockupTopic);


        try {
            var requestUrl = testConfig.getApiUrl() + "topics/" + -9999;
            var res = restTemplate.getForEntity(
                    requestUrl,
                    TopicWithPostsDto.class
            );

        } catch (HttpStatusCodeException ex) {
            Assertions.assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        }

        topicRepository.delete(dbTopic);
        userRepository.delete(dbUser);
        boardRepository.delete(dbBoard);
    }
}
