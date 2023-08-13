package com.example.fullstackforum.middleware.interceptors;

import com.example.fullstackforum.misc.statistics.StatisticsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

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
        var path = request.getRequestURI();

        statisticsService.saveSessionToDatabase(ip, sessionId, authenticatedUsername, path);
        return true;
    }
}
