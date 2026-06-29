package com.luxestay.homestay.controller;

import com.luxestay.homestay.dto.request.BookingCreationRequest;
import com.luxestay.homestay.dto.request.PaymentRequest;
import com.luxestay.homestay.dto.response.ApiResponse;
import com.luxestay.homestay.dto.response.BookingDetailResponse;
import com.luxestay.homestay.dto.response.BookingResponse;
import com.luxestay.homestay.service.BookingService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {
    BookingService bookingService;

    @PostMapping
    ApiResponse<BookingResponse> createBooking(@RequestBody @Valid BookingCreationRequest request) {
        return ApiResponse.<BookingResponse>builder()
                .result(bookingService.createBooking(request))
                .build();
    }

    @PostMapping("/{id}/pay")
    ApiResponse<BookingDetailResponse> payBooking(
            @PathVariable String id,
            @RequestBody @Valid PaymentRequest request) {
        return ApiResponse.<BookingDetailResponse>builder()
                .result(bookingService.payBooking(id, request))
                .build();
    }

    @GetMapping
    ApiResponse<List<BookingResponse>> getUserBookings(
            @RequestParam String userId,
            @RequestParam(required = false) String status) {
        return ApiResponse.<List<BookingResponse>>builder()
                .result(bookingService.getUserBookings(userId, status))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<BookingDetailResponse> getBookingDetail(@PathVariable String id) {
        return ApiResponse.<BookingDetailResponse>builder()
                .result(bookingService.getBookingDetail(id))
                .build();
    }
}
