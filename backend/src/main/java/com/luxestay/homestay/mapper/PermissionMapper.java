package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.PermissionRequest;
import com.luxestay.homestay.dto.response.PermissionResponse;
import com.luxestay.homestay.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(Permission permission);
}
