package com.example.fullstackforum.helpers;

import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.posts.PostRepository;
import com.example.fullstackforum.security.token.TokenRepository;
import com.example.fullstackforum.user.UserRepository;
import com.example.fullstackforum.topic.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DatabaseHelper {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public void clearAllData() {
        tokenRepository.deleteAll();
        postRepository.deleteAll();
        topicRepository.deleteAll();
        userRepository.deleteAll();
        boardRepository.deleteAll();
    }


}
