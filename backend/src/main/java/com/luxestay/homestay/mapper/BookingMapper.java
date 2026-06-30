package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.response.BookingResponse;
import com.luxestay.homestay.entity.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    BookingResponse toResponse(Booking booking);
}
