package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.topic.Topic;
import com.example.fullstackforum.topic.TopicRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Component
@Slf4j
public class OnApplicationStartUp {

    private final BoardRepository boardRepository;
    private final TopicRepository topicRepository;

    public OnApplicationStartUp(BoardRepository boardRepository, TopicRepository topicRepository) {
        this.boardRepository = boardRepository;
        this.topicRepository = topicRepository;
    }

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (!boardRepository.findAll().isEmpty()) {
            log.info("Board repository not empty, skipping data initialization");
            return;
        }

        log.info("Board repository empty, initializing with test data...");

        var board1 = new Board();
        board1.setBoard("Car");
        board1.setAdjective("Cars are funny");

        var board2 = new Board();
        board2.setBoard("Coding");
        board2.setAdjective("Cat cat cat cat");

        var boardList = Arrays.asList(board1, board2);

        var dbBoards = boardRepository.saveAll(boardList);
        var firstDbBoard = dbBoards.get(0);

        var topic1 = new Topic();
        topic1.setTopicName("this is topic");
        topic1.setCreated(new Date());
        topic1.setBoard(firstDbBoard);
        topic1.setPosts(null);
        topic1.setUser(null);

        var dbTopic = topicRepository.save(topic1);

        firstDbBoard.setTopics(Arrays.asList(dbTopic));

        boardRepository.save(firstDbBoard);
    }
}
