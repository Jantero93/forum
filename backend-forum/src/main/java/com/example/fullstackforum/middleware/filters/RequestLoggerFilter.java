package com.example.fullstackforum.middleware.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(1)
@Slf4j
public class RequestLoggerFilter implements Filter {
    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {
        var req = (HttpServletRequest) request;

        var path = req.getRequestURI();
        var method = req.getMethod();

        log.info("------------ Incoming request ------------");

        log.info("Path: {}, method: {}", path, method);
        if (!req.getParameterMap().isEmpty()) {
            log.info("Path parameter keys and values");
            req.getParameterMap().forEach(
                    (key, value) -> log.info("Parameter key: {}, value: {}", key, value)
            );
        }
        if (req.getAttribute("username") != null) {
            log.info("Authenticated username: {}", req.getAttribute("username"));
        }

        chain.doFilter(request, response);
    }
}
