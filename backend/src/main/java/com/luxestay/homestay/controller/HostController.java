package com.luxestay.homestay.controller;

import com.luxestay.homestay.dto.request.HomestayRequest;
import com.luxestay.homestay.dto.request.RoomRequest;
import com.luxestay.homestay.dto.response.ApiResponse;
import com.luxestay.homestay.dto.response.HomestayResponse;
import com.luxestay.homestay.dto.response.RoomResponse;
import com.luxestay.homestay.service.HostHomestayService;
import com.luxestay.homestay.service.HostRoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/host")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HostController {
    HostHomestayService hostHomestayService;
    HostRoomService hostRoomService;

    @PostMapping("/homestays")
    ApiResponse<HomestayResponse> createHomestay(@RequestBody HomestayRequest request) {
        return ApiResponse.<HomestayResponse>builder().result(hostHomestayService.createHomestay(request)).build();
    }

    @GetMapping("/homestays")
    ApiResponse<List<HomestayResponse>> getHomestays() {
        return ApiResponse.<List<HomestayResponse>>builder().result(hostHomestayService.getHomestays()).build();
    }

    @PutMapping("/homestays/{id}")
    ApiResponse<HomestayResponse> updateHomestay(@PathVariable String id, @RequestBody HomestayRequest request) {
        return ApiResponse.<HomestayResponse>builder().result(hostHomestayService.updateHomestay(id, request)).build();
    }

    @DeleteMapping("/homestays/{id}")
    ApiResponse<Void> deleteHomestay(@PathVariable String id) {
        hostHomestayService.deleteHomestay(id);
        return ApiResponse.<Void>builder().message("Deleted").build();
    }

    @PostMapping("/rooms")
    ApiResponse<RoomResponse> createRoom(@RequestBody RoomRequest request) {
        return ApiResponse.<RoomResponse>builder().result(hostRoomService.createRoom(request)).build();
    }

    @GetMapping("/rooms")
    ApiResponse<List<RoomResponse>> getRooms() {
        return ApiResponse.<List<RoomResponse>>builder().result(hostRoomService.getRooms()).build();
    }

    @PutMapping("/rooms/{id}")
    ApiResponse<RoomResponse> updateRoom(@PathVariable String id, @RequestBody RoomRequest request) {
        return ApiResponse.<RoomResponse>builder().result(hostRoomService.updateRoom(id, request)).build();
    }

    @DeleteMapping("/rooms/{id}")
    ApiResponse<Void> deleteRoom(@PathVariable String id) {
        hostRoomService.deleteRoom(id);
        return ApiResponse.<Void>builder().message("Deleted").build();
    }

    @PutMapping("/rooms/{id}/status")
    ApiResponse<RoomResponse> updateRoomStatus(@PathVariable String id, @RequestParam String status) {
        return ApiResponse.<RoomResponse>builder().result(hostRoomService.updateRoomStatus(id, status)).build();
    }
}
