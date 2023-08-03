package com.example.fullstackforum.apitests;


import com.example.fullstackforum.board.BoardRepository;
import com.example.fullstackforum.config.TestConfig;
import com.example.fullstackforum.db.DataFakerService;
import com.example.fullstackforum.helpers.TestHelpers;
import com.example.fullstackforum.posts.DeletePostResponse;
import com.example.fullstackforum.posts.NewPostRequest;
import com.example.fullstackforum.posts.PostDto;
import com.example.fullstackforum.posts.PostRepository;
import com.example.fullstackforum.topic.TopicRepository;
import com.example.fullstackforum.user.Role;
import com.example.fullstackforum.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PostApiTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TestConfig testConfig;

    @Autowired
    private DataFakerService dataFakerService;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private TestHelpers testHelpers;

    @Test
    void savePostToTopic_ShouldReturnOk() {
        var mockUpUser = dataFakerService.generateMockupUser();
        var dbUser = userRepository.save(mockUpUser);

        var mockUpTopic = dataFakerService.generateMockupTopic();
        mockUpTopic.setUser(dbUser);
        var topicDb = topicRepository.save(mockUpTopic);

        var userToken = testHelpers.getTokenForUser(dbUser);

        // Set Bearer token
        var headers = new HttpHeaders();
        headers.setBearerAuth(userToken);

        var testMsg = "Test post message";
        HttpEntity<NewPostRequest> reqEntity = new HttpEntity<>(
                new NewPostRequest(testMsg, topicDb.getId()), headers
        );

        var res = restTemplate.exchange(
                testConfig.getApiUrl() + "posts",
                HttpMethod.POST,
                reqEntity,
                PostDto.class
        );

        var body = res.getBody();

        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertNotNull(body);
        Assertions.assertTrue(body.id() >= 0);
        Assertions.assertEquals(body.message(), testMsg);
        Assertions.assertNotNull(body.id());
        Assertions.assertEquals(body.user(), dbUser.getEmail());
        Assertions.assertEquals(body.votes(), 0);
        Assertions.assertTrue(body.createdTime().before(new Date()));
        Assertions.assertEquals(body.userId(), dbUser.getId());

        // Delete mock up date
        postRepository.deleteById(body.id());
        topicRepository.deleteById(topicDb.getId());
        userRepository.delete(dbUser);
    }

    @Test
    void addVoteForPost_ShouldReturnOk() {
        var mockUpUser = dataFakerService.generateMockupUser();
        var dbUser = userRepository.save(mockUpUser);

        var mockUpTopic = dataFakerService.generateMockupTopic();
        mockUpTopic.setUser(dbUser);
        var topicDb = topicRepository.save(mockUpTopic);

        // Set Bearer token
        var userToken = testHelpers.getTokenForUser(dbUser);

        var headers = new HttpHeaders();
        headers.setBearerAuth(userToken);

        var testMsg = "Test post message";
        HttpEntity<NewPostRequest> reqEntity = new HttpEntity<>(
                new NewPostRequest(testMsg, topicDb.getId()), headers
        );

        var res = restTemplate.exchange(
                testConfig.getApiUrl() + "posts",
                HttpMethod.POST,
                reqEntity,
                PostDto.class
        );

        var newPostBody = res.getBody();

        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertNotNull(newPostBody);
        Assertions.assertTrue(newPostBody.id() >= 0);
        Assertions.assertEquals(testMsg, newPostBody.message());
        Assertions.assertEquals(dbUser.getEmail(), newPostBody.user());
        Assertions.assertEquals(0, newPostBody.votes());
        Assertions.assertTrue(newPostBody.createdTime().before(new Date()));

        // Action
        HttpEntity<NewPostRequest> postReqEntity = new HttpEntity<>(
                null, headers
        );

        var voteRes = restTemplate.exchange(
                testConfig.getApiUrl() + "posts/" + newPostBody.id() + "/vote",
                HttpMethod.POST,
                reqEntity,
                PostDto.class
        );

        var voteBody = voteRes.getBody();

        Assertions.assertEquals(HttpStatus.OK, voteRes.getStatusCode());
        Assertions.assertNotNull(voteBody);
        Assertions.assertEquals(newPostBody.id(), voteBody.id());
        Assertions.assertEquals(newPostBody.message(), voteBody.message());
        Assertions.assertEquals(newPostBody.id(), voteBody.id());
        Assertions.assertEquals(newPostBody.user(), voteBody.user());
        Assertions.assertEquals(newPostBody.votes() + 1, voteBody.votes());
        Assertions.assertEquals(newPostBody.createdTime(), voteBody.createdTime());
        Assertions.assertEquals(newPostBody.userId(), voteBody.userId());

        // Delete mock up date
        postRepository.deleteById(newPostBody.id());
        topicRepository.deleteById(topicDb.getId());
        userRepository.deleteById(dbUser.getId());
    }

    @Test
    void createPostWithoutToken_ShouldReturnUnauthorized() {
        var mockUpUser = dataFakerService.generateMockupUser();
        var dbUser = userRepository.save(mockUpUser);

        var mockUpTopic = dataFakerService.generateMockupTopic();
        mockUpTopic.setUser(dbUser);
        var topicDb = topicRepository.save(mockUpTopic);

        try {
            var requestBody = new NewPostRequest("message", topicDb.getId());
            var res = restTemplate.postForEntity(
                    testConfig.getApiUrl() + "posts",
                    requestBody,
                    PostDto.class
            );
        } catch (HttpStatusCodeException ex) {
            Assertions.assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
        }

        topicRepository.delete(topicDb);
        userRepository.delete(dbUser);
    }

    @Test
    void deletePostWithAdmin_ReturnOk() {
        // Mock up data
        var mockUpAdmin = dataFakerService.generateMockupUser();
        mockUpAdmin.setRole(Role.ADMIN);
        var dbAdmin = userRepository.save(mockUpAdmin);

        var mockUpUser = dataFakerService.generateMockupUser();
        var dbUser = userRepository.save(mockUpUser);

        var mockUpTopic = dataFakerService.generateMockupTopic();
        mockUpTopic.setUser(dbUser);
        var dbTopic = topicRepository.save(mockUpTopic);

        var mockUpPost = dataFakerService.generateMockupPost();
        mockUpPost.setUser(dbUser);
        var dbPost = postRepository.save(mockUpPost);

        // Token
        var adminToken = testHelpers.getTokenForUser(dbAdmin);

        var headers = new HttpHeaders();
        headers.setBearerAuth(adminToken);

        HttpEntity<NewPostRequest> reqEntity = new HttpEntity<>(
                null, headers
        );

        var requestUrl = testConfig.getApiUrl() + "posts/" + dbPost.getId();

        // Action
        var res = restTemplate.exchange(
                requestUrl,
                HttpMethod.DELETE,
                reqEntity,
                DeletePostResponse.class
        );

        var body = res.getBody();

        var updatedPost = postRepository.findById(dbPost.getId());

        // Validation
        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertNotNull(body);
        Assertions.assertEquals(dbPost.getId(), body.getPostId());
        Assertions.assertEquals("Successfully deleted post", body.getMessage());

        Assertions.assertTrue(updatedPost.isPresent());
        Assertions.assertTrue(updatedPost.get().isDeleted());

        postRepository.delete(dbPost);
        topicRepository.delete(dbTopic);
        userRepository.delete(dbUser);
        userRepository.delete(dbAdmin);
    }

    @Test
    void normalUserDeleteOwnPost_ShouldReturnOk() {
        // Mock up data
        var mockUpUser = dataFakerService.generateMockupUser();
        var dbUser = userRepository.save(mockUpUser);

        var mockUpTopic = dataFakerService.generateMockupTopic();
        mockUpTopic.setUser(dbUser);
        var dbTopic = topicRepository.save(mockUpTopic);

        var mockUpPost = dataFakerService.generateMockupPost();
        mockUpPost.setUser(dbUser);
        var dbPost = postRepository.save(mockUpPost);

        // Token
        var userToken = testHelpers.getTokenForUser(dbUser);

        var headers = new HttpHeaders();
        headers.setBearerAuth(userToken);

        HttpEntity<NewPostRequest> reqEntity = new HttpEntity<>(
                null, headers
        );

        var requestUrl = testConfig.getApiUrl() + "posts/" + dbPost.getId();

        // Action
        var res = restTemplate.exchange(
                requestUrl,
                HttpMethod.DELETE,
                reqEntity,
                DeletePostResponse.class
        );

        var body = res.getBody();

        var updatedPost = postRepository.findById(dbPost.getId());

        // Validation
        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertNotNull(body);
        Assertions.assertEquals(dbPost.getId(), body.getPostId());
        Assertions.assertEquals("Successfully deleted post", body.getMessage());

        Assertions.assertTrue(updatedPost.isPresent());
        Assertions.assertTrue(updatedPost.get().isDeleted());

        postRepository.delete(dbPost);
        topicRepository.delete(dbTopic);
        userRepository.delete(dbUser);
    }

}

