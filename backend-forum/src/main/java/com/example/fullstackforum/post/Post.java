package com.example.fullstackforum.post;

import com.example.fullstackforum.topic.Topic;
import com.example.fullstackforum.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    private Integer votes;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Topic topic;
}
