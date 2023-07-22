package com.example.fullstackforum.board;

import com.example.fullstackforum.topic.Topic;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name = "boards")
public class Board {

    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "board")
    private List<Topic> topics;
}
