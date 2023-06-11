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
    private final BoardMapper boardMapper;

    List<BoardDto> getAllBoards() {
        log.info("Fetching all boards");
        var boards = boardRepository.findAll();

        return boards
                .stream()
                .map(boardMapper::mapBoardToDto)
                .toList();
    }

    public BoardTopicsDto getBoardById(Integer id) {
        log.info("Fetching board with topics by board id: {}", id);

        var boardDb = boardRepository.findById(id);

        if (boardDb.isEmpty()) {
            log.warn("No board with id: {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No board with id: " + id);
        }

        var board = boardDb.get();

        return BoardTopicsDto.builder()
                .id(board.getId())
                .name(board.getName())
                .adjective(board.getDescription())
                .topics(null)
                .build();
    }
}
