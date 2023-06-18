package com.example.fullstackforum.posts;

import com.example.fullstackforum.auth.AuthenticationService;
import com.example.fullstackforum.security.user.UserService;
import com.example.fullstackforum.topic.TopicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final TopicService topicService;
    private final AuthenticationService authenticationService;
    private final PostMapper postMapper;
    private final UserService userService;

    public PostDto savePost(SavePostRequest requestBody) {
        var requestUserDetails = authenticationService.getRequestUserDetails();

        if (!requestUserDetails.getUsername().equals(requestBody.getUser())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Post request user and authentication user mismatch"
            );
        }

        var user = userService.getUserByEmail(requestBody.getUser());
        var topic = topicService.getTopicById(requestBody.getTopicId());


        var post = Post.builder()
                .message(requestBody.getMessage())
                .user(user)
                .votes(0)
                .topic(topic)
                .build();

        var newPostDb = postRepository.save(post);
        return postMapper.mapPostToPostDto(newPostDb);
    }

}
