package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.response.BookingResponse;
import com.luxestay.homestay.entity.Booking;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-30T22:12:30+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.3 (Oracle Corporation)"
)
@Component
public class BookingMapperImpl implements BookingMapper {

    @Override
    public BookingResponse toResponse(Booking booking) {
        if ( booking == null ) {
            return null;
        }

        BookingResponse.BookingResponseBuilder bookingResponse = BookingResponse.builder();

        bookingResponse.id( booking.getId() );
        bookingResponse.bookingCode( booking.getBookingCode() );
        bookingResponse.totalAmount( booking.getTotalAmount() );
        if ( booking.getPaymentStatus() != null ) {
            bookingResponse.paymentStatus( booking.getPaymentStatus().name() );
        }
        if ( booking.getCheckIn() != null ) {
            bookingResponse.checkIn( DateTimeFormatter.ISO_LOCAL_DATE.format( booking.getCheckIn() ) );
        }
        if ( booking.getCheckOut() != null ) {
            bookingResponse.checkOut( DateTimeFormatter.ISO_LOCAL_DATE.format( booking.getCheckOut() ) );
        }
        bookingResponse.nights( booking.getNights() );

        return bookingResponse.build();
    }
}
