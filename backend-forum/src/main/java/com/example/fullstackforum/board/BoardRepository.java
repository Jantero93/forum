package com.example.fullstackforum.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Optional<Board> findByName(String name);
}
