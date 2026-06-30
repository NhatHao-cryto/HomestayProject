package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.request.RoomRequest;
import com.luxestay.homestay.dto.response.RoomResponse;
import com.luxestay.homestay.entity.Room;
import com.luxestay.homestay.mapper.RoomMapper;
import com.luxestay.homestay.repository.RoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HostRoomService {
    RoomRepository roomRepository;
    RoomMapper roomMapper;

    public RoomResponse createRoom(RoomRequest request) {
        Room room = roomMapper.toEntity(request);
        room.setStatus(request.getStatus() != null ? request.getStatus() : "AVAILABLE");
        room.setCreatedAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());
        return roomMapper.toResponse(roomRepository.save(room));
    }

    public List<RoomResponse> getRooms() {
        return roomRepository.findAll().stream().map(roomMapper::toResponse).toList();
    }

    public RoomResponse updateRoom(String id, RoomRequest request) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        roomMapper.updateEntity(room, request);
        room.setUpdatedAt(LocalDateTime.now());
        return roomMapper.toResponse(roomRepository.save(room));
    }

    public RoomResponse updateRoomStatus(String id, String status) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setStatus(status);
        room.setUpdatedAt(LocalDateTime.now());
        return roomMapper.toResponse(roomRepository.save(room));
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }
}
