package com.example.fullstackforum.misc;

import com.example.fullstackforum.db.DataFakerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationLoader implements ApplicationRunner {

    private final DataFakerService dataFakerService;

    @Override
    public void run(ApplicationArguments args) {
        dataFakerService.generateDbInitializationData();
    }


}
