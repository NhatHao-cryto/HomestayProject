package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.response.BookingResponse;
import com.luxestay.homestay.entity.Booking;
import com.luxestay.homestay.entity.Homestay;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.repository.BookingRepository;
import com.luxestay.homestay.repository.HomestayRepository;
import com.luxestay.homestay.repository.RoomRepository;
import com.luxestay.homestay.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SystemAdminService {
    BookingRepository bookingRepository;
    BookingService bookingService;
    UserRepository userRepository;
    HomestayRepository homestayRepository;

    public List<BookingResponse> getBookings() {
        if (bookingRepository.count() == 0) {
            seedDemoBookings();
        }
        return bookingRepository.findAll().stream().map(bookingService::toResponse).toList();
    }

    public BookingResponse updateBookingStatus(String id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setBookingStatus(com.luxestay.homestay.enums.BookingStatus.valueOf(status.toUpperCase()));
        return bookingService.toResponse(bookingRepository.save(booking));
    }

    private void seedDemoBookings() {
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        Homestay homestay = homestayRepository.findAll().stream().findFirst().orElse(null);
        if (user == null || homestay == null) {
            return;
        }

        bookingRepository.saveAll(List.of(
                Booking.builder()
                        .bookingCode("LX-11111")
                        .user(user)
                        .homestay(homestay)
                        .checkIn(LocalDate.now().plusDays(2))
                        .checkOut(LocalDate.now().plusDays(4))
                        .nights(2)
                        .guestsDescription("2 Người lớn")
                        .adultCount(2)
                        .childCount(0)
                        .roomPrice(homestay.getPrice())
                        .serviceFee(0L)
                        .totalAmount(homestay.getPrice() * 2)
                        .paymentStatus(com.luxestay.homestay.enums.PaymentStatus.PENDING)
                        .bookingStatus(com.luxestay.homestay.enums.BookingStatus.PENDING)
                        .createdAt(LocalDateTime.now())
                        .build(),
                Booking.builder()
                        .bookingCode("LX-22222")
                        .user(user)
                        .homestay(homestay)
                        .checkIn(LocalDate.now().plusDays(5))
                        .checkOut(LocalDate.now().plusDays(8))
                        .nights(3)
                        .guestsDescription("2 Người lớn")
                        .adultCount(2)
                        .childCount(0)
                        .roomPrice(homestay.getPrice())
                        .serviceFee(0L)
                        .totalAmount(homestay.getPrice() * 3)
                        .paymentStatus(com.luxestay.homestay.enums.PaymentStatus.PAID)
                        .bookingStatus(com.luxestay.homestay.enums.BookingStatus.CONFIRMED)
                        .createdAt(LocalDateTime.now())
                        .build()
        ));
    }
}
