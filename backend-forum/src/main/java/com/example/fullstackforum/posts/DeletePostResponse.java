package com.example.fullstackforum.posts;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeletePostResponse {
    private String message;
    private Integer postId;
}
