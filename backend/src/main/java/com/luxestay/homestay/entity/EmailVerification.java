package com.luxestay.homestay.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class EmailVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String email;
    String otp;
    LocalDateTime expiredAt;

    @Lob
    private String requestJson;
}
