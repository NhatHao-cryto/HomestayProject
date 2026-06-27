package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.request.UserCreationRequest;
import com.luxestay.homestay.dto.request.UserUpdateRequest;
import com.luxestay.homestay.dto.response.UserResponse;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.enums.Role;
import com.luxestay.homestay.exception.AppException;
import com.luxestay.homestay.exception.ErrorCode;
import com.luxestay.homestay.mapper.UserMapper;
import com.luxestay.homestay.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
   UserRepository userRepository;
   UserMapper userMapper;
   PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request){

        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<String> roles = new HashSet<>();
        roles.add(Role.USER.name());
        user.setRoles(roles);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public UserResponse getUser(String id){
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found")));
    }

    public UserResponse updateUser(String userId, UserUpdateRequest request){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        userMapper.updateUser(user, request);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId){
        userRepository.deleteById(userId);
    }
}
