package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HostVerificationResponse {
    String id;
    String userId;
    String fullName;
    String email;
    String phone;
    String documentUrl;
    String businessProofUrl;
    String status;
    String rejectionReason;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
