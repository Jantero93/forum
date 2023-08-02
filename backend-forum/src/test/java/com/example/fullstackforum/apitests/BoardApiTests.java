package com.example.fullstackforum.apitests;

import com.example.fullstackforum.board.BoardDto;
import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.board.BoardTopicsDto;
import com.example.fullstackforum.config.TestConfig;
import com.example.fullstackforum.db.DataFakerService;
import com.example.fullstackforum.user.UserRepository;
import com.example.fullstackforum.topic.TopicRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BoardApiTests {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DataFakerService dataFakerService;

    @Autowired
    private TestConfig testConfig;

    @Test
    void testFindAllBoards_ShouldReturnOk() {
        var mockUpBoard = dataFakerService.generateMockupBoard();

        boardRepository.save(mockUpBoard);

        var res = restTemplate.exchange(
                testConfig.getApiUrl() + "boards",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<BoardDto>>() {
                }
        );

        assertNotNull(res.getBody());

        var testBoardFromDb = res.getBody().stream()
                .filter(board -> Objects.equals(board.id(), mockUpBoard.getId()))
                .findFirst()
                .orElse(null);

        assertNotNull(testBoardFromDb);
        assertEquals(testBoardFromDb.id(), mockUpBoard.getId());
        assertEquals(testBoardFromDb.name(), mockUpBoard.getName());
        assertEquals(testBoardFromDb.description(), mockUpBoard.getDescription());

        boardRepository.delete(mockUpBoard);
    }

    @Test
    void findBoardByName_ShouldReturnOk() {
        var mockUpBoard = dataFakerService.generateMockupBoard();
        var mockUpTopic = dataFakerService.generateMockupTopic();
        var mockUpUser = dataFakerService.generateMockupUser();

        var userDb = userRepository.save(mockUpUser);
        var boardDb = boardRepository.save(mockUpBoard);
        mockUpTopic.setBoard(boardDb);
        mockUpTopic.setUser(userDb);
        topicRepository.save(mockUpTopic);

        var getUrl = testConfig.getApiUrl() + "board?name=" + mockUpBoard.getName();
        var res = restTemplate.getForEntity(
                getUrl,
                BoardTopicsDto.class
        );

        var body = res.getBody();
        var statusCode = res.getStatusCode();

        assertNotNull(body);
        assertEquals(HttpStatus.OK, statusCode);
        assertEquals(body.id(), boardDb.getId());
        assertEquals(body.adjective(), boardDb.getDescription());
        assertEquals(body.name(), boardDb.getName());

        var topic = body.topics().stream().findFirst().orElse(null);

        assertNotNull(topic);
        assertEquals(topic.id(), mockUpTopic.getId());
        assertEquals(topic.header(), mockUpTopic.getHeading());
        assertEquals(topic.message(), mockUpTopic.getMessage());
        assertEquals(topic.createdTime().getTime(), mockUpTopic.getCreatedTime().getTime());

        topicRepository.deleteById(topic.id());
        userRepository.delete(userDb);
        boardRepository.delete(mockUpBoard);
    }
}
