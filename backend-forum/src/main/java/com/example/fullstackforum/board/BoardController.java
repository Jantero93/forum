package com.example.fullstackforum.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/boards")
    public List<BoardDto> getAllBoards() {
        return boardService.getAllBoards();
    }

    @GetMapping("board")
    public BoardTopicsDto getBoardByName(
            @RequestParam(name = "name") String name
    ) {
        return boardService.getBoardByName(name);
    }

}
