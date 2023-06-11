package com.example.fullstackforum.board;

import lombok.Builder;

@Builder
public record BoardDto(Integer id, String name, String description) {
}
