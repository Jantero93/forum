package com.example.fullstackforum.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class BoardService {
    private final BoardRepository boardRepository;

    List<BoardDto> getAllBoards() {
        var boards = boardRepository.findAll();

        return boards
                .stream()
                .map(board -> new BoardDto(board.getId(), board.getName(), board.getAdjective()))
                .toList();
    }
}
