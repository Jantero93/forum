package com.example.fullstackforum.topic;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.post.Post;
import com.example.fullstackforum.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    private String topicName;

    @OneToMany(mappedBy = "topic", fetch = FetchType.LAZY)
    private List<Post> posts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "FK_Topics_Boards_Board_Id"))
    @JsonIgnoreProperties("topics")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

}
