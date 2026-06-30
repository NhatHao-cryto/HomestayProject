package com.luxestay.homestay.config;

import com.luxestay.homestay.entity.Homestay;
import com.luxestay.homestay.entity.Review;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.repository.HomestayRepository;
import com.luxestay.homestay.repository.ReviewRepository;
import com.luxestay.homestay.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DataInitializer implements CommandLineRunner {
    HomestayRepository homestayRepository;
    ReviewRepository reviewRepository;
    UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User demo = new User();
            demo.setUsername("demo@luxestay.vn");
            demo.setPassword(new BCryptPasswordEncoder(10).encode("12345678"));
            demo.setEmail("demo@luxestay.vn");
            demo.setFullName("Nguyễn Văn A");
            demo.setPhone(901234567);
            userRepository.save(demo);
        }

        if (homestayRepository.count() > 0) {
            return;
        }

        Homestay villa = homestayRepository.save(Homestay.builder()
                .name("Villa Hoàng Hôn")
                .location("Đà Nẵng")
                .address("Bán đảo Sơn Trà, Thọ Quang, Sơn Trà, Đà Nẵng. Cách trung tâm thành phố 15 phút lái xe.")
                .price(1_250_000L)
                .stars(5.0)
                .reviewsCount(120)
                .description("Trải nghiệm không gian sống thượng lưu giữa lòng thành phố biển với tầm nhìn bao trọn Mỹ Khê.")
                .descriptionExtended("Chào mừng bạn đến với Villa Hoàng Hôn, một kiệt tác kiến trúc tọa lạc tại vị trí đắc địa nhất của Bán đảo Sơn Trà. Nơi đây không chỉ là một chỗ nghỉ, mà là một trải nghiệm sống xa hoa, nơi biển trời hòa quyện trong từng khoảnh khắc.")
                .image("https://lh3.googleusercontent.com/aida-public/AB6AXuAXTNsTkEGLwg1sTfiMQ8R0Sxvcxbj4oAPGmfxla-0pOwHUAQd-CRF0g4pZAPm5oYOuucEJUwH_s7IJEMb5-BBpKCSeh55gR5r69-xjtTt952Mh6PPWBzv7eIlGcPQl5MuzJSPi75oe3qrnlkwB857UNxrRqXgZwpzJ-T54L_Jp_TET_wCbVYyDMLcIwzgUReOovqujjNeFrTmgKNEg_NSpW3VUCKAKkF3BJYauLKnlrx3-_xy5tlfnCR7fPB5qkZFQddLq8VKXCJk")
                .badge("Phổ biến nhất")
                .images(List.of(
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuATlA4S3qFef10VNDQGBMsXkBvvmKUpnlRue6j5GpksdPYQxtamnJgeHgmoZxNDPtl31sW8YzeXaNkGURaphfaEpF7W0foggPu7fmNLpHOKXFdw_LhWDr6eqBM4rU6fIb4QU_PM-_O0CWk7hztfTpvUoLTpXBStjmUyirvL1hQHca9T8lsK0zomOZU-mHrgMn60DQflV-iyESqSm4PUfDi8ING-zFhzNloa2c3ZH2fugJyDZb7khkZpea1cFKzRDayIFaXl9cJenDU",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9szZzqJVTqpjOxXwh02RYGjgmnhUjx8o8yS-cNdxhmWMO9j3GEoHXsG4DJaGGOqrSLZHfzTzB6MjZOu5JgX7MUvQ62K_3V5I5Ju1CKZkIVoVDSI9a6aj-OaInflPA_fDiuVjirOBr293p2WOZA3M-WYzpJkDuEdUO9hXanZzI4taALBWCmiDSokHTaAh5ir861Zz13k_OQuVnQ3UsEIqFv5WzInzI0T79j0NOsb7TCQL1E_E8wweDfWvdeH6w_hpxGpyTHU9TAuE",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuByVyxtCT7SYjTXNdxTD1dgc-K4Hv4zetxKhPwogn_Ho4rTTCy6VZ40x4wxPkN4-xlB0in1AlhIbVQYLI_Vv5DFjPcIf4Jkhg3dSiDP5VlcoTHRv3ZLGpx51mRiiSXUCN5N1nfcCV0b8aY4oj4jE2tWzUyWq4nkbDzysY5UqF-MTFX-CshskR1e2wMih6bfgeuPtIShqdaeTItumETWkmt0qgu2nWeg2HQYnKYqXmliTzAWtBiXX9S3CT-2YjgKMBEW7gSsVqqKH5o",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtssApPoM-gbZJmyPAHLkM33_1bz2qYd8jVhwBxl9BinLtOMyIAv39cKA6J68u2JTL7YEOTtf_Bkn8bGC0PZs6nOyna5N2GMNLuymfnaC-OBWMbElu7OCPVTV-KVcWo6RYxACxthIanHX2Dc3KEMdKASRmHxRH6SzGuXeYTsiVSJTXlaWk2ywwozKgU9PHsUQuzwuw7qFLh-GOhMWjYm0R806hc7IROXn8RmKqEBIuZ9S9Il4RkNkre50woSFqUzK3OsGk8MA1F2o"))
                .amenities(List.of("Wifi miễn phí", "Bể bơi vô cực", "Sân vườn BBQ", "Bếp đầy đủ thiết bị", "Chỗ đậu xe miễn phí", "Điều hòa nhiệt độ"))
                .build());

        Homestay sapa = homestayRepository.save(Homestay.builder()
                .name("Sapa Mountain Retreat")
                .location("Sapa")
                .address("Mường Hoa, Sa Pa, Lào Cai")
                .price(2_100_000L)
                .stars(4.0)
                .reviewsCount(85)
                .description("Khu nghỉ dưỡng biệt lập với sân vườn xanh mướt và hồ bơi vô cực riêng tư dành cho gia đình.")
                .descriptionExtended("Tọa lạc giữa núi rừng Hoàng Liên Sơn hùng vĩ, Sapa Mountain Retreat mang đến không gian nghỉ dưỡng trong lành và riêng tư.")
                .image("https://lh3.googleusercontent.com/aida-public/AB6AXuBq9DkUkmB-fqJy9EI61DjX8rlfjxZnhci_qBzYFY2Cl812JLDTch1Zp8PN2pUwbr6KB4xqRAQk5Xx1keTcpo6AOkj3Lqaxsn6lbd5cNY6DIWQjyRtY2S8d62cI3m0bQDpE4YBHeXDoXIgM93VUQFOIhOrfkUnnJkCepE9ZXo2v2139pmN0D9wUHQzIcfQSye6nD2Dp381GP-qJwVwbHCQ6t82dOIjTK0tCQL8rc8V1g3vt8XS5x1aLzf75aSWlLx33K4jZ3POIsrQ")
                .amenities(List.of("Wifi miễn phí", "Sân vườn BBQ", "Dịch vụ Spa"))
                .build());

        Homestay danang = homestayRepository.save(Homestay.builder()
                .name("Căn hộ Biển Đà Nẵng")
                .location("Đà Nẵng")
                .address("Võ Nguyên Giáp, Đà Nẵng")
                .price(1_850_000L)
                .stars(5.0)
                .reviewsCount(64)
                .description("Sự kết hợp hoàn hảo giữa kiến trúc cổ điển và tiện nghi hiện đại bậc nhất.")
                .descriptionExtended("Căn hộ view biển trực diện với thiết kế sang trọng, phù hợp cho kỳ nghỉ cao cấp tại Đà Nẵng.")
                .image("https://lh3.googleusercontent.com/aida-public/AB6AXuBlaGvU8T93jXLsf0jX9CgOfKhPKBrLXQLeAc4_nIzmpc5gF5Jzrt-kO-i0N-dWm8PQQ5eS_9dxcsV4s--_8REavynRT8J4mGRPUsbNcG6Ans2Uj4xhIurUTvRWnfxwmFeuBmSj0DzGAMwRf7ZypL7E_Sm-OZ-CiJgDpjIjmPy8ePBR4aZJy95QhCZfrarTB5Zv12gDlYLtqztUmwbBeTYcyRRBd_KuZFPQCgOKsgcfXbYDpFZC0dHEFh8UMGFUX61MrweZ8iHbHUA")
                .amenities(List.of("Wifi miễn phí", "Bể bơi vô cực"))
                .build());

        Homestay hoian = homestayRepository.save(Homestay.builder()
                .name("Hội An Heritage Homestay")
                .location("Hội An")
                .address("Thôn Võng Nhi, xã Cẩm Thanh, Thành phố Hội An, Quảng Nam")
                .price(3_200_000L)
                .stars(4.0)
                .reviewsCount(52)
                .description("Đón gió biển trong lành mỗi sáng thức dậy tại căn villa sang trọng nhất khu vực.")
                .descriptionExtended("Tọa lạc tại vùng ngoại ô yên bình của Hội An, homestay kết hợp kiến trúc truyền thống và tiện nghi resort 5 sao.")
                .image("https://lh3.googleusercontent.com/aida-public/AB6AXuCSOvhjnpW3VFkJGYZJnXT_g_iFEQThyE7q-U5zJEOSo32vFv0n8rfeOtinziu7Oynj7z2dQu3Z2N8eCpjoEx_hV_1LXR1ybrHFRVIrTWzDwSfv9LHp_mmOlewBexDEYrZeiXiTlPl9HSJd6zprN2pYWpg0yrHMHpAJXCwBiAGqXK3NPM9n-769iGczCLhsQ3-1h7gwyNjeb1Q0P32duSBB40AF_NHIXzWTUkAGxB0T4zMAiLW4Q8ZdOtxNcX4MLMpnObV8DQuBZfA")
                .amenities(List.of("Wifi miễn phí", "Sân vườn BBQ", "Dịch vụ Spa"))
                .build());

        reviewRepository.saveAll(List.of(
                Review.builder().homestay(villa).reviewerName("Nguyễn Hoàng").reviewDate("Tháng 10, 2023")
                        .content("Một trải nghiệm thực sự tuyệt vời. Tầm nhìn từ hồ bơi vô cực vào buổi chiều không thể diễn tả bằng lời.")
                        .rating(5.0).build(),
                Review.builder().homestay(villa).reviewerName("Minh Trang").reviewDate("Tháng 09, 2023")
                        .content("Biệt thự rất sạch sẽ, đầy đủ tiện nghi. Tôi và gia đình đã có một kỳ nghỉ cuối tuần trọn vẹn tại đây.")
                        .rating(5.0).build(),
                Review.builder().homestay(hoian).reviewerName("Khánh Linh").reviewDate("Tháng 11, 2023")
                        .content("Địa điểm vô cùng yên bình, nhân viên phục vụ tận tình và chu đáo như người nhà.")
                        .rating(4.8).build()
        ));
    }
}
