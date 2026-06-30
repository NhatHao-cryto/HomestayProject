package com.luxestay.homestay.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class HostVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
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
