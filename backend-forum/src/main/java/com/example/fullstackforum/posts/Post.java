package com.example.fullstackforum.posts;

import com.example.fullstackforum.user.User;
import com.example.fullstackforum.topic.Topic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;

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

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedTime;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isDeleted;

    @ManyToOne()
    private User user;

    @ManyToOne()
    private Topic topic;

    @ManyToMany()
    private List<User> votedUsers;

}
