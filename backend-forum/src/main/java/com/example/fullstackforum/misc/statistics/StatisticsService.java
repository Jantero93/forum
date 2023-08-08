package com.example.fullstackforum.misc.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    public void saveSessionToDatabase(String remoteAddress, String sessionId) {
        var statisticsEntity = Statistics.builder()
                .sessionId(sessionId)
                .ipAddress(remoteAddress)
                .build();

        statisticsRepository.save(statisticsEntity);
    }
}
