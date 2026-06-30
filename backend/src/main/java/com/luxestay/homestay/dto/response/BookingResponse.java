package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingResponse {
    String id;
    String bookingCode;
    String homestayName;
    String homestayLocation;
    String homestayImage;
    Long homestayId;
    Long totalAmount;
    String status;
    String paymentStatus;
    String checkIn;
    String checkOut;
    Integer nights;
    String guests;
    String cancelNote;
}
