package com.luxestay.homestay.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HomestayRequest {
    String name;
    String address;
    String city;
    String description;
    BigDecimal pricePerNight;
    String roomType;
    String status;
    String imageUrl;
}
