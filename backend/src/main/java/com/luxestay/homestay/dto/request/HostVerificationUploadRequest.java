package com.luxestay.homestay.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HostVerificationUploadRequest {
    String fullName;
    String email;
    String phone;
    MultipartFile documentFile;
    MultipartFile businessProofFile;
}
