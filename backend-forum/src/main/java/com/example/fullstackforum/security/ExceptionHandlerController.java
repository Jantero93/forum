package com.example.fullstackforum.security;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;

@RestControllerAdvice
@Slf4j
public class ExceptionHandlerController {

    @ExceptionHandler(value = ResponseStatusException.class)
    public ResponseEntity<ExceptionResponse> responseExceptionHandler(ResponseStatusException ex, WebRequest request) {
        var errorMsg = ex.getReason() == null ? ex.getMessage() : ex.getReason();

        log.warn("Sending response exception, statuscode: {}, message: {}", ex.getStatusCode(), errorMsg);


        var body = new ExceptionResponse(errorMsg);
        return new ResponseEntity<>(body, ex.getStatusCode());
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponse> internalExceptionHandler(Exception ex, WebRequest request) {
        log.error("Sending internal exception with message: {}", ex.getMessage());
        log.error("Stack trace: {}", Arrays.stream(ex.getStackTrace()).toList());

        var body = new ExceptionResponse(ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = ExpiredJwtException.class)
    public ResponseEntity<ExceptionResponse> jwtExpiredException(ExpiredJwtException exception) {
        log.error("JWT expired: {}", exception.getMessage());

        var body = new ExceptionResponse(exception.getMessage());

        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }
}

@Data
@AllArgsConstructor
class ExceptionResponse {
        private String message;
}