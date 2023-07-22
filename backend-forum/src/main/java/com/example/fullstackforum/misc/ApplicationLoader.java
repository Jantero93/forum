package com.example.fullstackforum.misc;

import com.example.fullstackforum.db.DataFakerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationLoader implements ApplicationRunner {

    private final Environment environment;
    private final DataFakerService dataFakerService;

    @Override
    public void run(ApplicationArguments args) {
        var activeProfiles = Arrays.stream(environment.getActiveProfiles()).toList();

        log.info("Active profiles: {}", activeProfiles);

        if (activeProfiles.contains("dev")) {
            dataFakerService.generateDbInitializationData();
        } else {
            log.info("No 'dev' profile, skipping data initialization");
        }

    }


}
