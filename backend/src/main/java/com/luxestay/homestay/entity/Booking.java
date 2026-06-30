package com.luxestay.homestay.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
import com.luxestay.homestay.enums.BookingStatus;
import com.luxestay.homestay.enums.PaymentMethod;
import com.luxestay.homestay.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String customerName;
    String customerEmail;
    String homestayName;
    String roomName;
    LocalDate checkInDate;
    LocalDate checkOutDate;
    BigDecimal totalPrice;
    String status;
    LocalDateTime createdAt;
}
