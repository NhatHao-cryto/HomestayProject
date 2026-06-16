import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LSDatPhong = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tất cả');

  const bookings = [
    {
      id: "LX-12345",
      name: "Sapa Mountain Retreat",
      location: "Mường Hoa, Sa Pa, Lào Cai",
      price: 4500000,
      image: "https://lh3.googleusercontent.com/aida/ADBb0ujY01G_CdHUxeONz3BdbMQoXe7oGbI60wy_rwP33fBsGszsNnJNeaXKApOXSBFHHNHVsIppKqxLGQAgRYDc4beOMasHFwdzWYH6LtkFEXcHRdMsQTZe1YR5fj0ywfEz8H-Jj6tWIBi1GBuziz6xdHVIopLJm949nFrxW0zvj2Z-SPQJrETd-yteN2Ont1QjcwvpV6Lez6cANSL-AyscqMKOytOKCbAeFwiGuQyeqfmypPikUfAkgvCNNA",
      status: "Đã hoàn thành",
      checkIn: "15 Th05, 2024",
      checkOut: "18 Th05, 2024"
    },
    {
      id: "LX-12346",
      name: "Villa Hoàng Hôn",
      location: "Bãi Trường, Phú Quốc, Kiên Giang",
      price: 12800000,
      image: "https://lh3.googleusercontent.com/aida/ADBb0uiph8rbXFCOjLrNx7RAkeE3B4liU5HOqdrSXThWOFaGnJdWvu6kmw7U7T39crMgrtRh-VogZghgBNw6zn0QdhixppuzM6pSdLzIC5TEqn7Ba_bsRydEbNfqzRBZ1W0IXwn8f-vBNwApR62ke4on9aoxRKszzus1nMMek1yRINAtfwPTXScd5L0i081Q4rOp7AWIqC-Y2oEc4iw1quU_W3hwzTyOdu-me1VXv_DF9gYFTtZMv8cVQ9DigjU",
      status: "Sắp tới",
      checkIn: "20 Th06, 2024",
      checkOut: "23 Th06, 2024"
    },
    {
      id: "LX-12347",
      name: "Căn hộ Beachfront Đà Nẵng",
      location: "Võ Nguyên Giáp, Đà Nẵng",
      price: 3200000,
      image: "https://lh3.googleusercontent.com/aida/ADBb0ujC1K8lPmS_sQnIOHy_SN5GmxcWmiPf-Kw3V4fwwiWY9UhdIK7H6bXcbmR676geSVzHqAbEuPc8HkhSER767vFgmvwaaecoebuOYDFupx8WFMlpmaXHWXnBL-Uj2wN-Jcg6TQgsY40qdibwxncR3aP4cpjTX76GW4a9DPgGsXCYRusrkaDIheg1lE23BNULcj1d6xqZyszgCzE2VO-QvEag2VntsvzejkAMzQNlfYV2ctzbvcrTMwvDuQ",
      status: "Đã hủy",
      checkIn: "12 Th04, 2024",
      checkOut: "15 Th04, 2024",
      cancelNote: "Đã hủy theo yêu cầu khách hàng vào ngày 10 Th04, 2024."
    }
  ];

  const filteredBookings = filter === 'Tất cả' 
    ? bookings 
    : bookings.filter(item => item.status === filter);

  return (
    <main className="pt-40 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">Lịch sử đặt phòng</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Xem lại những hành trình tuyệt vời bạn đã trải nghiệm cùng Luxestay và lên kế hoạch cho những chuyến đi sắp tới.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10 border-b border-outline-variant/30 pb-2">
        {['Tất cả', 'Sắp tới', 'Đã hoàn thành', 'Đã hủy'].map(tab => (
          <button 
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 font-label-md text-label-md border-b-2 transition-all ${
              filter === tab 
                ? 'border-primary text-primary font-bold' 
                : 'border-transparent text-on-surface-variant hover:text-primary hover:border-outline-variant'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking Cards List */}
      <div className="flex flex-col gap-8">
        {filteredBookings.map(item => {
          let badgeClass = "";
          let dotClass = "";
          if (item.status === 'Đã hoàn thành') {
            badgeClass = "bg-green-50 text-green-700";
            dotClass = "bg-green-600";
          } else if (item.status === 'Sắp tới') {
            badgeClass = "bg-blue-50 text-blue-700";
            dotClass = "bg-blue-600";
          } else {
            badgeClass = "bg-red-50 text-red-700";
            dotClass = "bg-red-600";
          }

          return (
            <div key={item.id} className={`bg-white luxury-shadow rounded-xl overflow-hidden flex flex-col md:flex-row border border-outline-variant/10 group transition-all hover:translate-y-[-4px] ${item.status === 'Đã hủy' ? 'opacity-80' : ''}`}>
              <div className={`md:w-[400px] aspect-[4/5] md:aspect-auto overflow-hidden ${item.status === 'Đã hủy' ? 'grayscale' : ''}`}>
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} />
              </div>
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-3 ${badgeClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
                        {item.status}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-primary mb-1">{item.name}</h3>
                      <p className="font-body-md text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        {item.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-label-md text-on-surface-variant">{item.status === 'Đã hủy' ? 'Hoàn trả dự kiến' : 'Tổng thanh toán'}</p>
                      <p className={`text-headline-md font-bold ${item.status === 'Đã hủy' ? 'text-on-surface-variant/50 line-through' : 'text-secondary'}`}>
                        {item.price.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                  {item.status === 'Đã hủy' && (
                    <div className="mt-6 p-4 border border-error/20 bg-error-container/10 rounded-lg">
                      <p className="font-body-md text-error">{item.cancelNote}</p>
                    </div>
                  )}
                  {item.status !== 'Đã hủy' && (
                    <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-surface-container/50 rounded-lg bg-gray-50">
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
                  <button onClick={() => navigate(`/lich-su/${item.id}`)} className="px-6 py-3 bg-primary text-on-primary rounded font-label-md hover:bg-primary/90 transition-all text-white">
                    Xem chi tiết
                  </button>
                  {item.status === 'Đã hoàn thành' && (
                    <button className="px-6 py-3 border-[1.5px] border-secondary text-secondary rounded font-label-md hover:bg-secondary/5 transition-all border">
                      Đánh giá
                    </button>
                  )}
                  {item.status === 'Sắp tới' && (
                    <button className="px-6 py-3 border-[1.5px] border-outline text-on-surface-variant rounded font-label-md hover:bg-surface-variant/50 transition-all border border-gray-300">
                      Quản lý đặt phòng
                    </button>
                  )}
                  <button className="px-6 py-3 text-on-surface-variant font-label-md hover:underline underline-offset-4 transition-all">
                    Đặt lại
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default LSDatPhong;
