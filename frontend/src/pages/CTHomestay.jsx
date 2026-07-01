import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CTHomestay = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Selected date & guest states
  const [dateRange, setDateRange] = useState('15/11/2023 - 17/11/2023');
  const [guests, setGuests] = useState('2 Người lớn, 1 Trẻ em');
  const [savedReviews, setSavedReviews] = useState([]);

  // Homestays data for detail display
  const homestayDetails = {
    "1": {
      name: "Villa Hoàng Hôn",
      location: "Bán đảo Sơn Trà, Đà Nẵng",
      price: 1250000,
      stars: 5.0,
      reviewsCount: 120,
      description: "Chào mừng bạn đến với Villa Hoàng Hôn, một kiệt tác kiến trúc tọa lạc tại vị trí đắc địa nhất của Bán đảo Sơn Trà. Nơi đây không chỉ là một chỗ nghỉ, mà là một trải nghiệm sống xa hoa, nơi biển trời hòa quyện trong từng khoảnh khắc.",
      descriptionExtended: "Với hồ bơi vô cực riêng hướng thẳng ra vịnh Đà Nẵng, bạn có thể thưởng ngoạn những buổi hoàng hôn rực rỡ nhất trong không gian hoàn toàn riêng tư. Nội thất được thiết kế theo phong cách hiện đại tối giản với các vật liệu cao cấp, mang lại cảm giác tĩnh lặng và thượng lưu.",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATlA4S3qFef10VNDQGBMsXkBvvmKUpnlRue6j5GpksdPYQxtamnJgeHgmoZxNDPtl31sW8YzeXaNkGURaphfaEpF7W0foggPu7fmNLpHOKXFdw_LhWDr6eqBM4rU6fIb4QU_PM-_O0CWk7hztfTpvUoLTpXBStjmUyirvL1hQHca9T8lsK0zomOZU-mHrgMn60DQflV-iyESqSm4PUfDi8ING-zFhzNloa2c3ZH2fugJyDZb7khkZpea1cFKzRDayIFaXl9cJenDU",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9szZzqJVTqpjOxXwh02RYGjgmnhUjx8o8yS-cNdxhmWMO9j3GEoHXsG4DJaGGOqrSLZHfzTzB6MjZOu5JgX7MUvQ62K_3V5I5Ju1CKZkIVoVDSI9a6aj-OaInflPA_fDiuVjirOBr293p2WOZA3M-WYzpJkDuEdUO9hXanZzI4taALBWCmiDSokHTaAh5ir861Zz13k_OQuVnQ3UsEIqFv5WzInzI0T79j0NOsb7TCQL1E_E8wweDfWvdeH6w_hpxGpyTHU9TAuE",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuByVyxtCT7SYjTXNdxTD1dgc-K4Hv4zetxKhPwogn_Ho4rTTCy6VZ40x4wxPkN4-xlB0in1AlhIbVQYLI_Vv5DFjPcIf4Jkhg3dSiDP5VlcoTHRv3ZLGpx51mRiiSXUCN5N1nfcCV0b8aY4oj4jE2tWzUyWq4nkbDzysY5UqF-MTFX-CshskR1e2wMih6bfgeuPtIShqdaeTItumETWkmt0qgu2nWeg2HQYnKYqXmliTzAWtBiXX9S3CT-2YjgKMBEW7gSsVqqKH5o",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtssApPoM-gbZJmyPAHLkM33_1bz2qYd8jVhwBxl9BinLtOMyIAv39cKA6J68u2JTL7YEOTtf_Bkn8bGC0PZs6nOyna5N2GMNLuymfnaC-OBWMbElu7OCPVTV-KVcWo6RYxACxthIanHX2Dc3KEMdKASRmHxRH6SzGuXeYTsiVSJTXlaWk2ywwozKgU9PHsUQuzwuw7qFLh-GOhMWjYm0R806hc7IROXn8RmKqEBIuZ9S9Il4RkNkre50woSFqUzK3OsGk8MA1F2o"
      ],
      amenities: ["WiFi tốc độ cao", "Hồ bơi vô cực", "Khu vực BBQ", "Bếp đầy đủ thiết bị", "Chỗ đậu xe miễn phí", "Điều hòa nhiệt độ"],
      address: "Bán đảo Sơn Trà, Thọ Quang, Sơn Trà, Đà Nẵng. Cách trung tâm thành phố 15 phút lái xe.",
      reviews: [
        { name: "Nguyễn Hoàng", date: "Tháng 10, 2023", text: "Một trải nghiệm thực sự tuyệt vời. Tầm nhìn từ hồ bơi vô cực vào buổi chiều không thể diễn tả bằng lời. Dịch vụ của Luxestay vô cùng chuyên nghiệp." },
        { name: "Minh Trang", date: "Tháng 09, 2023", text: "Biệt thự rất sạch sẽ, đầy đủ tiện nghi. Tôi và gia đình đã có một kỳ nghỉ cuối tuần trọn vẹn tại đây. Sẽ quay lại!" }
      ]
    },
    "2": {
      name: "An Villa Hội An Premium",
      location: "Thôn Võng Nhi, Cẩm Thanh, Hội An",
      price: 1250000,
      stars: 4.8,
      reviewsCount: 85,
      description: "Tọa lạc tại vùng ngoại ô yên bình của Hội An, An Villa Hội An Premium là chốn dừng chân hoàn hảo để bạn rời xa xô bồ đô thị và cảm nhận hơi thở nhẹ nhàng của dòng sông Thu Bồn thơ mộng.",
      descriptionExtended: "Nơi đây được bao quanh bởi vườn dừa nước xanh rì và lối kiến trúc truyền thống Đông Dương hòa quyện với những tiện nghi chuẩn resort 5 sao. Hồ bơi nước ngọt lớn ngoài trời, khu Spa riêng biệt sẽ giúp bạn tái tạo năng lượng hoàn toàn.",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAGluQsVC4x6cr_atrOltye4tuvogRhuudg-t2nzdE_epJfV-T2xz1zBWo8Yxzj7E1Ki4GvTEYnq1kypWmRbv-CB0Y5MAfj9PROCqqBbO7eYhUIYPxftVxiVjty0V7iOkJaFuRp0bx7dovM3C4d8aKfVf1wW8LdGS1DRYZq5I_9lWKfW46LAqlzEe6Eq7ThUNu13lhEu9QTpfJeNTxMHYRZWTvOMHGnttB2P5mvHKnI8SuPkvJYXyB8fHuZmySnYsSvZ5XGfJtJqkE",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9szZzqJVTqpjOxXwh02RYGjgmnhUjx8o8yS-cNdxhmWMO9j3GEoHXsG4DJaGGOqrSLZHfzTzB6MjZOu5JgX7MUvQ62K_3V5I5Ju1CKZkIVoVDSI9a6aj-OaInflPA_fDiuVjirOBr293p2WOZA3M-WYzpJkDuEdUO9hXanZzI4taALBWCmiDSokHTaAh5ir861Zz13k_OQuVnQ3UsEIqFv5WzInzI0T79j0NOsb7TCQL1E_E8wweDfWvdeH6w_hpxGpyTHU9TAuE",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuByVyxtCT7SYjTXNdxTD1dgc-K4Hv4zetxKhPwogn_Ho4rTTCy6VZ40x4wxPkN4-xlB0in1AlhIbVQYLI_Vv5DFjPcIf4Jkhg3dSiDP5VlcoTHRv3ZLGpx51mRiiSXUCN5N1nfcCV0b8aY4oj4jE2tWzUyWq4nkbDzysY5UqF-MTFX-CshskR1e2wMih6bfgeuPtIShqdaeTItumETWkmt0qgu2nWeg2HQYnKYqXmliTzAWtBiXX9S3CT-2YjgKMBEW7gSsVqqKH5o",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtssApPoM-gbZJmyPAHLkM33_1bz2qYd8jVhwBxl9BinLtOMyIAv39cKA6J68u2JTL7YEOTtf_Bkn8bGC0PZs6nOyna5N2GMNLuymfnaC-OBWMbElu7OCPVTV-KVcWo6RYxACxthIanHX2Dc3KEMdKASRmHxRH6SzGuXeYTsiVSJTXlaWk2ywwozKgU9PHsUQuzwuw7qFLh-GOhMWjYm0R806hc7IROXn8RmKqEBIuZ9S9Il4RkNkre50woSFqUzK3OsGk8MA1F2o"
      ],
      amenities: ["WiFi tốc độ cao", "Hồ bơi ngoài trời", "Khu vực BBQ", "Bếp đầy đủ thiết bị", "Spa chăm sóc sức khỏe", "Điều hòa nhiệt độ"],
      address: "Thôn Võng Nhi, xã Cẩm Thanh, Thành phố Hội An, Quảng Nam. Cách Phố cổ 10 phút đi xe.",
      reviews: [
        { name: "Khánh Linh", date: "Tháng 11, 2023", text: "Địa điểm vô cùng yên bình, nhân viên phục vụ tận tình và chu đáo như người nhà. Bữa sáng đậm chất Hội An rất ngon." }
      ]
    }
  };

  // Get current active details or fallback to Villa Hoàng Hôn
  const data = homestayDetails[id] || homestayDetails["1"];
  const currentHomestayId = id || "1";

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`reviews_${currentHomestayId}`) || '[]');
      setSavedReviews(saved);
    } catch (e) {
      console.error('Không thể đọc đánh giá:', e);
      setSavedReviews([]);
    }
  }, [currentHomestayId]);

  // Đánh giá mới nhất 
  const allReviews = [...savedReviews, ...data.reviews];

  const nights = 2;
  const roomTotal = data.price * nights;
  const serviceFee = 0;
  const vat = 0; // standard setup
  const totalAmount = roomTotal + serviceFee;

  const BOOKINGS_STORAGE_KEY = 'luxestay_bookings';
  
  const handleBooking = () => {
    const now = new Date();
    const bookingId = `LX-${now.getTime().toString().slice(-6)}`;

    const newBooking = {
      id: bookingId,
      homestayId: id || "1",
      homestayName: data.name,
      location: data.location,
      address: data.address,
      image: data.images[0],
      price: data.price,
      nights,
      dateRange,
      guests,
      roomTotal,
      serviceFee,
      discount: 0,
      totalAmount,
      status: 'confirmed', // xác nhận, đơn mới tạo
      createdAt: now.toISOString(),
      timeline: [
        { key: 'booked', label: 'Đã đặt chỗ thành công', time: now.toLocaleString('vi-VN'), done: true },
        { key: 'paid', label: 'Thanh toán hoàn tất', time: now.toLocaleString('vi-VN'), done: true },
        { key: 'checkin', label: 'Đã nhận phòng', time: null, done: false },
        { key: 'completed', label: 'Chuyến đi kết thúc', time: null, done: false },
      ],
    };

    try {
      const existing = JSON.parse(localStorage.getItem(BOOKINGS_STORAGE_KEY) || '[]');
      existing.unshift(newBooking);
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error('Không thể lưu đơn đặt phòng:', e);
    }

    navigate(`/lich-su/${bookingId}`, { state: newBooking });
  };

  return (
    <main className="pt-24 pb-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant mb-6 pt-4">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to="/homestays" className="hover:text-primary">Homestay</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">{data.name}</span>
        </nav>

        {/* Image Gallery Bento Grid */}
        <section className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px] mb-12">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl">
            <img alt={data.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" src={data.images[0]} />
            <div className="absolute bottom-6 left-6 glass-card px-4 py-2 rounded-lg">
              <p className="font-label-md text-label-md text-primary">Toàn cảnh Villa</p>
            </div>
          </div>
          <div className="col-span-1 overflow-hidden rounded-xl">
            <img alt="Interior" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" src={data.images[1]} />
          </div>
          <div className="col-span-1 overflow-hidden rounded-xl">
            <img alt="Bedroom" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" src={data.images[2]} />
          </div>
          <div className="col-span-2 overflow-hidden rounded-xl relative">
            <img alt="Pool Side" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" src={data.images[3]} />
            <button className="absolute bottom-6 right-6 bg-surface px-6 py-2.5 rounded-lg font-label-md text-label-md border border-outline-variant hover:bg-surface-container-high transition-colors">
              Xem tất cả ảnh
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-label-md">Luxestay Exclusive</span>
                <div className="flex items-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <span className="font-label-md text-label-md ml-1">{data.stars.toFixed(1)}</span>
                  <span className="text-on-surface-variant ml-1 font-body-md">({data.reviewsCount + savedReviews.length} đánh giá)</span>
                </div>
              </div>
              <h1 className="font-display-lg text-display-lg text-primary mb-2">{data.name}</h1>
              <div className="flex items-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] mr-1">location_on</span>
                <span className="font-body-lg text-body-lg">{data.location}</span>
              </div>
            </div>
            
            <div className="w-full h-px bg-outline-variant/30 mb-10"></div>
            
            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Giới thiệu</h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant space-y-4 leading-relaxed">
                <p>{data.description}</p>
                <p>{data.descriptionExtended}</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Tiện nghi cao cấp</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {data.amenities.map((amenity, i) => {
                  let icon = "check_circle";
                  if (amenity.includes("WiFi")) icon = "wifi";
                  else if (amenity.includes("Hồ bơi") || amenity.includes("bơi")) icon = "pool";
                  else if (amenity.includes("BBQ")) icon = "outdoor_grill";
                  else if (amenity.includes("Bếp")) icon = "kitchen";
                  else if (amenity.includes("đậu xe")) icon = "local_parking";
                  else if (amenity.includes("hòa")) icon = "ac_unit";
                  else if (amenity.includes("Spa")) icon = "spa";
                  
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">{icon}</span>
                      </div>
                      <span className="font-body-md text-body-md">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Vị trí</h2>
              <div className="rounded-2xl overflow-hidden h-[400px] border border-outline-variant relative">
                <img alt="Map" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM5F7S3eGx0XiLrmDr1jLlyYDpk3x2ckQ4UXgzsDCQPL1YPeaQZTeZVJgI_uoHjwAqbdFAZrDD6Z1w09AoUd3WQJVzD0UZ2ACgamd7R8EzV4gLXPVEEz75-LZ7B6alERd_pWgTMyQ4ct2x8MDhtSp2Oh0fW7bVf7r42gTZS868a7F-Gn2I4QQc8Va3M3tvg_nfNdNrT54wfbwb0EVo4xZY9H7Sd_Ru0YBYjdRsh7-6zEUsToE96qGdpVXpAnf0l0MM3vXQDBuaWkI" />
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-on-primary p-3 rounded-full shadow-lg">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-6 bg-surface-container-low rounded-xl flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">info</span>
                <p className="font-body-md text-body-md text-on-surface-variant">{data.address}</p>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline-md text-headline-md text-primary">Đánh giá từ khách hàng</h2>
                <div className="flex items-center gap-2">
                  <span className="font-headline-md text-headline-md text-primary">{data.stars.toFixed(1)}</span>
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                {allReviews.map((review, i) => {
                  const rating = review.rating ?? 5;
                  return (
                    <div key={i} className="p-6 border border-outline-variant/30 rounded-2xl hover:shadow-sm transition-shadow bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold">
                            {review.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-primary">{review.name}</p>
                            <p className="text-[12px] text-on-surface-variant">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-secondary scale-75 origin-right">
                          {[...Array(5)].map((_, starIdx) => (
                            <span
                              key={starIdx}
                              className="material-symbols-outlined"
                              style={{ fontVariationSettings: `'FILL' ${starIdx < rating ? 1 : 0}` }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed italic">"{review.text}"</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Sidebar / Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-surface border border-outline-variant/50 p-8 rounded-2xl custom-shadow">
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-headline-lg text-headline-lg text-primary">{(data.price).toLocaleString('vi-VN')} VNĐ</span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ Đêm</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="border border-outline rounded-xl p-4 bg-white">
                  <label className="block text-[12px] font-bold text-on-surface-variant uppercase mb-1">Nhận - Trả phòng</label>
                  <div className="flex justify-between items-center cursor-pointer">
                    <input 
                      type="text" 
                      className="font-body-md text-body-md bg-transparent border-none p-0 focus:ring-0 w-full"
                      value={dateRange} 
                      onChange={(e) => setDateRange(e.target.value)}
                    />
                    <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                  </div>
                </div>
                <div className="border border-outline rounded-xl p-4 bg-white">
                  <label className="block text-[12px] font-bold text-on-surface-variant uppercase mb-1">Số khách</label>
                  <div className="flex justify-between items-center cursor-pointer">
                    <input 
                      type="text" 
                      className="font-body-md text-body-md bg-transparent border-none p-0 focus:ring-0 w-full"
                      value={guests} 
                      onChange={(e) => setGuests(e.target.value)}
                    />
                    <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleBooking}
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:opacity-90 transition-all active:scale-[0.98] mb-4 text-white"
              >
                Đặt ngay
              </button>
              <p className="text-center text-[12px] text-on-surface-variant">Bạn chưa bị trừ tiền ngay lúc này</p>
              <div className="mt-8 pt-8 border-t border-outline-variant/30 space-y-4">
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">{(data.price).toLocaleString('vi-VN')} VNĐ x {nights} đêm</span>
                  <span className="text-primary font-medium">{(roomTotal).toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">Phí dịch vụ</span>
                  <span className="text-primary font-medium">{(serviceFee).toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                  <span className="font-headline-md text-headline-md text-primary">Tổng cộng</span>
                  <span className="font-headline-md text-headline-md text-primary">{(totalAmount).toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-secondary font-label-md text-label-md">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span className="">Đảm bảo giá tốt nhất</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CTHomestay;
