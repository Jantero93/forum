package com.example.fullstackforum.health;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.actuate.health.Health;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final HealthService healthService;

    @GetMapping("")
    Health getDatabaseHealth() {
        return healthService.health();
    }
}
