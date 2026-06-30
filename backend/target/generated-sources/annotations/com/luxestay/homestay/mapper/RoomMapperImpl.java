package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.RoomRequest;
import com.luxestay.homestay.dto.response.RoomResponse;
import com.luxestay.homestay.entity.Room;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-30T22:12:30+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.3 (Oracle Corporation)"
)
@Component
public class RoomMapperImpl implements RoomMapper {

    @Override
    public Room toEntity(RoomRequest request) {
        if ( request == null ) {
            return null;
        }

        Room.RoomBuilder room = Room.builder();

        room.homestayId( request.getHomestayId() );
        room.roomName( request.getRoomName() );
        room.roomType( request.getRoomType() );
        room.price( request.getPrice() );
        room.capacity( request.getCapacity() );
        room.status( request.getStatus() );

        return room.build();
    }

    @Override
    public RoomResponse toResponse(Room room) {
        if ( room == null ) {
            return null;
        }

        RoomResponse.RoomResponseBuilder roomResponse = RoomResponse.builder();

        roomResponse.id( room.getId() );
        roomResponse.homestayId( room.getHomestayId() );
        roomResponse.roomName( room.getRoomName() );
        roomResponse.roomType( room.getRoomType() );
        roomResponse.price( room.getPrice() );
        roomResponse.capacity( room.getCapacity() );
        roomResponse.status( room.getStatus() );
        roomResponse.createdAt( room.getCreatedAt() );
        roomResponse.updatedAt( room.getUpdatedAt() );

        return roomResponse.build();
    }

    @Override
    public void updateEntity(Room room, RoomRequest request) {
        if ( request == null ) {
            return;
        }

        room.setHomestayId( request.getHomestayId() );
        room.setRoomName( request.getRoomName() );
        room.setRoomType( request.getRoomType() );
        room.setPrice( request.getPrice() );
        room.setCapacity( request.getCapacity() );
        room.setStatus( request.getStatus() );
    }
}
