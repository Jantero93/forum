package com.example.fullstackforum.misc;

import com.example.fullstackforum.db.DataFakerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.datasource.url}")
    private String connectionString;

    @Override
    public void run(ApplicationArguments args) {
        var activeProfiles = Arrays.stream(environment.getActiveProfiles()).toList();

        log.info("Active profiles: {}", activeProfiles);

        if(!activeProfiles.contains("prod")) {
            log.info("Connection string: {}", connectionString);
        }

        var isDevOrProdProfile = activeProfiles.contains("dev") || activeProfiles.contains("prod");

        if (isDevOrProdProfile) {
            dataFakerService.generateDbInitializationData();
        } else {
            log.info("No 'dev' or 'prod' profile, skipping data initialization");
        }

        log.info("--- Backend ready to use ---");
    }


}
