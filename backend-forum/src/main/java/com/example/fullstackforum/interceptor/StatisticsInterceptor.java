package com.example.fullstackforum.interceptor;

import com.example.fullstackforum.misc.statistics.StatisticsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class StatisticsInterceptor implements HandlerInterceptor {

    @Autowired
    private StatisticsService statisticsService;

    private static final String AUTHORIZATION_HEADER = "authorization";

    @Override
    public boolean preHandle(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler
    ) throws Exception {
        final String authHeader = request.getHeader(AUTHORIZATION_HEADER);

        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            return true;
        }

        var ip = request.getRemoteAddr();
        var sessionId = request.getSession().getId();
        var username = (String) request.getAttribute("username");

        if (username != null) {
            log.info("Saving session to database with username: {}", username);
        }

        statisticsService.saveSessionToDatabase(ip, sessionId, username);
        return true;
    }
}
