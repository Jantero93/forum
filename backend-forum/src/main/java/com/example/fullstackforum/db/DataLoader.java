package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.security.user.Role;
import com.example.fullstackforum.security.user.User;
import com.example.fullstackforum.security.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements ApplicationRunner {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Starting initializing data with DataLoader");

        generateBoards();
        generateAdminUser();

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

    private void generateBoards() {
        if (boardRepository.count() > 0) {
            log.info("Skipped initializing, boardRepository size {}", boardRepository.count());
            return;
        }

        var board1 = Board.builder().name("Tietokoneet").description("Tietokoneet rulaa").build();
        var board2 = Board.builder().name("Kissat").description("Miu may miu").build();
        var board3 = Board.builder().name("Koirat").description("Wuf wuf wuf wuf").build();

        var boardList = Arrays.asList(board1, board2, board3);
        boardRepository.saveAll(boardList);
        log.info("Initialized boards repository with mock up data");
    }
}
