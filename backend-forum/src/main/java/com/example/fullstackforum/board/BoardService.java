package com.example.fullstackforum.board;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<BoardDto> getAllBoards() {
        List<Board> boards = boardRepository.findAll();

        return boards.stream().map(
                x -> new BoardDto(x.getId(), x.getBoard(), x.getAdjective())
        ).toList();
    }
}
