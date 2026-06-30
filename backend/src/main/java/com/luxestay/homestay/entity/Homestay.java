package com.luxestay.homestay.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Homestay {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String name;
    String address;
    String city;
    String description;
    BigDecimal pricePerNight;
    String roomType;
    String status;
    String imageUrl;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
