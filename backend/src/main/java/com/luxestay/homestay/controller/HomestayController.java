package com.luxestay.homestay.controller;

import com.luxestay.homestay.dto.response.ApiResponse;
import com.luxestay.homestay.dto.response.HomestayDetailResponse;
import com.luxestay.homestay.dto.response.HomestayResponse;
import com.luxestay.homestay.service.HomestayService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/homestays")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HomestayController {
    HomestayService homestayService;

    @GetMapping
    ApiResponse<List<HomestayResponse>> getHomestays(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) Double minStars) {
        return ApiResponse.<List<HomestayResponse>>builder()
                .result(homestayService.getHomestays(location, maxPrice, minStars))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<HomestayDetailResponse> getHomestayDetail(@PathVariable Long id) {
        return ApiResponse.<HomestayDetailResponse>builder()
                .result(homestayService.getHomestayDetail(id))
                .build();
    }
}
