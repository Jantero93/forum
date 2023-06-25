package com.example.fullstackforum.board;

import com.example.fullstackforum.db.DataFakerService;
import com.example.fullstackforum.security.user.UserRepository;
import com.example.fullstackforum.topic.TopicRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BoardApiTests {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private DataFakerService dataFakerService;

    private static final String url = "http://localhost:8080/api/";

    @Test
    public void testFindAllBoards_ShouldReturnOk() {
        var mockUpBoard = dataFakerService.generateMockupBoard();

        boardRepository.save(mockUpBoard);

        var res = restTemplate.exchange(
                url + "boards",
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
    void findBoardByName() {
        var mockUpBoard = dataFakerService.generateMockupBoard();
        var mockUpTopic = dataFakerService.generateMockupTopic();
        var mockUpUser = dataFakerService.generateMockupUser();


        var userDb = userRepository.save(mockUpUser);
        var boardDb = boardRepository.save(mockUpBoard);
        mockUpTopic.setBoard(boardDb);
        mockUpTopic.setUser(userDb);
        topicRepository.save(mockUpTopic);

        var getUrl = url + "board?name=" + mockUpBoard.getName();
        var res = restTemplate.getForEntity(
                getUrl,
                BoardTopicsDto.class
        );

        var body = res.getBody();
        var statusCode = res.getStatusCode();

        assertNotNull(body);

        assertEquals(statusCode, HttpStatus.OK);
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
