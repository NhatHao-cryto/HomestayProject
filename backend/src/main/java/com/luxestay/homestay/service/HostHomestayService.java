package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.request.HomestayRequest;
import com.luxestay.homestay.dto.response.HomestayResponse;
import com.luxestay.homestay.entity.Homestay;
import com.luxestay.homestay.mapper.HomestayMapper;
import com.luxestay.homestay.repository.HomestayRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HostHomestayService {
    HomestayRepository homestayRepository;
    HomestayMapper homestayMapper;

    public HomestayResponse createHomestay(HomestayRequest request) {
        Homestay homestay = homestayMapper.toEntity(request);
        homestay.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");
        homestay.setCreatedAt(LocalDateTime.now());
        homestay.setUpdatedAt(LocalDateTime.now());
        return homestayMapper.toResponse(homestayRepository.save(homestay));
    }

    public List<HomestayResponse> getHomestays() {
        return homestayRepository.findAll().stream().map(homestayMapper::toResponse).toList();
    }

    public HomestayResponse updateHomestay(String id, HomestayRequest request) {
        Homestay homestay = homestayRepository.findById(Long.valueOf(id)).orElseThrow(() -> new RuntimeException("Homestay not found"));
        homestayMapper.updateEntity(homestay, request);
        homestay.setUpdatedAt(LocalDateTime.now());
        return homestayMapper.toResponse(homestayRepository.save(homestay));
    }

    public void deleteHomestay(String id) {
        homestayRepository.deleteById(Long.valueOf(id));
    }
}
