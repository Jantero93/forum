package com.example.fullstackforum.helpers;

import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.posts.PostRepository;
import com.example.fullstackforum.security.JwtService;
import com.example.fullstackforum.security.token.TokenRepository;
import com.example.fullstackforum.topic.TopicRepository;
import com.example.fullstackforum.user.User;
import com.example.fullstackforum.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestHelpers {

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

    @Autowired
    private JwtService jwtService;

    public void clearAllData() {
        tokenRepository.deleteAll();
        postRepository.deleteAll();
        topicRepository.deleteAll();
        userRepository.deleteAll();
        boardRepository.deleteAll();
    }

    public String getTokenForUser(User user) {
        return jwtService.generateToken((UserDetails) user);
    }


}
