package com.luxestay.homestay.mapper;

import com.luxestay.homestay.dto.request.HostVerificationRequest;
import com.luxestay.homestay.dto.response.HostVerificationResponse;
import com.luxestay.homestay.entity.HostVerification;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-30T22:12:30+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.3 (Oracle Corporation)"
)
@Component
public class HostVerificationMapperImpl implements HostVerificationMapper {

    @Override
    public HostVerification toEntity(HostVerificationRequest request) {
        if ( request == null ) {
            return null;
        }

        HostVerification.HostVerificationBuilder hostVerification = HostVerification.builder();

        hostVerification.fullName( request.getFullName() );
        hostVerification.email( request.getEmail() );
        hostVerification.phone( request.getPhone() );
        hostVerification.documentUrl( request.getDocumentUrl() );
        hostVerification.businessProofUrl( request.getBusinessProofUrl() );

        return hostVerification.build();
    }

    @Override
    public HostVerificationResponse toResponse(HostVerification verification) {
        if ( verification == null ) {
            return null;
        }

        HostVerificationResponse.HostVerificationResponseBuilder hostVerificationResponse = HostVerificationResponse.builder();

        hostVerificationResponse.id( verification.getId() );
        hostVerificationResponse.userId( verification.getUserId() );
        hostVerificationResponse.fullName( verification.getFullName() );
        hostVerificationResponse.email( verification.getEmail() );
        hostVerificationResponse.phone( verification.getPhone() );
        hostVerificationResponse.documentUrl( verification.getDocumentUrl() );
        hostVerificationResponse.businessProofUrl( verification.getBusinessProofUrl() );
        hostVerificationResponse.status( verification.getStatus() );
        hostVerificationResponse.rejectionReason( verification.getRejectionReason() );
        hostVerificationResponse.createdAt( verification.getCreatedAt() );
        hostVerificationResponse.updatedAt( verification.getUpdatedAt() );

        return hostVerificationResponse.build();
    }
}
