package com.example.fullstackforum.health;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Health getHealth(boolean includeDetails) {
        return HealthIndicator.super.getHealth(true);
    }

    @Override
    public Health health() {
        log.info("Checking health status of services");
        return checkDatabaseHealthStatus();
    }

    private Health checkDatabaseHealthStatus() {
        log.info("Checking health status of database");

        try {
            final int QUERY_RESULT = 1;

            var result = entityManager.createQuery("SELECT 1").getSingleResult();
            var isCorrectTestResult = (int) result == QUERY_RESULT;

            if (isCorrectTestResult) {
                log.info("Health status ok");
            }

        } catch (Exception e) {
            log.error("Health status error: {}", e.getMessage());
            return Health.outOfService().withException(e).build();
        }

        return Health.up().build();
    }
}
