package com.example.fullstackforum.apitests;


import com.example.fullstackforum.config.TestConfig;
import com.example.fullstackforum.db.DataFakerService;
import com.example.fullstackforum.helpers.UserLoggedService;
import com.example.fullstackforum.posts.NewPostRequest;
import com.example.fullstackforum.posts.PostDto;
import com.example.fullstackforum.posts.PostRepository;
import com.example.fullstackforum.security.user.UserRepository;
import com.example.fullstackforum.topic.TopicRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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
    private UserLoggedService userLoggedService;

    @Test
    void savePostToTopic() {
        final String username = "test.com";
        final String password = "123";
        var token = userLoggedService.createAndLogInTestUser(username, password);

        var userDb = userRepository.findByEmail(username);
        Assertions.assertTrue(userDb.isPresent());

        var mockUpTopic = dataFakerService.generateMockupTopic();
        mockUpTopic.setUser(userDb.get());
        var topicDb = topicRepository.save(mockUpTopic);

        // Set Bearer token
        var headers = new HttpHeaders();
        headers.setBearerAuth(token);

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
        Assertions.assertEquals(body.user(), username);
        Assertions.assertEquals(body.votes(), 0);
        Assertions.assertTrue(body.createdTime().before(new Date()));

        // Delete mock up date
        postRepository.deleteById(body.id());
        topicRepository.deleteById(topicDb.getId());
        userLoggedService.deleteTestUser(username);
    }

    @Test
    void addVoteForPost() {

        // Set up

        final String username = "test.com";
        final String password = "123";
        var token = userLoggedService.createAndLogInTestUser(username, password);

        var userDb = userRepository.findByEmail(username);
        Assertions.assertTrue(userDb.isPresent());

        var mockUpTopic = dataFakerService.generateMockupTopic();
        mockUpTopic.setUser(userDb.get());
        var topicDb = topicRepository.save(mockUpTopic);

        // Set Bearer token
        var headers = new HttpHeaders();
        headers.setBearerAuth(token);

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
        Assertions.assertEquals(username, newPostBody.user());
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

        // Delete mock up date
        postRepository.deleteById(newPostBody.id());
        topicRepository.deleteById(topicDb.getId());
        userLoggedService.deleteTestUser(username);
    }


}
