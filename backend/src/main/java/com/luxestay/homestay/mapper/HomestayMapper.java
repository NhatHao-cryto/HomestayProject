package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.HomestayRequest;
import com.luxestay.homestay.dto.response.HomestayResponse;
import com.luxestay.homestay.entity.Homestay;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface HomestayMapper {
    Homestay toEntity(HomestayRequest request);
    HomestayResponse toResponse(Homestay homestay);
    void updateEntity(@MappingTarget Homestay homestay, HomestayRequest request);
}
