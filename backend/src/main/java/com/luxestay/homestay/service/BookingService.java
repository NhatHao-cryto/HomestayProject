package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.request.BookingCreationRequest;
import com.luxestay.homestay.dto.request.PaymentRequest;
import com.luxestay.homestay.dto.response.BookingDetailResponse;
import com.luxestay.homestay.dto.response.BookingResponse;
import com.luxestay.homestay.entity.Booking;
import com.luxestay.homestay.entity.Homestay;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.enums.BookingStatus;
import com.luxestay.homestay.enums.PaymentStatus;
import com.luxestay.homestay.exception.AppException;
import com.luxestay.homestay.exception.ErrorCode;
import com.luxestay.homestay.repository.BookingRepository;
import com.luxestay.homestay.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingService {
    static AtomicInteger BOOKING_COUNTER = new AtomicInteger(12345);
    static DateTimeFormatter DISPLAY_DATE = DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.forLanguageTag("vi"));
    static DateTimeFormatter DISPLAY_DATE_SHORT = DateTimeFormatter.ofPattern("dd 'Th'MM, yyyy", Locale.forLanguageTag("vi"));

    BookingRepository bookingRepository;
    UserRepository userRepository;
    HomestayService homestayService;

    @Transactional
    public BookingResponse createBooking(BookingCreationRequest request) {
        if (!request.getCheckOut().isAfter(request.getCheckIn())) {
            throw new AppException(ErrorCode.INVALID_BOOKING_DATE);
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Homestay homestay = homestayService.getHomestayEntity(request.getHomestayId());

        int nights = (int) ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
        long roomTotal = homestay.getPrice() * nights;
        long serviceFee = 0L;

        int adultCount = request.getAdultCount() != null ? request.getAdultCount() : 2;
        int childCount = request.getChildCount() != null ? request.getChildCount() : 0;
        String guestsDescription = request.getGuestsDescription();
        if (guestsDescription == null || guestsDescription.isBlank()) {
            guestsDescription = buildGuestsDescription(adultCount, childCount);
        }

        Booking booking = Booking.builder()
                .bookingCode(generateBookingCode())
                .user(user)
                .homestay(homestay)
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .nights(nights)
                .guestsDescription(guestsDescription)
                .adultCount(adultCount)
                .childCount(childCount)
                .roomPrice(homestay.getPrice())
                .serviceFee(serviceFee)
                .totalAmount(roomTotal + serviceFee)
                .paymentStatus(PaymentStatus.PENDING)
                .bookingStatus(BookingStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        return toResponse(bookingRepository.save(booking));
    }

    @Transactional
    public BookingDetailResponse payBooking(String bookingId, PaymentRequest request) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_FOUND));

        if (booking.getPaymentStatus() == PaymentStatus.PAID) {
            throw new AppException(ErrorCode.PAYMENT_ALREADY_COMPLETED);
        }

        booking.setPaymentMethod(request.getPaymentMethod());
        booking.setPaymentStatus(PaymentStatus.PAID);
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        booking.setPaidAt(LocalDateTime.now());

        return toDetailResponse(bookingRepository.save(booking));
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getUserBookings(String userId, String statusFilter) {
        if (!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        return bookingRepository.findByUser_IdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .filter(b -> matchesStatusFilter(b.getStatus(), statusFilter))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BookingDetailResponse getBookingDetail(String idOrCode) {
        Booking booking = bookingRepository.findByBookingCode(idOrCode)
                .or(() -> bookingRepository.findById(idOrCode))
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_NOT_FOUND));
        return toDetailResponse(booking);
    }

    private boolean matchesStatusFilter(String displayStatus, String filter) {
        if (filter == null || filter.isBlank() || "Tất cả".equals(filter)) {
            return true;
        }
        return filter.equals(displayStatus);
    }

    private String generateBookingCode() {
        return "LX-" + BOOKING_COUNTER.getAndIncrement();
    }

    private String buildGuestsDescription(int adults, int children) {
        StringBuilder sb = new StringBuilder(adults + " Người lớn");
        if (children > 0) {
            sb.append(", ").append(children).append(" Trẻ em");
        }
        return sb.toString();
    }

    private String resolveDisplayStatus(Booking booking) {
        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            return "Đã hủy";
        }
        if (booking.getPaymentStatus() != PaymentStatus.PAID) {
            return "Chờ thanh toán";
        }
        LocalDate today = LocalDate.now();
        if (booking.getCheckOut().isBefore(today)) {
            return "Đã hoàn thành";
        }
        return "Sắp tới";
    }

    BookingResponse toResponse(Booking booking) {
        Homestay homestay = booking.getHomestay();
        return BookingResponse.builder()
                .id(booking.getId())
                .bookingCode(booking.getBookingCode())
                .homestayId(homestay.getId())
                .homestayName(homestay.getName())
                .homestayLocation(homestay.getLocation())
                .homestayImage(homestay.getImage())
                .totalAmount(booking.getTotalAmount())
                .status(resolveDisplayStatus(booking))
                .paymentStatus(booking.getPaymentStatus().name())
                .checkIn(formatShortDate(booking.getCheckIn()))
                .checkOut(formatShortDate(booking.getCheckOut()))
                .nights(booking.getNights())
                .guests(booking.getGuestsDescription())
                .cancelNote(booking.getBookingStatus() == BookingStatus.CANCELLED
                        ? "Đã hủy theo yêu cầu khách hàng."
                        : null)
                .build();
    }

    private BookingDetailResponse toDetailResponse(Booking booking) {
        Homestay homestay = booking.getHomestay();
        return BookingDetailResponse.builder()
                .id(booking.getId())
                .bookingCode(booking.getBookingCode())
                .status(resolveDisplayStatus(booking))
                .paymentStatus(booking.getPaymentStatus().name())
                .paymentMethod(booking.getPaymentMethod() != null
                        ? formatPaymentMethod(booking.getPaymentMethod().name())
                        : null)
                .homestayId(homestay.getId())
                .homestayName(homestay.getName())
                .homestayLocation(homestay.getLocation())
                .homestayAddress(homestay.getAddress())
                .homestayImage(homestay.getImage())
                .amenities(homestay.getAmenities())
                .checkIn(formatDate(booking.getCheckIn()))
                .checkOut(formatDate(booking.getCheckOut()))
                .nights(booking.getNights())
                .guests(booking.getGuestsDescription())
                .roomPrice(booking.getRoomPrice() * booking.getNights())
                .serviceFee(booking.getServiceFee())
                .totalAmount(booking.getTotalAmount())
                .paidAt(booking.getPaidAt() != null ? booking.getPaidAt().format(DISPLAY_DATE) : null)
                .createdAt(booking.getCreatedAt() != null ? booking.getCreatedAt().format(DISPLAY_DATE) : null)
                .build();
    }

    private String formatDate(LocalDate date) {
        return date.format(DISPLAY_DATE);
    }

    private String formatShortDate(LocalDate date) {
        return date.format(DISPLAY_DATE_SHORT);
    }

    private String formatPaymentMethod(String method) {
        return switch (method) {
            case "CREDIT_CARD" -> "Thẻ tín dụng (**** 4242)";
            case "E_WALLET" -> "Ví điện tử (MoMo, ZaloPay)";
            case "BANK_TRANSFER" -> "Chuyển khoản ngân hàng";
            case "PAY_AT_CHECKIN" -> "Thanh toán tại chỗ nghỉ";
            default -> method;
        };
    }
}
