package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingResponse {
    String id;
    String customerName;
    String customerEmail;
    String homestayName;
    String roomName;
    LocalDate checkInDate;
    LocalDate checkOutDate;
    BigDecimal totalPrice;
    String status;
    LocalDateTime createdAt;
}
