package com.example.fullstackforum.posts;

import com.example.fullstackforum.security.user.User;
import com.example.fullstackforum.topic.Topic;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;
import org.springframework.transaction.annotation.Transactional;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.util.Date;
import java.util.Set;

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

    @Formula("(" +
            "SELECT COUNT(*) " +
            "FROM posts p " +
            "JOIN posts_users_ pt ON p.id = pt.voted_posts_id " +
            "WHERE pt.voted_posts_id = id" +
            ")")
    private Integer votes;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdTime;

    @ManyToOne()
    private User user;

    @ManyToOne()
    private Topic topic;

    @ManyToMany()
    private Set<User> votedUsers;

}
