package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.posts.Post;
import com.example.fullstackforum.posts.PostRepository;
import com.example.fullstackforum.user.Role;
import com.example.fullstackforum.user.User;
import com.example.fullstackforum.user.UserRepository;
import com.example.fullstackforum.topic.Topic;
import com.example.fullstackforum.topic.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Random;
import java.util.stream.IntStream;

@Component
@Slf4j
@RequiredArgsConstructor
public class DataFakerService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TopicRepository topicRepository;
    private final PostRepository postRepository;

    @Value("${WEBAPP_ADMIN_USERNAME}")
    private String adminUsername;

    @Value("${WEBAPP_ADMIN_USER_PASSWORD}")
    private String adminPassword;

    @Bean
    public Faker faker() {
        return new Faker();
    }

    @Bean
    public Random random() {
        return new Random();
    }


    public Board generateMockupBoard() {
        return Board.builder()
                .description(faker().lorem().sentence(10))
                .name(faker().lorem().word())
                .topics(null)
                .build();
    }

    public Topic generateMockupTopic() {
        return Topic.builder()
                .heading(faker().lorem().word())
                .message(faker().lorem().sentence(10))
                .posts(null)
                .build();
    }

    public User generateMockupUser() {
        return User.builder()
                .email(faker().internet().emailAddress())
                .password(
                        passwordEncoder.encode(faker().internet().password())
                )
                .role(Role.USER)
                .posts(null)
                .topics(null)
                .tokens(null)
                .build();
    }

    public Post generateMockupPost() {
        return Post.builder()
                .votes(0)
                .topic(null)
                .user(null)
                .message(faker().lorem().word())
                .build();
    }

    @Transactional
    public void generateDbInitializationData() {
        log.info("Starting initializing data with {} class", getClass().getSimpleName());

        generateAdminUser();
        generateNormalUser();
        generateBoardsWithTopicsAndPosts();

        log.info("Initialized all data");
    }

    private void generateAdminUser() {
        log.info("Initializing admin user");
        var adminDbUser = userRepository.findByEmail(adminUsername);

        if (adminDbUser.isPresent()) {
            log.info("Admin user exists, skipping initialization");
            return;
        }

        var admin = User.builder()
                .email(adminUsername)
                .password(passwordEncoder.encode(adminPassword))
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
                .email(faker().internet().emailAddress())
                .password(
                        passwordEncoder.encode(faker().internet().password())
                )
                .role(Role.USER)
                .build();
        var userDb = userRepository.save(user);

        log.info("Created fake user with email: {}", userDb.getEmail());
    }

    private void generateBoardsWithTopicsAndPosts() {
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

        generateTopicsForBoard(board1, getRandomNumber(1, 10));
        generateTopicsForBoard(board2, getRandomNumber(1, 10));
        generateTopicsForBoard(board3, getRandomNumber(1, 10));

        log.info("Initialized database with mock up data");
    }

    private void generateTopicsForBoard(Board board, int topicCount) {

        log.info("Generating topics for board: {}", board.getId());
        var users = userRepository.findAll();
        var notUserAdmin = users.stream()
                .filter(
                        u -> !u.getEmail().equals(adminUsername)
                )
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Error on getting fake user for fake topics"));

        var topicList = IntStream.range(0, topicCount).mapToObj(
                i -> {
                    var fakeHeader = faker().lorem().word();
                    var fakeMsg = faker().lorem().sentence(40);
                    return Topic.builder()
                            .board(board)
                            .heading(fakeHeader)
                            .message(fakeMsg)
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
                .filter(user -> !user.getEmail().equals(adminUsername))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Error on getting fake user for fake posts"));

        var postList = IntStream.range(0, postsCount).mapToObj(
                i -> {
                    var fakeMsg = faker().lorem().sentence(40);
                    return Post.builder()
                            .topic(topic)
                            .message(fakeMsg)
                            .user(fakeUser)
                            .build();

                }
        ).toList();

        postRepository.saveAll(postList);
    }

    private int getRandomNumber(int start, int end) {
        var rand = random();
        return rand.nextInt((end - start) + 1) + start;
    }

}
