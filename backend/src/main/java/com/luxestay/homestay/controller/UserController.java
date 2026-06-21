package com.luxestay.homestay.controller;

import com.luxestay.homestay.dto.request.UserCreationRequest;
import com.luxestay.homestay.dto.request.UserUpdateRequest;
import com.luxestay.homestay.dto.response.ApiResponse;
import com.luxestay.homestay.dto.response.UserResponse;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.mapper.UserMapper;
import com.luxestay.homestay.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
     UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request){
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping
    List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId){
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.getUser(userId));
        return apiResponse;
    }

    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request){
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.updateUser(userId, request));
        return apiResponse;
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
        return "User has been deleted.";
    }
}
