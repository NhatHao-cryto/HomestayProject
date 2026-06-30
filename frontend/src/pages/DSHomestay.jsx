import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from "../js/api";

const DSHomestay = () => {

  const [searchParams] = useSearchParams();

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

  const [homestays, setHomestays] = useState([]);
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        setLoading(true);
        const response = await api.get("/homestay/homestays");
        setHomestays(response.data.result);

      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();

  }, [searchLocation, priceRange, selectedStars]);

  useEffect(() => {
    const loc = searchParams.get('location');
    const rat = searchParams.get('rating');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (loc) setSearchLocation(loc);
    if (rat) {
      setSelectedStars({
        '5 Sao': rat.toLowerCase() === '5 sao',
        '4 Sao': rat.toLowerCase() === '4 sao',
        '3 Sao': rat.toLowerCase() === '3 sao',
      });
    }
  }, [searchParams]);

  const applyFilters = () => {
    let result = homestays;
    if (searchLocation) {
      result = result.filter(item =>
        item.location?.toLowerCase().includes(searchLocation.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    result = result.filter(item => item.price <= priceRange);
    const activeStars = Object.keys(selectedStars).filter(k => selectedStars[k]);
    if (activeStars.length > 0) {
      result = result.filter(item =>
        activeStars.some(starStr => item.stars === parseInt(starStr))
      );
    }
    const activeAmenities = Object.keys(selectedAmenities).filter(k => selectedAmenities[k]);
    if (activeAmenities.length > 0) {
      result = result.filter(item =>
        activeAmenities.every(amenity => item.amenities?.includes(amenity))
      );
    }
    setFilteredHomestays(result);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyFilters();
  }, [homestays, searchLocation, priceRange, selectedStars, selectedAmenities]);

  const handleStarChange = (key) => {
    setSelectedStars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAmenityChange = (key) => {
    setSelectedAmenities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="pt-28 pb-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <section className="mb-12">
          <nav className="flex items-center gap-2 text-on-surface-variant mb-4 font-label-md">
            <Link to="/" className="hover:text-primary cursor-pointer">Trang chủ</Link>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            <span className="text-primary font-bold">Homestay</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-primary">Danh sách Homestay</h1>
        </section>

        <div className="flex flex-col md:flex-row gap-gutter">
          <aside className="w-full md:w-1/4">
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 sticky top-32">
              <h3 className="font-headline-md text-headline-md text-primary mb-6">Bộ lọc</h3>
              <div className="mb-8">
                <label className="block font-label-md text-primary mb-3">Địa điểm</label>
                <input
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors font-body-md"
                  placeholder="Bạn muốn đi đâu?"
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
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
              <div className="mb-8">
                <label className="block font-label-md text-primary mb-3">Hạng sao</label>
                <div className="space-y-3">
                  {Object.keys(selectedStars).map(key => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={selectedStars[key]} onChange={() => handleStarChange(key)} className="w-5 h-5 rounded" />
                      <span className="font-body-md group-hover:text-primary">{key}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <label className="block font-label-md text-primary mb-3">Tiện ích</label>
                <div className="space-y-3">
                  {Object.keys(selectedAmenities).map(key => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={selectedAmenities[key]} onChange={() => handleAmenityChange(key)} className="w-5 h-5 rounded" />
                      <span className="font-body-md group-hover:text-primary">{key}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button onClick={applyFilters} className="w-full bg-primary text-white py-4 rounded-lg font-label-md hover:opacity-90 transition-all">
                Áp dụng lọc
              </button>
            </div>
          </aside>

          <div className="w-full md:w-3/4">
            {loading ? (
              <p className="text-center py-20 text-on-surface-variant">Đang tải danh sách homestay...</p>
            ) : filteredHomestays.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-outline-variant/10">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Không tìm thấy Homestay</h3>
                <p className="text-on-surface-variant font-body-md">Vui lòng điều chỉnh lại bộ lọc.</p>
              </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
                  {filteredHomestays.length === 0 ? (
                      <div className="col-span-2 text-center py-10">
                        Không có homestay nào.
                      </div>
                  ) : (
                      filteredHomestays.map((item) => (
                          <article
                              key={item.id}
                              className="group bg-white rounded-xl overflow-hidden custom-shadow border border-outline-variant/10 transition-transform hover:-translate-y-2 flex flex-col h-full"
                          >
                            <div className="relative aspect-[4/5] overflow-hidden">
                              <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />

                              {item.badge && (
                                  <div className="absolute top-4 right-4 glass-overlay px-3 py-1 rounded-full text-white">
                                    {item.badge}
                                  </div>
                              )}

                              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-primary/80 to-transparent">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, index) => (
                                      <span
                                          key={index}
                                          className="material-symbols-outlined text-yellow-500"
                                          style={{
                                            fontVariationSettings: `'FILL' ${
                                                index < Math.round(item.stars ?? 0) ? 1 : 0
                                            }`,
                                          }}
                                      >
                  star
                </span>
                                  ))}

                                  <span className="text-white ml-2">
                {(item.stars ?? 0).toFixed(1)}
              </span>

                                  <span className="text-white/80">
                ({item.reviewsCount ?? 0} đánh giá)
              </span>
                                </div>
                              </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow justify-between">

                              <div>
                                <h3 className="text-xl font-bold text-primary">
                                  {item.name}
                                </h3>

                                <p className="text-gray-500 mt-2">
                                  📍 {item.location}
                                </p>

                                <p className="text-gray-500">
                                  {item.address}
                                </p>

                                <p className="mt-3 line-clamp-2">
                                  {item.description}
                                </p>
                              </div>

                              <div className="mt-5 flex justify-between items-center">

                                <div>
              <span className="text-secondary font-bold text-xl">
                {(item.price ?? 0).toLocaleString("vi-VN")} VNĐ
              </span>

                                  <span className="text-gray-500">
                {" "} / đêm
              </span>
                                </div>

                                <Link
                                    to={`/homestays/${item.id}`}
                                    className="border border-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white"
                                >
                                  Xem chi tiết
                                </Link>

                              </div>

                            </div>
                          </article>
                      ))
                  )}
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DSHomestay;
