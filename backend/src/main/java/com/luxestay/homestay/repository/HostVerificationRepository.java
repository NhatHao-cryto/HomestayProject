package com.luxestay.homestay.repository;

import com.luxestay.homestay.entity.HostVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostVerificationRepository extends JpaRepository<HostVerification, String> {
    List<HostVerification> findByUserId(String userId);
}
