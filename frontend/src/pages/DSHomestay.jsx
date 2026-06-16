import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const DSHomestay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter states
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || '');
  const [priceRange, setPriceRange] = useState(10000000);
  const [selectedStars, setSelectedStars] = useState({
    '5 Sao': searchParams.get('rating') === '5 sao',
    '4 Sao': searchParams.get('rating') === '4 sao',
    '3 Sao': searchParams.get('rating') === '3 sao',
  });
  const [selectedAmenities, setSelectedAmenities] = useState({
    'Wifi miễn phí': false,
    'Bể bơi vô cực': false,
    'Sân vườn BBQ': false,
    'Dịch vụ Spa': false,
  });

  // Homestays raw data
  const rawHomestays = [
    {
      id: 1,
      name: "Villa Hoàng Hôn",
      location: "Đà Nẵng",
      stars: 5,
      price: 1250000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXTNsTkEGLwg1sTfiMQ8R0Sxvcxbj4oAPGmfxla-0pOwHUAQd-CRF0g4pZAPm5oYOuucEJUwH_s7IJEMb5-BBpKCSeh55gR5r69-xjtTt952Mh6PPWBzv7eIlGcPQl5MuzJSPi75oe3qrnlkwB857UNxrRqXgZwpzJ-T54L_Jp_TET_wCbVYyDMLcIwzgUReOovqujjNeFrTmgKNEg_NSpW3VUCKAKkF3BJYauLKnlrx3-_xy5tlfnCR7fPB5qkZFQddLq8VKXCJk",
      amenities: ["Wifi miễn phí", "Bể bơi vô cực", "Sân vườn BBQ"],
      description: "Trải nghiệm không gian sống thượng lưu giữa lòng thành phố biển với tầm nhìn bao trọn Mỹ Khê.",
      badge: "Phổ biến nhất"
    },
    {
      id: 2,
      name: "Sapa Mountain Retreat",
      location: "Sapa",
      stars: 4,
      price: 2100000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq9DkUkmB-fqJy9EI61DjX8rlfjxZnhci_qBzYFY2Cl812JLDTch1Zp8PN2pUwbr6KB4xqRAQk5Xx1keTcpo6AOkj3Lqaxsn6lbd5cNY6DIWQjyRtY2S8d62cI3m0bQDpE4YBHeXDoXIgM93VUQFOIhOrfkUnnJkCepE9ZXo2v2139pmN0D9wUHQzIcfQSye6nD2Dp381GP-qJwVwbHCQ6t82dOIjTK0tCQL8rc8V1g3vt8XS5x1aLzf75aSWlLx33K4jZ3POIsrQ",
      amenities: ["Wifi miễn phí", "Sân vườn BBQ", "Dịch vụ Spa"],
      description: "Khu nghỉ dưỡng biệt lập với sân vườn xanh mướt và hồ bơi vô cực riêng tư dành cho gia đình."
    },
    {
      id: 3,
      name: "Căn hộ Biển Đà Nẵng",
      location: "Đà Nẵng",
      stars: 5,
      price: 1850000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlaGvU8T93jXLsf0jX9CgOfKhPKBrLXQLeAc4_nIzmpc5gF5Jzrt-kO-i0N-dWm8PQQ5eS_9dxcsV4s--_8REavynRT8J4mGRPUsbNcG6Ans2Uj4xhIurUTvRWnfxwmFeuBmSj0DzGAMwRf7ZypL7E_Sm-OZ-CiJgDpjIjmPy8ePBR4aZJy95QhCZfrarTB5Zv12gDlYLtqztUmwbBeTYcyRRBd_KuZFPQCgOKsgcfXbYDpFZC0dHEFh8UMGFUX61MrweZ8iHbHUA",
      amenities: ["Wifi miễn phí", "Bể bơi vô cực"],
      description: "Sự kết hợp hoàn hảo giữa kiến trúc cổ điển và tiện nghi hiện đại bậc nhất."
    },
    {
      id: 4,
      name: "Hội An Heritage Homestay",
      location: "Hội An",
      stars: 4,
      price: 3200000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSOvhjnpW3VFkJGYZJnXT_g_iFEQThyE7q-U5zJEOSo32vFv0n8rfeOtinziu7Oynj7z2dQu3Z2N8eCpjoEx_hV_1LXR1ybrHFRVIrTWzDwSfv9LHp_mmOlewBexDEYrZeiXiTlPl9HSJd6zprN2pYWpg0yrHMHpAJXCwBiAGqXK3NPM9n-769iGczCLhsQ3-1h7gwyNjeb1Q0P32duSBB40AF_NHIXzWTUkAGxB0T4zMAiLW4Q8ZdOtxNcX4MLMpnObV8DQuBZfA",
      amenities: ["Wifi miễn phí", "Sân vườn BBQ", "Dịch vụ Spa"],
      description: "Đón gió biển trong lành mỗi sáng thức dậy tại căn villa sang trọng nhất khu vực."
    }
  ];

  const [filteredHomestays, setFilteredHomestays] = useState(rawHomestays);

  useEffect(() => {
    // Listen to query parameters from router search
    const loc = searchParams.get('location');
    const rat = searchParams.get('rating');
    const query = searchParams.get('query');

    if (loc) setSearchLocation(loc);
    if (rat) {
      setSelectedStars(prev => ({
        ...prev,
        '5 Sao': rat.toLowerCase() === '5 sao',
        '4 Sao': rat.toLowerCase() === '4 sao',
        '3 Sao': rat.toLowerCase() === '3 sao',
      }));
    }
  }, [searchParams]);

  // Handle filter action
  const applyFilters = () => {
    let result = rawHomestays;

    // Search Location filter
    if (searchLocation) {
      result = result.filter(item => 
        item.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        item.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Price filter
    result = result.filter(item => item.price <= priceRange);

    // Stars filter
    const activeStars = Object.keys(selectedStars).filter(k => selectedStars[k]);
    if (activeStars.length > 0) {
      result = result.filter(item => {
        return activeStars.some(starStr => {
          const starVal = parseInt(starStr); // e.g. "5" from "5 Sao"
          return item.stars === starVal;
        });
      });
    }

    // Amenities filter
    const activeAmenities = Object.keys(selectedAmenities).filter(k => selectedAmenities[k]);
    if (activeAmenities.length > 0) {
      result = result.filter(item => {
        return activeAmenities.every(amenity => item.amenities.includes(amenity));
      });
    }

    setFilteredHomestays(result);
  };

  useEffect(() => {
    applyFilters();
  }, [searchLocation, priceRange, selectedStars, selectedAmenities]);

  const handleStarChange = (key) => {
    setSelectedStars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAmenityChange = (key) => {
    setSelectedAmenities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="pt-28 pb-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        {/* Breadcrumbs & Header */}
        <section className="mb-12">
          <nav className="flex items-center gap-2 text-on-surface-variant mb-4 font-label-md">
            <Link to="/" className="hover:text-primary cursor-pointer">Trang chủ</Link>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            <span className="text-primary font-bold">Homestay</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-primary">Danh sách Homestay</h1>
        </section>

        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-1/4">
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 sticky top-32">
              <h3 className="font-headline-md text-headline-md text-primary mb-6">Bộ lọc</h3>
              
              {/* Location */}
              <div className="mb-8">
                <label className="block font-label-md text-primary mb-3">Địa điểm</label>
                <div className="relative">
                  <input 
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors font-body-md" 
                    placeholder="Bạn muốn đi đâu?" 
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute right-3 top-3 text-outline">location_on</span>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block font-label-md text-primary mb-3">Khoảng giá tối đa (VNĐ)</label>
                <input 
                  className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-secondary" 
                  max="10000000" 
                  min="500000" 
                  step="100000"
                  type="range"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="flex justify-between mt-2 font-label-md text-on-surface-variant">
                  <span>500k VNĐ</span>
                  <span className="text-secondary font-bold">{priceRange.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-8">
                <label className="block font-label-md text-primary mb-3">Hạng sao</label>
                <div className="space-y-3">
                  {Object.keys(selectedStars).map(key => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" 
                        type="checkbox"
                        checked={selectedStars[key]}
                        onChange={() => handleStarChange(key)}
                      />
                      <span className="font-body-md group-hover:text-primary">{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <label className="block font-label-md text-primary mb-3">Tiện ích</label>
                <div className="space-y-3">
                  {Object.keys(selectedAmenities).map(key => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" 
                        type="checkbox"
                        checked={selectedAmenities[key]}
                        onChange={() => handleAmenityChange(key)}
                      />
                      <span className="font-body-md group-hover:text-primary">{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={applyFilters}
                className="w-full bg-primary text-white py-4 rounded-lg font-label-md hover:opacity-90 transition-all"
              >
                Áp dụng lọc
              </button>
            </div>
          </aside>

          {/* Main Content Grid */}
          <div className="w-full md:w-3/4">
            {filteredHomestays.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-outline-variant/10">
                <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">gpp_maybe</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Không tìm thấy Homestay</h3>
                <p className="text-on-surface-variant font-body-md">Vui lòng điều chỉnh lại bộ lọc để tìm kiếm kết quả phù hợp hơn.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
                {filteredHomestays.map(item => (
                  <article key={item.id} className="group bg-white rounded-xl overflow-hidden custom-shadow border border-outline-variant/10 transition-transform hover:-translate-y-2 flex flex-col h-full">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={item.image} 
                      />
                      {item.badge && (
                        <div className="absolute top-4 right-4 glass-overlay px-3 py-1 rounded-full text-white font-label-md text-sm">
                          {item.badge}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-primary/80 to-transparent">
                        <div className="flex items-center gap-1 text-secondary-fixed">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className="material-symbols-outlined text-[18px] text-yellow-500" 
                              style={{ fontVariationSettings: `"FILL" ${i < item.stars ? 1 : 0}` }}
                            >
                              star
                            </span>
                          ))}
                          <span className="text-white ml-2 font-label-md">{item.stars.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-1">{item.name}</h3>
                        <p className="text-on-surface-variant font-body-md mb-6 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-secondary font-bold text-headline-md">{(item.price).toLocaleString('vi-VN')} VNĐ</span>
                          <span className="text-on-surface-variant font-body-md"> / Đêm</span>
                        </div>
                        <Link to={`/homestays/${item.id}`} className="border-1.5 border-secondary text-secondary px-4 py-2 rounded font-label-md hover:bg-secondary hover:text-white transition-all border">
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-16 flex justify-center items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-label-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md">3</button>
              <span className="mx-1 text-outline">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md">12</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DSHomestay;
