package com.luxestay.homestay.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String password;
    int phone;
    String email;
    String fullName;
    LocalDate dob;
    String sex;
    List<String> roles;
}
