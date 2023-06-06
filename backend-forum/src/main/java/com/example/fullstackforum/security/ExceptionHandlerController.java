package com.example.fullstackforum.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(value = ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> exceptionHandler(ResponseStatusException ex, WebRequest request) {
        var errorMsg = ex.getReason() == null ? ex.getMessage() : ex.getReason();
        var body = Map.of("Error", errorMsg);
        return new ResponseEntity<>(body, ex.getStatusCode());
    }
}
