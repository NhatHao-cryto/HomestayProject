package com.luxestay.homestay.entity;

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

    @Column(unique = true)
    String bookingCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homestay_id")
    Homestay homestay;

    LocalDate checkIn;
    LocalDate checkOut;
    Integer nights;
    String guestsDescription;
    Integer adultCount;
    Integer childCount;

    Long roomPrice;
    Long serviceFee;
    Long totalAmount;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    BookingStatus bookingStatus = BookingStatus.PENDING;

    LocalDateTime createdAt;
    LocalDateTime paidAt;
}
