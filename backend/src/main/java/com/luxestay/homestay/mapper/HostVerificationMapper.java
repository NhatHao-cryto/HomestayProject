package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.HostVerificationRequest;
import com.luxestay.homestay.dto.response.HostVerificationResponse;
import com.luxestay.homestay.entity.HostVerification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HostVerificationMapper {
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "rejectionReason", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    HostVerification toEntity(HostVerificationRequest request);

    HostVerificationResponse toResponse(HostVerification verification);
}
