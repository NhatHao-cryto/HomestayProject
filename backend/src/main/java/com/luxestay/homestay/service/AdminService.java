package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.request.HostVerificationRequest;
import com.luxestay.homestay.dto.response.HostVerificationResponse;
import com.luxestay.homestay.entity.HostVerification;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.mapper.HostVerificationMapper;
import com.luxestay.homestay.repository.HostVerificationRepository;
import com.luxestay.homestay.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminService {
    HostVerificationRepository hostVerificationRepository;
    UserRepository userRepository;
    HostVerificationMapper hostVerificationMapper;

    public HostVerificationResponse submitHostVerification(HostVerificationRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        HostVerification verification = hostVerificationMapper.toEntity(request);
        verification.setUserId(user.getId());
        verification.setStatus("PENDING");
        verification.setCreatedAt(LocalDateTime.now());
        verification.setUpdatedAt(LocalDateTime.now());

        return hostVerificationMapper.toResponse(hostVerificationRepository.save(verification));
    }

    public List<HostVerificationResponse> getHostVerifications() {
        return hostVerificationRepository.findAll().stream()
                .map(hostVerificationMapper::toResponse)
                .toList();
    }

    public HostVerificationResponse reviewHostVerification(String id, String status, String rejectionReason) {
        HostVerification verification = hostVerificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Verification not found"));
        verification.setStatus(status);
        verification.setRejectionReason(rejectionReason);
        verification.setUpdatedAt(LocalDateTime.now());
        return hostVerificationMapper.toResponse(hostVerificationRepository.save(verification));
    }
}
