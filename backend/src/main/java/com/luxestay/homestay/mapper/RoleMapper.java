package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.RoleRequest;
import com.luxestay.homestay.dto.response.RoleResponse;
import com.luxestay.homestay.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);
    RoleResponse toRoleResponse(Role role);
}
