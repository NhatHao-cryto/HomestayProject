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
public class RoomResponse {
    String id;
    String homestayId;
    String roomName;
    String roomType;
    BigDecimal price;
    Integer capacity;
    String status;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
