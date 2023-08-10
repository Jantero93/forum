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

    @Override
    public boolean preHandle(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler
    ) throws Exception {
        var authenticatedUsername = (String) request.getAttribute("username");
        var ip = request.getRemoteAddr();
        var sessionId = request.getSession().getId();


        if (authenticatedUsername != null) {
            log.info("Saving session statistics to database with authenticated username: {}", authenticatedUsername);
        } else {
            log.info("Saving session statistics without authenticated user");
        }

        statisticsService.saveSessionToDatabase(ip, sessionId, authenticatedUsername);
        return true;
    }
}
