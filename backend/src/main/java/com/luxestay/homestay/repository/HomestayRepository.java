package com.luxestay.homestay.repository;

import com.luxestay.homestay.entity.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomestayRepository extends JpaRepository<Homestay, Long> {

    @Query("""
            SELECT h FROM Homestay h
            WHERE (:location IS NULL OR :location = '' OR LOWER(h.location) LIKE LOWER(CONCAT('%', :location, '%'))
                   OR LOWER(h.name) LIKE LOWER(CONCAT('%', :location, '%')))
            AND (:maxPrice IS NULL OR h.price <= :maxPrice)
            AND (:minStars IS NULL OR h.stars >= :minStars)
            """)
    List<Homestay> search(
            @Param("location") String location,
            @Param("maxPrice") Long maxPrice,
            @Param("minStars") Double minStars);
}
