package com.example.fullstackforum.misc.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    public void saveSessionToDatabase(String sessionId) {
        var statisticsEntity = Statistics.builder().sessionId(sessionId).build();
        statisticsRepository.save(statisticsEntity);
    }
}
