package com.luxestay.homestay.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomRequest {
    String homestayId;
    String roomName;
    String roomType;
    BigDecimal price;
    Integer capacity;
    String status;
}
