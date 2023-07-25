package com.example.fullstackforum.health;

import com.example.fullstackforum.security.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthContributor;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class HealthService implements HealthIndicator, HealthContributor {

    private final UserRepository userRepository;

    @Override
    public Health getHealth(boolean includeDetails) {
        return HealthIndicator.super.getHealth(true);
    }

    @Override
    public Health health() {
        log.info("Checking health status");

        try {
            if (userRepository.count() >= 0) {
                log.info("Health status ok");
            }
        } catch (Exception e) {
            log.error("Health status error: {}", e.getMessage());
            return Health.outOfService().withException(e).build();
        }

        return Health.up().build();
    }
}
