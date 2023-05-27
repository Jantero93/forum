package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.topic.Topic;
import com.example.fullstackforum.topic.TopicRepository;
import com.example.fullstackforum.user.ERole;
import com.example.fullstackforum.user.Role;
import com.example.fullstackforum.user.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class OnApplicationStartUp {

    private final BoardRepository boardRepository;
    private final TopicRepository topicRepository;
    private final RoleRepository roleRepository;

    public OnApplicationStartUp(
            BoardRepository boardRepository,
            TopicRepository topicRepository,
            RoleRepository roleRepository
    ) {
        this.boardRepository = boardRepository;
        this.topicRepository = topicRepository;
        this.roleRepository = roleRepository;
    }

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        initializeAppData();
        saveMockUpData();
    }

    private void initializeAppData() {
        log.info("Initializing db with user roles");

        var userRole = new Role(1L, ERole.ROLE_USER);
        var moderatorRole = new Role(2L, ERole.ROLE_MODERATOR);
        var adminRole = new Role(3L, ERole.ROLE_ADMIN);

        if (!roleRepository.existsById(userRole.getId())) {
            roleRepository.save(userRole);
        }

        if (!roleRepository.existsById(moderatorRole.getId())) {
            roleRepository.save(moderatorRole);
        }

        if (!roleRepository.existsById(adminRole.getId())) {
            roleRepository.save(adminRole);
        }
    }


    private void saveMockUpData() {
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

        firstDbBoard.setTopics(List.of(dbTopic));

        boardRepository.save(firstDbBoard);
    }
}
