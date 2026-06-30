package com.luxestay.homestay.repository;

import com.luxestay.homestay.entity.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomestayRepository extends JpaRepository<Homestay, String> {
}
