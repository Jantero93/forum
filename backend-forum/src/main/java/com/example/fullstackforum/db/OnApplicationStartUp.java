package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.topic.Topic;
import com.example.fullstackforum.topic.TopicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class OnApplicationStartUp {

    private final BoardRepository boardRepository;
    private final TopicRepository topicRepository;

    private static final Logger logger = LoggerFactory.getLogger(OnApplicationStartUp.class);


    public OnApplicationStartUp(BoardRepository boardRepository, TopicRepository topicRepository) {
        this.boardRepository = boardRepository;
        this.topicRepository = topicRepository;
    }

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        
        if (!boardRepository.findAll().isEmpty()) {
            logger.info("Board repository not empty, skipping data initialization");
            return;
        }

        logger.info("Board repository empty, initializing with test data...");

        var board1 = new Board();
        board1.setBoard("Car");
        board1.setAdjective("Cars are funny");

        var board2 = new Board();
        board2.setBoard("Coding");
        board2.setAdjective("Cat cat cat cat");

        var boards = Arrays.asList(board1, board2);

        var topic1 = new Topic();
        topic1.setTopicName("this is topic");
        topic1.setCreated(new Date());
        topic1.setPosts(null);
        topic1.setUser(null);

        topicRepository.save(topic1);

        board1.setTopics(Arrays.asList(topic1));

        boardRepository.saveAll(boards);
    }
}
