package com.luxestay.homestay.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HostVerificationRequest {
    String fullName;
    String email;
    String phone;
    String documentUrl;
    String businessProofUrl;
}
