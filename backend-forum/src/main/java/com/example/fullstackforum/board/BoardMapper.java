package com.example.fullstackforum.board;

import com.example.fullstackforum.topic.TopicMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BoardMapper {

    private final TopicMapper topicMapper;

    public BoardDto mapBoardToDto(Board board) {
        return BoardDto.builder()
                .id(board.getId())
                .name(board.getName())
                .description(board.getDescription())
                .build();
    }

    public BoardTopicsDto mapBoardTopicsToBoardTopicsDto(Board board) {
        return BoardTopicsDto.builder()
                .id(board.getId())
                .name(board.getName())
                .adjective(board.getDescription())
                .topics(
                        board.getTopics().stream().map(topicMapper::mapTopicToDto).toList()
                )
                .build();
    }

}
