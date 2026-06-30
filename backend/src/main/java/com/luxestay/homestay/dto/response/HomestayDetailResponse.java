package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HomestayDetailResponse {
    Long id;
    String name;
    String location;
    String address;
    Long price;
    Double stars;
    Integer reviewsCount;
    String description;
    String descriptionExtended;
    List<String> images;
    List<String> amenities;
    List<ReviewResponse> reviews;
}
