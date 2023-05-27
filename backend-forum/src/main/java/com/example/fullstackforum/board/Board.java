package com.example.fullstackforum.board;

import com.example.fullstackforum.topic.Topic;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "boards")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 255, nullable = false)
    private String board;

    @Column(length = 1023)
    private String adjective;

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Topic> topics = new ArrayList<>();

}
