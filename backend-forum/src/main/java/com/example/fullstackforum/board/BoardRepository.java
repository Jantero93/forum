package com.example.fullstackforum.board;

import com.example.fullstackforum.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Optional<Board> findByNameIgnoreCase(String name);
}
