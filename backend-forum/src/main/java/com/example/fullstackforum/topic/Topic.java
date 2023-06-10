package com.example.fullstackforum.topic;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.posts.Post;
import com.example.fullstackforum.security.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private String message;
    private Integer votes;

    @ManyToOne()
    private Board board;

    @ManyToOne()
    private User user;

    @OneToMany(mappedBy = "topic")
    private List<Post> posts;

}
