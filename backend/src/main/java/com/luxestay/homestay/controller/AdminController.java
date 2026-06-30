package com.luxestay.homestay.controller;

import com.luxestay.homestay.dto.request.HostVerificationUploadRequest;
import com.luxestay.homestay.dto.response.ApiResponse;
import com.luxestay.homestay.dto.response.HostVerificationResponse;
import com.luxestay.homestay.service.AdminService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {
    AdminService adminService;

    // @PreAuthorize("hasAnyRole('HOST_ADMIN', 'SYSTEM_ADMIN')")
    @PostMapping(value = "/host-verification", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<HostVerificationResponse> submitHostVerification(@ModelAttribute HostVerificationUploadRequest request) {
        return ApiResponse.<HostVerificationResponse>builder().result(adminService.submitHostVerification(request)).build();
    }

    // @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    @GetMapping("/host-verifications")
    ApiResponse<List<HostVerificationResponse>> getHostVerifications() {
        return ApiResponse.<List<HostVerificationResponse>>builder().result(adminService.getHostVerifications()).build();
    }

    // @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    @PutMapping("/host-verifications/{id}")
    ApiResponse<HostVerificationResponse> reviewHostVerification(@PathVariable String id,
                                                                 @RequestParam String status,
                                                                 @RequestParam(required = false) String rejectionReason) {
        return ApiResponse.<HostVerificationResponse>builder().result(adminService.reviewHostVerification(id, status, rejectionReason)).build();
    }
}
