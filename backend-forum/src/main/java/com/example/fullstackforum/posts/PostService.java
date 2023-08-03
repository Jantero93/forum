package com.example.fullstackforum.posts;

import com.example.fullstackforum.auth.AuthenticationService;
import com.example.fullstackforum.topic.TopicService;
import com.example.fullstackforum.user.Role;
import com.example.fullstackforum.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public PostDto addVoteForPost(Integer postId) {
        var reqUser = authenticationService.getAuthenticatedRequestUser();
        var post = postRepository.findById(postId);

        if (post.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No post with id " + postId);
        }

        var dbPost = post.get();
        var votedPosts = dbPost.getVotedUsers();

        var usedVotedAlready = votedPosts.stream()
                .anyMatch(u -> Objects.equals(u.getId(), reqUser.getId()));

        if (usedVotedAlready) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User have already voted post " + postId
            );
        }

        var oldVotedUsers = dbPost.getVotedUsers();
        oldVotedUsers.add(reqUser);

        dbPost.setVotedUsers(oldVotedUsers);
        var savedVotePostDb = postRepository.save(dbPost);
        // TODO FIX THIS SOME DAY!
        // Dirty fix because hibernate can't update formula mapped values on same request
        savedVotePostDb.setVotes(savedVotePostDb.getVotes() + 1);

        return postMapper.mapPostToPostDto(savedVotePostDb);
    }

    public DeletePostResponse deletePost(Integer postId) {
        log.info("Deleting post, postId: {}", postId);

        var user = authenticationService.getAuthenticatedRequestUser();
        var dbPost = postRepository.findById(postId);

        if (dbPost.isEmpty()) {
            log.warn("No post with postId: {}", postId);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found with id " + postId);
        }

        var post = dbPost.get();

        if (!isUserAllowedToDeletePost(post, user)) {
            log.warn(
                    "User not allowed to delete post, postId: {}, userId: {}", post.getId(), user.getId()
            );
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User not allowed to delete post");
        }

        post.setDeleted(true);
        postRepository.save(post);

        log.info("Set isDelete true successfully: {}", post.getId());

        return new DeletePostResponse("Successfully deleted post", postId);
    }

    private boolean isUserAllowedToDeletePost(Post post, User user) {
        var isUsersOwnPost = Objects.equals(post.getUser().getId(), user.getId());
        var isAdmin = user.getRole() == Role.ADMIN;

        return isAdmin || isUsersOwnPost;
    }
}
