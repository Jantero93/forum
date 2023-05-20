package com.forum.javaforumbackend.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    private final TestEntityRepository testEntityRepository;

    public TestController(TestEntityRepository testEntityRepository){
        this.testEntityRepository = testEntityRepository;
    }

    @GetMapping("/test")
    public TestEntity testFunction() {
        var newEntity = new TestEntity();
        newEntity.setName("new name");
        return testEntityRepository.save(newEntity);
    }
}
