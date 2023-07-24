package com.example.fullstackforum.posts;

import com.example.fullstackforum.auth.AuthenticationService;
import com.example.fullstackforum.topic.TopicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;


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

    public PostDto addVoteForPost(Integer postId) {
        var reqUser = authenticationService.getAuthenticatedRequestUser();
        var post = postRepository.findById(postId);

        if (post.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No post with id " + postId);
        }

        var dbPost = post.get();
        var votedUsers = dbPost.getVotedUsers();

        var usedVotedAlready = votedUsers.stream()
                .anyMatch(user -> Objects.equals(user.getId(), reqUser.getId()));

        if (usedVotedAlready) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User have already voted post " + postId
            );
        }

        dbPost.getVotedUsers().add(reqUser);
        var savedVotePostDb = postRepository.save(dbPost);
        return postMapper.mapPostToPostDto(savedVotePostDb);
    }
}
