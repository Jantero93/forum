package com.example.fullstackforum.posts;

import lombok.Data;

@Data
public class SavePostRequest {

    private String user;
    private String message;
    private Integer topicId;
}
