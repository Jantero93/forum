package com.example.fullstackforum.config;

import lombok.AllArgsConstructor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@AllArgsConstructor
public class TestConfig {

    public String getApiUrl() {
        return "http://localhost:8080/api/";
    }

    @Bean
    public RestTemplate restTemplate() {
        var restTemplateBuilder = new RestTemplateBuilder();
        return restTemplateBuilder.build();
    }
}
