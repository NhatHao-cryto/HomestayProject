import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi, getStoredUser } from '../api/client';

const LSDatPhong = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tất cả');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getStoredUser();
    if (!user?.id) {
      navigate('/dang-nhap');
      return;
    }

    setLoading(true);
    bookingApi.list(user.id, filter === 'Tất cả' ? null : filter)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter, navigate]);

  return (
    <main className="pt-40 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="mb-12">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">Lịch sử đặt phòng</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Xem lại những hành trình tuyệt vời bạn đã trải nghiệm cùng Luxestay.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10 border-b border-outline-variant/30 pb-2">
        {['Tất cả', 'Sắp tới', 'Đã hoàn thành', 'Đã hủy'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 font-label-md border-b-2 transition-all ${
              filter === tab ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-on-surface-variant py-12">Đang tải lịch sử đặt phòng...</p>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <p className="text-on-surface-variant mb-4">Bạn chưa có đặt phòng nào.</p>
          <button onClick={() => navigate('/homestays')} className="px-6 py-3 bg-primary text-white rounded-lg">Khám phá homestay</button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {bookings.map(item => {
            let badgeClass = 'bg-blue-50 text-blue-700';
            let dotClass = 'bg-blue-600';
            if (item.status === 'Đã hoàn thành') {
              badgeClass = 'bg-green-50 text-green-700';
              dotClass = 'bg-green-600';
            } else if (item.status === 'Đã hủy') {
              badgeClass = 'bg-red-50 text-red-700';
              dotClass = 'bg-red-600';
            }

            return (
              <div key={item.id} className={`bg-white luxury-shadow rounded-xl overflow-hidden flex flex-col md:flex-row border group transition-all hover:translate-y-[-4px] ${item.status === 'Đã hủy' ? 'opacity-80' : ''}`}>
                <div className={`md:w-[400px] aspect-[4/5] md:aspect-auto overflow-hidden ${item.status === 'Đã hủy' ? 'grayscale' : ''}`}>
                  <img alt={item.homestayName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.homestayImage} />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold uppercase mb-3 ${badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
                          {item.status}
                        </span>
                        <h3 className="font-headline-md text-headline-md text-primary mb-1">{item.homestayName}</h3>
                        <p className="font-body-md text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">location_on</span>
                          {item.homestayLocation}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-label-md text-on-surface-variant">Tổng thanh toán</p>
                        <p className="text-headline-md font-bold text-secondary">{item.totalAmount.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                    {item.status !== 'Đã hủy' && (
                      <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-[12px] text-on-surface-variant uppercase font-bold">Ngày nhận phòng</p>
                          <p className="font-semibold text-primary">{item.checkIn}</p>
                        </div>
                        <div>
                          <p className="text-[12px] text-on-surface-variant uppercase font-bold">Ngày trả phòng</p>
                          <p className="font-semibold text-primary">{item.checkOut}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <button onClick={() => navigate(`/lich-su/${item.bookingCode}`)} className="px-6 py-3 bg-primary text-white rounded font-label-md hover:bg-primary/90">
                      Xem chi tiết
                    </button>
                    <button onClick={() => navigate(`/homestays/${item.homestayId}`)} className="px-6 py-3 text-on-surface-variant font-label-md hover:underline">
                      Đặt lại
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default LSDatPhong;
