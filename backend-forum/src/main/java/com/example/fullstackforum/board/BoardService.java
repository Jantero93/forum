package com.example.fullstackforum.board;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;

    List<BoardDto> getAllBoards() {
        log.info("Fetching all boards");
        var boards = boardRepository.findAll();

        return boards
                .stream()
                .map(board -> new BoardDto(board.getId(), board.getName(), board.getAdjective()))
                .toList();
    }

    public BoardTopicsDto getBoardByName(String name) {
        log.info("Fetching board with topics by board name: {}", name);
        var board = boardRepository.findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No board with name: " + name));


        return BoardTopicsDto.builder()
                .id(board.getId())
                .name(board.getName())
                .adjective(board.getAdjective())
                .topicsDto(null)
                .build();
    }
}
