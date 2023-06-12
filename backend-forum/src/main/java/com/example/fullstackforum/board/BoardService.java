package com.example.fullstackforum.board;

import com.example.fullstackforum.topic.TopicMapper;
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
    private final TopicMapper topicMapper;
    private final BoardMapper boardMapper;

    List<BoardDto> getAllBoards() {
        log.info("Fetching all boards");
        var boards = boardRepository.findAll();

        return boards
                .stream()
                .map(boardMapper::mapBoardToDto)
                .toList();
    }

    public BoardTopicsDto getBoardByName(String name) {
        log.info("Fetching board with topics by board id: {}", name);

        var boardDb = boardRepository.findByNameIgnoreCase(name);

        if (boardDb.isEmpty()) {
            log.warn("No board with id: {}", name);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No board with name: " + name);
        }

        var board = boardDb.get();

        return boardMapper.mapBoardTopicsToBoardTopicsDto(board);
    }
}
