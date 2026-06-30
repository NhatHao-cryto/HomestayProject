package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.response.BookingResponse;
import com.luxestay.homestay.entity.Booking;
import com.luxestay.homestay.mapper.BookingMapper;
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
    BookingMapper bookingMapper;

    public List<BookingResponse> getBookings() {
        if (bookingRepository.count() == 0) {
            seedDemoBookings();
        }
        return bookingRepository.findAll().stream().map(bookingMapper::toResponse).toList();
    }

    public BookingResponse updateBookingStatus(String id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingMapper.toResponse(bookingRepository.save(booking));
    }

    private void seedDemoBookings() {
        bookingRepository.saveAll(List.of(
                Booking.builder().customerName("Nguyễn Minh Anh").customerEmail("anh@example.com").homestayName("Villa Sương Mù Sapa").roomName("Deluxe").checkInDate(LocalDate.now().plusDays(2)).checkOutDate(LocalDate.now().plusDays(4)).totalPrice(new BigDecimal("11200000")).status("PENDING").createdAt(LocalDateTime.now()).build(),
                Booking.builder().customerName("Trần Thị Bích").customerEmail("bich@example.com").homestayName("Phố Cổ Boutique Hội An").roomName("Standard").checkInDate(LocalDate.now().plusDays(5)).checkOutDate(LocalDate.now().plusDays(8)).totalPrice(new BigDecimal("5850000")).status("CONFIRMED").createdAt(LocalDateTime.now()).build()
        ));
    }
}
