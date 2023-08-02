package com.example.fullstackforum.topic;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.posts.Post;
import com.example.fullstackforum.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
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

    private String heading;

    @Column(length = 8191)
    private String message;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdTime;

    @ManyToOne()
    private Board board;

    @ManyToOne()
    private User user;

    @OneToMany(mappedBy = "topic")
    private List<Post> posts;

}
