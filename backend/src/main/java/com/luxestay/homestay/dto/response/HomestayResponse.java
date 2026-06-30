package com.luxestay.homestay.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HomestayResponse {
    Long id;
    String name;
    String location;
    Double stars;
    Long price;
    String image;
    String badge;
    List<String> amenities;
    String description;
}