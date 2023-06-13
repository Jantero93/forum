package com.example.fullstackforum.db;

import net.datafaker.Faker;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DataloaderUtils {

    @Bean
    public Faker faker() {
        return new Faker();
    }

}
