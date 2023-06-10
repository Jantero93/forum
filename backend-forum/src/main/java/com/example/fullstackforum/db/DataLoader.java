package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements ApplicationRunner {

    private final BoardRepository boardRepository;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Starting initializing data with DataLoader");

        if (boardRepository.count() > 0) {
            log.info("Skipped initializing, boardRepository size {}", boardRepository.count());
            return;
        }

        var board1 = Board.builder().name("Tietokoneet").adjective("Tietokoneet rulaa").build();
        var board2 = Board.builder().name("Kissat").adjective("Miu may miu").build();
        var board3 = Board.builder().name("Koirat").adjective("Wuf wuf wuf wuf").build();

        var boardList = Arrays.asList(board1, board2, board3);
        boardRepository.saveAll(boardList);
        log.info("Initialized boards repository with mock up data");
    }
}
