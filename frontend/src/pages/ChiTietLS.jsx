import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookingApi } from '../api/client.js';

const ChiTietLS = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingApi.detail(id)
      .then(setBooking)
      .catch(() => setBooking(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <main className="pt-32 text-center"><p>Đang tải...</p></main>;
  }

  if (!booking) {
    return (
      <main className="pt-32 text-center">
        <p className="mb-4">Không tìm thấy đơn đặt phòng.</p>
        <Link to="/lich-su" className="text-primary underline">Quay lại lịch sử</Link>
      </main>
    );
  }

  const statusClass = booking.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800'
    : booking.status === 'Sắp tới' ? 'bg-blue-100 text-blue-800'
    : booking.status === 'Đã hủy' ? 'bg-red-100 text-red-800'
    : 'bg-yellow-100 text-yellow-800';

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12 pt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <nav className="flex items-center gap-2 text-label-md text-outline mb-2">
            <Link className="hover:text-primary" to="/lich-su">Lịch sử đặt phòng</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface-variant">Chi tiết đặt phòng</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-primary">{booking.homestayName}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className={`px-3 py-1 font-label-md rounded-full ${statusClass}`}>{booking.status}</span>
            <span className="text-outline font-label-md">Mã đặt phòng: {booking.bookingCode}</span>
          </div>
        </div>
        <Link to={`/homestays/${booking.homestayId}`} className="px-6 py-2.5 bg-primary text-white font-label-md rounded-lg">
          Đặt lại phòng này
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-12">
          <section>
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-sm">
              <img alt={booking.homestayName} className="w-full h-full object-cover" src={booking.homestayImage} />
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8 py-8 border-y border-outline-variant/30">
            <div className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary">Thông tin lưu trú</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">calendar_today</span>
                  <div>
                    <p className="font-label-md text-outline">Thời gian</p>
                    <p className="font-body-md font-semibold">{booking.checkIn} - {booking.checkOut}</p>
                    <p className="text-sm text-outline-variant">{booking.nights} đêm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">group</span>
                  <div>
                    <p className="font-label-md text-outline">Khách hàng</p>
                    <p className="font-body-md font-semibold">{booking.guests}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <div>
                    <p className="font-label-md text-outline">Địa chỉ</p>
                    <p className="font-body-md font-semibold">{booking.homestayAddress || booking.homestayLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {booking.amenities?.length > 0 && (
            <section>
              <h2 className="font-headline-md text-headline-md text-primary mb-6">Tiện ích</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {booking.amenities.slice(0, 4).map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 border rounded-lg bg-white">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="font-label-md">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-gutter">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="font-headline-md text-[20px] text-primary mb-6">Chi tiết thanh toán</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>Giá phòng ({booking.nights} đêm)</span>
                <span>{booking.roomPrice?.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>Phí dịch vụ</span>
                <span>{booking.serviceFee?.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-headline-md text-primary">Tổng cộng</span>
                <span className="font-headline-md text-yellow-600">{booking.totalAmount?.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>
            {booking.paymentStatus === 'PAID' && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <p className="text-[13px] text-on-surface-variant">
                  Thanh toán đã được xác nhận qua {booking.paymentMethod || 'phương thức đã chọn'}.
                  {booking.paidAt && ` Ngày thanh toán: ${booking.paidAt}.`}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="font-headline-md text-[20px] text-primary mb-8">Trạng thái đặt phòng</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <p className="font-label-md text-primary">Đã đặt chỗ</p>
                  <p className="text-xs text-outline-variant">{booking.createdAt}</p>
                </div>
              </div>
              {booking.paymentStatus === 'PAID' && (
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div>
                    <p className="font-label-md text-primary">Thanh toán hoàn tất</p>
                    <p className="text-xs text-outline-variant">{booking.paidAt}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ChiTietLS;
