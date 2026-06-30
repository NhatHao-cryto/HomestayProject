package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.HomestayRequest;
import com.luxestay.homestay.dto.response.HomestayResponse;
import com.luxestay.homestay.entity.Homestay;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-30T22:12:30+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.3 (Oracle Corporation)"
)
@Component
public class HomestayMapperImpl implements HomestayMapper {

    @Override
    public Homestay toEntity(HomestayRequest request) {
        if ( request == null ) {
            return null;
        }

        Homestay.HomestayBuilder homestay = Homestay.builder();

        homestay.name( request.getName() );
        homestay.address( request.getAddress() );
        homestay.description( request.getDescription() );
        homestay.status( request.getStatus() );

        return homestay.build();
    }

    @Override
    public HomestayResponse toResponse(Homestay homestay) {
        if ( homestay == null ) {
            return null;
        }

        HomestayResponse.HomestayResponseBuilder homestayResponse = HomestayResponse.builder();

        homestayResponse.id( homestay.getId() );
        homestayResponse.name( homestay.getName() );
        homestayResponse.location( homestay.getLocation() );
        homestayResponse.stars( homestay.getStars() );
        homestayResponse.price( homestay.getPrice() );
        homestayResponse.image( homestay.getImage() );
        homestayResponse.badge( homestay.getBadge() );
        List<String> list = homestay.getAmenities();
        if ( list != null ) {
            homestayResponse.amenities( new ArrayList<String>( list ) );
        }
        homestayResponse.description( homestay.getDescription() );

        return homestayResponse.build();
    }

    @Override
    public void updateEntity(Homestay homestay, HomestayRequest request) {
        if ( request == null ) {
            return;
        }

        homestay.setName( request.getName() );
        homestay.setAddress( request.getAddress() );
        homestay.setDescription( request.getDescription() );
        homestay.setStatus( request.getStatus() );
    }
}
