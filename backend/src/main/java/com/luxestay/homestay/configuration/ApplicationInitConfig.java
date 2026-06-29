package com.luxestay.homestay.configuration;


import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.enums.Role;
import com.luxestay.homestay.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return  args -> {
            if (userRepository.findByUsername("admin").isEmpty()){
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .build();

                userRepository.save(user);
                log.warn("admin user has been created with default password: admin");
            }
        };
    }
}
