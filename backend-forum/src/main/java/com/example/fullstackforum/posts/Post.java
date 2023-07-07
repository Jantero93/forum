package com.example.fullstackforum.posts;

import com.example.fullstackforum.security.user.User;
import com.example.fullstackforum.topic.Topic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "posts")
@Builder
public class Post {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(length = 8191)
    private String message;

    private Integer votes;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdTime;

    @ManyToOne()
    private User user;

    @ManyToOne()
    private Topic topic;
}
