package com.example.fullstackforum.posts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class DeletePostResponse {
    private String message;
    private Integer postId;
}
