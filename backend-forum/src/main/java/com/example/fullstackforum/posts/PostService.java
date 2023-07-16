package com.example.fullstackforum.posts;

import com.example.fullstackforum.auth.AuthenticationService;
import com.example.fullstackforum.security.user.UserService;
import com.example.fullstackforum.topic.TopicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final TopicService topicService;
    private final AuthenticationService authenticationService;
    private final PostMapper postMapper;

    public PostDto savePost(NewPostRequest requestBody) {
        log.info("Creating new post with data: {}", requestBody);
        var user = authenticationService.getAuthenticatedRequestUser();

        var topic = topicService.getTopicById(requestBody.topicId());

        var post = Post.builder()
                .message(requestBody.message())
                .user(user)
                .votes(0)
                .topic(topic)
                .build();

        var newPostDb = postRepository.save(post);
        return postMapper.mapPostToPostDto(newPostDb);
    }

}
