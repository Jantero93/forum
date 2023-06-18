package com.example.fullstackforum.board;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BoardApiTests {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TestRestTemplate restTemplate;

    private static final String url = "http://localhost:8080/api/";


    @Test
    public void testFindAllBoards_ShouldReturnOk() {
        var testBoard = Board.builder()
                .name("testBoard")
                .description("testDescription")
                .build();

        boardRepository.save(testBoard);

        var res = restTemplate.exchange(
                url + "boards",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<BoardDto>>() {
                }
        );


        assertNotNull(res.getBody());

        var testBoardFromDb = res.getBody().stream()
                .filter(board -> Objects.equals(board.id(), testBoard.getId()))
                .findFirst()
                .orElse(null);

        assertNotNull(testBoardFromDb);
        assertNotNull(testBoardFromDb.id());
        assertEquals(testBoardFromDb.name(), testBoard.getName());
        assertEquals(testBoardFromDb.description(), testBoard.getDescription());

        boardRepository.delete(testBoard);
    }
}
