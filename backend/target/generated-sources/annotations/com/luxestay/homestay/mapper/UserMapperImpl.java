package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.UserCreationRequest;
import com.luxestay.homestay.dto.request.UserUpdateRequest;
import com.luxestay.homestay.dto.response.UserResponse;
import com.luxestay.homestay.entity.User;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-27T14:38:50+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.11 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( request.getUsername() );
        user.password( request.getPassword() );
        user.phone( request.getPhone() );
        user.email( request.getEmail() );
        user.fullName( request.getFullName() );
        user.dob( request.getDob() );
        user.sex( request.getSex() );

        return user.build();
    }

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.id( user.getId() );
        userResponse.username( user.getUsername() );
        userResponse.phone( user.getPhone() );
        userResponse.email( user.getEmail() );
        userResponse.fullName( user.getFullName() );
        userResponse.dob( user.getDob() );
        userResponse.sex( user.getSex() );
        Set<String> set = user.getRoles();
        if ( set != null ) {
            userResponse.roles( new LinkedHashSet<String>( set ) );
        }

        return userResponse.build();
    }

    @Override
    public void updateUser(User user, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        user.setPassword( request.getPassword() );
        user.setPhone( request.getPhone() );
        user.setEmail( request.getEmail() );
        user.setFullName( request.getFullName() );
        user.setDob( request.getDob() );
        user.setSex( request.getSex() );
    }
}
