package com.example.fullstackforum.board;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BoardController {

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
    private final BoardService boardService;

    public BoardController(BoardService boardService, BoardRepository boardRepository) {
        this.boardService = boardService;
    }

    @GetMapping(value = "/board")
    List<BoardDto> getBoards() {
        logger.info("Fetch all boards");
        return boardService.getAllBoards();
    }

}
