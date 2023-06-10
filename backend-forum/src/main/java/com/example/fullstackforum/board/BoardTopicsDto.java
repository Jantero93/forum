package com.example.fullstackforum.board;

import lombok.Builder;

import java.util.List;

@Builder
public record BoardTopicsDto(Integer id, String name, String adjective, List<?> topicsDto) {
}
