package com.example.fullstackforum.board;

import com.example.fullstackforum.topic.Topic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 255)
    private String board;

    @Column(length = 1023)
    private String adjective;

    @OneToMany(mappedBy = "board")
    private List<Topic> topics;

}
