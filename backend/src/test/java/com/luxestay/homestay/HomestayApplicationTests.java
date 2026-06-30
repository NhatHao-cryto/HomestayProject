package com.luxestay.homestay;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class HomestayApplicationTests {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void contextLoads() {
        String hash = "$2a$10$wKxN74bOszD5eZ7x9/LdDu7H45g4/d5y1pG8S7w.vQc8mG9h9rI8e";
        System.out.println("====================================================");
        System.out.println("Match 12345678: " + passwordEncoder.matches("12345678", hash));
        System.out.println("Generated for 12345678: " + passwordEncoder.encode("12345678"));
        System.out.println("====================================================");
    }

}
