package com.example.fullstackforum.misc.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    public void saveSessionToDatabase(
            String remoteAddress,
            String sessionId,
            String username,
            String path
    ) {
        var statisticsEntity = Statistics.builder()
                .sessionId(sessionId)
                .ipAddress(remoteAddress)
                .username(username)
                .path(path)
                .build();

        statisticsRepository.save(statisticsEntity);
    }
}
