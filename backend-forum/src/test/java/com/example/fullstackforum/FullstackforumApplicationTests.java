package com.example.fullstackforum;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class FullstackforumApplicationTests {

	@Test
	void dummyTest() {
		var foo = "TEST_STRING";
		assertThat(foo).isNotNull();
	}

	@Test
	void dummyTdest() {
		var foo = "TEST_STRING";
		assertThat(foo).isNotNull();
	}

}
