package com.example.fullstackforum.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BoardMapper {

    public BoardDto mapBoardToDto(Board board) {
        return BoardDto.builder()
                .id(board.getId())
                .name(board.getName())
                .description(board.getDescription())
                .build();
    }

}
