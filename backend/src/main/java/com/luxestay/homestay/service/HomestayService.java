package com.luxestay.homestay.service;

import com.luxestay.homestay.dto.response.HomestayDetailResponse;
import com.luxestay.homestay.dto.response.HomestayResponse;
import com.luxestay.homestay.dto.response.ReviewResponse;
import com.luxestay.homestay.entity.Homestay;
import com.luxestay.homestay.entity.Review;
import com.luxestay.homestay.exception.AppException;
import com.luxestay.homestay.exception.ErrorCode;
import com.luxestay.homestay.repository.HomestayRepository;
import com.luxestay.homestay.repository.ReviewRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HomestayService {
    HomestayRepository homestayRepository;
    ReviewRepository reviewRepository;

    public List<HomestayResponse> getHomestays(String location, Long maxPrice, Double minStars) {
        return homestayRepository.search(location, maxPrice, minStars).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public HomestayDetailResponse getHomestayDetail(Long id) {
        Homestay homestay = homestayRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.HOMESTAY_NOT_FOUND));

        List<ReviewResponse> reviews = reviewRepository.findByHomestay_Id(id).stream()
                .map(this::toReviewResponse)
                .collect(Collectors.toList());

        return HomestayDetailResponse.builder()
                .id(homestay.getId())
                .name(homestay.getName())
                .location(homestay.getLocation())
                .address(homestay.getAddress())
                .price(homestay.getPrice())
                .stars(homestay.getStars())
                .reviewsCount(homestay.getReviewsCount())
                .description(homestay.getDescription())
                .descriptionExtended(homestay.getDescriptionExtended())
                .images(homestay.getImages())
                .amenities(homestay.getAmenities())
                .reviews(reviews)
                .build();
    }

    public Homestay getHomestayEntity(Long id) {
        return homestayRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.HOMESTAY_NOT_FOUND));
    }

    private HomestayResponse toResponse(Homestay homestay) {
        return HomestayResponse.builder()
                .id(homestay.getId())
                .name(homestay.getName())
                .location(homestay.getLocation())
                .stars(homestay.getStars())
                .price(homestay.getPrice())
                .image(homestay.getImage())
                .badge(homestay.getBadge())
                .amenities(homestay.getAmenities())
                .description(homestay.getDescription())
                .build();
    }

    private ReviewResponse toReviewResponse(Review review) {
        return ReviewResponse.builder()
                .name(review.getReviewerName())
                .date(review.getReviewDate())
                .text(review.getContent())
                .rating(review.getRating())
                .build();
    }
}
