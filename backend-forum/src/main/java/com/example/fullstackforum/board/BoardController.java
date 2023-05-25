package com.example.fullstackforum.board;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService, BoardRepository boardRepository) {
        this.boardService = boardService;
    }

    @GetMapping(value = "/board")
    List<BoardDto> getBoards() {
        log.info("Fetch all boards");
        return boardService.getAllBoards();
    }

}
