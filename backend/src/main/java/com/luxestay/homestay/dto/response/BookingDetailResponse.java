package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingDetailResponse {
    String id;
    String bookingCode;
    String status;
    String paymentStatus;
    String paymentMethod;

    Long homestayId;
    String homestayName;
    String homestayLocation;
    String homestayAddress;
    String homestayImage;
    List<String> amenities;

    String checkIn;
    String checkOut;
    Integer nights;
    String guests;

    Long roomPrice;
    Long serviceFee;
    Long totalAmount;

    String paidAt;
    String createdAt;
}
