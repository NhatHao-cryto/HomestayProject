package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HomestayResponse {
    String id;
    String name;
    String address;
    String city;
    String description;
    BigDecimal pricePerNight;
    String roomType;
    String status;
    String imageUrl;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
