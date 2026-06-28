package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.request.UserCreationRequest;
import com.luxestay.homestay.dto.response.UserResponse;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.exception.AppException;
import com.luxestay.homestay.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest
public class UserServiceTests {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    private UserCreationRequest userCreationRequest;
    private UserResponse userResponse;
    private LocalDate dob;
    private User user;

    @BeforeEach
    void initData(){
        dob = LocalDate.of(2004, 7, 8);

        userCreationRequest = UserCreationRequest.builder()
                .username("Hao123")
                .password("12345678")
                .phone(123456789)
                .email("test@gmail.com")
                .fullName("Hao Le")
                .dob(dob)
                .sex("Nam")
                .build();

        userResponse = UserResponse.builder()
                .id("3245132452")
                .username("Hao123")
                .phone(123456789)
                .email("test@gmail.com")
                .fullName("Hao Le")
                .dob(dob)
                .sex("Nam")
                .build();

        user = User.builder()
                .id("3245132452")
                .username("Hao123")
                .phone(123456789)
                .email("test@gmail.com")
                .fullName("Hao Le")
                .dob(dob)
                .sex("Nam")
                .build();
    }

    @Test
    void createUser_validRequest_success(){
        //GIVEN
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.save(any())).thenReturn(user);

        //WHEN
        var response = userService.createUser(userCreationRequest);

        //THEN
        Assertions.assertThat(response.getId()).isEqualTo("3245132452");
        Assertions.assertThat(response.getUsername()).isEqualTo("Hao123");
    }

    @Test
    void createUser_userExisted_fail(){
        //GIVEN
        Mockito.when(userRepository.existsByUsername(anyString())).thenReturn(true);

        //WHEN
        var exception = assertThrows(AppException.class,
                () -> userService.createUser(userCreationRequest));

        //THEN
        Assertions.assertThat(exception.getErrorCode().getCode()).isEqualTo(1002);
    }
}
