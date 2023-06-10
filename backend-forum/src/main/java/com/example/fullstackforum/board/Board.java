package com.example.fullstackforum.board;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

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

    private String adjective;

    // topics
}
