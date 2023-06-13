package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.posts.Post;
import com.example.fullstackforum.posts.PostRepository;
import com.example.fullstackforum.security.user.Role;
import com.example.fullstackforum.security.user.User;
import com.example.fullstackforum.security.user.UserRepository;
import com.example.fullstackforum.topic.Topic;
import com.example.fullstackforum.topic.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Random;
import java.util.stream.IntStream;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements ApplicationRunner {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TopicRepository topicRepository;
    private final PostRepository postRepository;
    private final Faker faker;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Starting initializing data with DataLoader class");

        generateAdminUser();
        generateNormalUser();
        generateBoardsWithTopics();

        log.info("Initialized all data");
    }

    private void generateAdminUser() {
        log.info("Initializing admin user");
        var adminDbUser = userRepository.findByEmail("admin");

        if (adminDbUser.isPresent()) {
            log.info("Admin user exists, skipping initialization");
            return;
        }

        var admin = User.builder()
                .email("admin")
                .password(passwordEncoder.encode("root"))
                .role(Role.ADMIN)
                .build();

        userRepository.save(admin);

        log.info("Initialized admin user");
    }

    private void generateNormalUser() {
        if (userRepository.count() > 1) {
            log.info("Normal user(s) already exists, skipping initializing, userRepository size: {}", userRepository.count());
            return;
        }

        var user = User.builder()
                .email(faker.internet().emailAddress())
                .password(
                        passwordEncoder.encode(faker.internet().password())
                )
                .role(Role.USER)
                .build();
        var userDb = userRepository.save(user);

        log.info("Created fake user with email: {}", userDb.getEmail());
    }

    private void generateBoardsWithTopics() {
        if (boardRepository.count() > 0) {
            log.info("Skipped initializing, boardRepository size {}", boardRepository.count());
            return;
        }

        var board1 = Board.builder().name("Tietokoneet").description("Tietokoneet rulaa").build();
        var board2 = Board.builder().name("Kissat").description("Miu may miu").build();
        var board3 = Board.builder().name("Koirat").description("Wuf wuf wuf wuf").build();

        var boardList = Arrays.asList(board1, board2, board3);
        boardRepository.saveAll(boardList);

        var boardNames = boardList.stream().map(Board::getName).toList();
        log.info("Generated boards: {}", boardNames);

        generateTopicsForBoard(board1, 5);
        generateTopicsForBoard(board2, 7);
        generateTopicsForBoard(board3, 1);

        log.info("Initialized boards repository with mock up data");
    }

    private void generateTopicsForBoard(Board board, int topicCount) {

        log.info("Generating topics for board: {}", board.getId());
        var users = userRepository.findAll();
        var notUserAdmin = users.stream()
                .filter(
                        u -> !u.getEmail().equals("admin")
                )
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Error on getting fake user for fake topics"));

        var topicList = IntStream.range(0, topicCount).mapToObj(
                i -> {
                    var fakeHeader = faker.lorem().word();
                    var fakeMsg = StringUtils.join(faker.lorem().words(getRandomNumber(1, 20)), " ");
                    return Topic.builder()
                            .board(board)
                            .heading(fakeHeader)
                            .message(fakeMsg)
                            .votes(getRandomNumber(1, 10))
                            .user(notUserAdmin)
                            .posts(null)
                            .build();
                }
        ).toList();

        var topicListDb = topicRepository.saveAll(topicList);

        topicListDb.forEach(
                topic -> generatePostsForTopic(topic, getRandomNumber(3, 20))
        );

        log.info("Created topics for board: {}", board.getId());
    }

    private void generatePostsForTopic(Topic topic, int postsCount) {
        log.info("Generating posts for topic id: {}", topic.getId());

        var fakeUser = userRepository.findAll()
                .stream()
                .filter(user -> !user.getEmail().equals("admin"))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Error on getting fake user for fake posts"));

        var postList = IntStream.range(0, postsCount).mapToObj(
                i -> {
                    var fakeWordList = faker.lorem().words(getRandomNumber(10, 40));
                    var fakeMsg = StringUtils.join(fakeWordList, " ");
                    return Post.builder()
                            .topic(topic)
                            .message(fakeMsg)
                            .votes(getRandomNumber(1, 20))
                            .user(fakeUser)
                            .build();

                }
        ).toList();

        postRepository.saveAll(postList);
    }

    private int getRandomNumber(int start, int end) {
        var rand = new Random();
        return rand.nextInt((end - start) + 1) + start;
    }
}
