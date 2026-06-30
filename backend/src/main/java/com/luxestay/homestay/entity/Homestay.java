package com.luxestay.homestay.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Homestay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String location;
    String address;

    Long price;
    Double stars;
    Integer reviewsCount;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(columnDefinition = "TEXT")
    String descriptionExtended;

    @Column(columnDefinition = "TEXT")
    String image;
    String badge;

    @ElementCollection
    @CollectionTable(name = "homestay_images", joinColumns = @JoinColumn(name = "homestay_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    @Builder.Default
    List<String> images = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "homestay_amenities", joinColumns = @JoinColumn(name = "homestay_id"))
    @Column(name = "amenity")
    @Builder.Default
    List<String> amenities = new ArrayList<>();

    String status;
    java.time.LocalDateTime createdAt;
    java.time.LocalDateTime updatedAt;
}