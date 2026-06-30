package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.RoomRequest;
import com.luxestay.homestay.dto.response.RoomResponse;
import com.luxestay.homestay.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    Room toEntity(RoomRequest request);
    RoomResponse toResponse(Room room);
    void updateEntity(@MappingTarget Room room, RoomRequest request);
}
