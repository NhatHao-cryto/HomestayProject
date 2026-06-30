package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.request.HostVerificationUploadRequest;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminService {
    HostVerificationRepository hostVerificationRepository;
    UserRepository userRepository;
    HostVerificationMapper hostVerificationMapper;

    public HostVerificationResponse submitHostVerification(HostVerificationUploadRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication != null && authentication.isAuthenticated()
                && authentication.getAuthorities().stream().noneMatch(authority -> "ROLE_ANONYMOUS".equals(authority.getAuthority()))
                ? authentication.getName()
                : "demo-host";

        User user = userRepository.findByUsername(username)
                .orElseGet(() -> userRepository.save(User.builder()
                        .username(username)
                        .fullName(request.getFullName() != null ? request.getFullName() : "Demo Host")
                        .email(request.getEmail() != null ? request.getEmail() : "demo-host@luxestay.vn")
                        .build()));

        MultipartFile documentFile = request.getDocumentFile();
        MultipartFile businessProofFile = request.getBusinessProofFile();

        if (documentFile == null || documentFile.isEmpty()) {
            throw new IllegalArgumentException("Document file is required");
        }
        if (businessProofFile == null || businessProofFile.isEmpty()) {
            throw new IllegalArgumentException("Business proof file is required");
        }

        validateFile(documentFile);
        validateFile(businessProofFile);

        String documentPath = saveFile(documentFile);
        String businessProofPath = saveFile(businessProofFile);

        HostVerification verification = new HostVerification();
        verification.setUserId(user.getId());
        verification.setFullName(request.getFullName());
        verification.setEmail(request.getEmail());
        verification.setPhone(request.getPhone());
        verification.setDocumentUrl(documentPath);
        verification.setBusinessProofUrl(businessProofPath);
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

    private void validateFile(MultipartFile file) {
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size cannot exceed 5MB");
        }

        String contentType = file.getContentType();
        if (contentType == null || (!contentType.startsWith("image/") && !"application/pdf".equals(contentType))) {
            throw new IllegalArgumentException("Only image and PDF files are allowed");
        }
    }

    private String saveFile(MultipartFile file) {
        try {
            Path uploadDir = Paths.get("uploads", "host-verifications");
            Files.createDirectories(uploadDir);

            String extension = getExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + extension;
            Path target = uploadDir.resolve(fileName);
            Files.write(target, file.getBytes());
            return target.toString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to store uploaded file", e);
        }
    }

    private String getExtension(String originalFilename) {
        if (originalFilename == null || originalFilename.isBlank()) {
            return ".bin";
        }
        int index = originalFilename.lastIndexOf('.');
        return index >= 0 ? originalFilename.substring(index) : ".bin";
    }
}
