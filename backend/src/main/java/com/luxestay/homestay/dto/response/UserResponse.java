package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    int phone;
    String email;
    String fullName;
    LocalDate dob;
    String sex;
    Set<RoleResponse> roles;
}
