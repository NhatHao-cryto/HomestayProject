package com.luxestay.homestay.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingCreationRequest {
    @NotBlank
    String userId;

    @NotNull
    Long homestayId;

    @NotNull
    LocalDate checkIn;

    @NotNull
    LocalDate checkOut;

    @NotNull
    Integer adultCount;

    Integer childCount;

    String guestsDescription;
}
