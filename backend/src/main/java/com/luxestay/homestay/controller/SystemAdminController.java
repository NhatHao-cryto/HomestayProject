package com.luxestay.homestay.controller;

import com.luxestay.homestay.dto.response.ApiResponse;
import com.luxestay.homestay.dto.response.BookingResponse;
import com.luxestay.homestay.service.SystemAdminService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SystemAdminController {
    SystemAdminService systemAdminService;

    @GetMapping("/bookings")
    ApiResponse<List<BookingResponse>> getBookings() {
        return ApiResponse.<List<BookingResponse>>builder().result(systemAdminService.getBookings()).build();
    }

    @PutMapping("/bookings/{id}/status")
    ApiResponse<BookingResponse> updateBookingStatus(@PathVariable String id, @RequestParam String status) {
        return ApiResponse.<BookingResponse>builder().result(systemAdminService.updateBookingStatus(id, status)).build();
    }
}
