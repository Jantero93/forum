package com.example.fullstackforum.board;

import com.example.fullstackforum.db.OnApplicationStartUp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class BoardController {

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
    private final BoardService boardService;
    private final BoardRepository boardRepository;

    public BoardController(BoardService boardService, BoardRepository boardRepository) {
        this.boardService = boardService;
        this.boardRepository = boardRepository;
    }

    @RequestMapping(value = "/board", method = RequestMethod.GET)
    List<Board> getBoards() {
        return boardService.getAllBoards();
    }

    @GetMapping("/api/test")
    List<Board> test(){
        logger.info("test moron moron");
        var test = boardRepository.findAll();
        return test;
    }

}
