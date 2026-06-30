package com.luxestay.homestay.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateMyInfoRequest {
    String fullName;
    String email;
    int phone;
    LocalDate dob;
    String sex;
}
