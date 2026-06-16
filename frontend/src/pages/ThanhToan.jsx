import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThanhToan = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();

  // Selected details from CTHomestay or fallback defaults
  const bookingDetails = routerLocation.state || {
    homestayId: "1",
    homestayName: "Villa Hoàng Hôn",
    location: "Phú Quốc, Việt Nam",
    price: 4200000,
    nights: 3,
    dateRange: "15/12 - 18/12",
    guests: "2 người lớn",
    totalAmount: 14355000
  };

  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to confirmation page
    navigate('/xac-nhan-thanh-toan', {
      state: {
        bookingId: "LX-12345",
        homestayName: bookingDetails.homestayName,
        dateRange: bookingDetails.dateRange,
        guests: bookingDetails.guests,
        paymentMethod: paymentMethod === 'credit_card' ? 'Thẻ tín dụng (**** 4242)' : paymentMethod === 'wallet' ? 'Ví điện tử' : paymentMethod === 'bank' ? 'Chuyển khoản' : 'Tại chỗ nghỉ',
        totalAmount: bookingDetails.totalAmount
      }
    });
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap pt-32">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Checkout Details */}
        <div className="flex-1 space-y-12">
          {/* Section Header */}
          <section>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Hoàn tất đặt phòng</h1>
            <p className="text-on-surface-variant font-body-lg text-body-lg">Vui lòng kiểm tra lại thông tin và chọn phương thức thanh toán.</p>
          </section>
          
          {/* Customer Information */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">person</span>
              <h2 className="font-headline-md text-headline-md text-primary">Thông tin khách hàng</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface-variant ml-1">Họ tên</label>
                <input className="w-full bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface cursor-not-allowed bg-gray-100 border" readonly="" type="text" value="Nguyễn Văn A" />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface-variant ml-1">Số điện thoại</label>
                <input className="w-full bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface cursor-not-allowed bg-gray-100 border" readonly="" type="text" value="090 123 4567" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block font-label-md text-label-md text-on-surface-variant ml-1">Email</label>
                <input className="w-full bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface cursor-not-allowed bg-gray-100 border" readonly="" type="email" value="example@luxestay.vn" />
              </div>
            </div>
          </section>
          
          {/* Payment Methods */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">payments</span>
              <h2 className="font-headline-md text-headline-md text-primary">Phương thức thanh toán</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* Card Option */}
              <label className={`relative flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all bg-white group ${paymentMethod === 'credit_card' ? 'border-secondary luxury-shadow' : 'border-outline-variant'}`}>
                <input 
                  checked={paymentMethod === 'credit_card'} 
                  onChange={() => setPaymentMethod('credit_card')}
                  className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" 
                  name="payment" 
                  type="radio"
                />
                <div className="ml-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">credit_card</span>
                  <span className="font-body-lg text-body-lg font-medium">Thẻ tín dụng / Ghi nợ</span>
                </div>
              </label>
              
              {/* Wallet Option */}
              <label className={`relative flex items-center p-5 rounded-xl border cursor-pointer transition-all bg-white group ${paymentMethod === 'wallet' ? 'border-secondary luxury-shadow border-2' : 'border-outline-variant'}`}>
                <input 
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" 
                  name="payment" 
                  type="radio"
                />
                <div className="ml-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">account_balance_wallet</span>
                  <span className="font-body-lg text-body-lg font-medium">Ví điện tử (MoMo, ZaloPay)</span>
                </div>
              </label>
              
              {/* Bank Transfer */}
              <label className={`relative flex items-center p-5 rounded-xl border cursor-pointer transition-all bg-white group ${paymentMethod === 'bank' ? 'border-secondary luxury-shadow border-2' : 'border-outline-variant'}`}>
                <input 
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" 
                  name="payment" 
                  type="radio"
                />
                <div className="ml-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">account_balance</span>
                  <span className="font-body-lg text-body-lg font-medium">Chuyển khoản ngân hàng</span>
                </div>
              </label>
              
              {/* Pay at Check-in */}
              <label className={`relative flex items-center p-5 rounded-xl border cursor-pointer transition-all bg-white group ${paymentMethod === 'checkin' ? 'border-secondary luxury-shadow border-2' : 'border-outline-variant'}`}>
                <input 
                  checked={paymentMethod === 'checkin'}
                  onChange={() => setPaymentMethod('checkin')}
                  className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" 
                  name="payment" 
                  type="radio"
                />
                <div className="ml-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">hotel</span>
                  <span className="font-body-lg text-body-lg font-medium">Thanh toán trực tiếp khi nhận phòng</span>
                </div>
              </label>
            </div>
          </section>
          
          {/* Policies */}
          <section className="p-6 bg-surface-container rounded-xl bg-gray-100">
            <h3 className="font-headline-md text-headline-md text-primary mb-3">Chính sách hủy phòng</h3>
            <p className="text-on-surface-variant font-body-md text-body-md">Hủy miễn phí trước ngày 10/12. Sau thời gian này, phí hủy phòng là 100% tổng tiền thanh toán.</p>
          </section>
        </div>

        {/* Right Column: Booking Summary */}
        <aside className="w-full lg:w-[420px]">
          <div className="sticky top-32 glass-panel luxury-shadow rounded-2xl overflow-hidden bg-white border">
            {/* Property Image */}
            <div className="relative h-64 overflow-hidden">
              <img 
                alt={bookingDetails.homestayName} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLvXPdPlAAWzdh7RRxralE3cWlIPr1GLBV1KgLIEUHd2hcB8GFb0RCDJdEd7W5jw19VSA-RtF9-5-liwQKJ4lWbtXGmqNKYUxxvQZI6NMtUXE3Oaa-RhmCdskLzMDx0QuKx6dZm8nTydIc-O8DWJOeiMLcA4J3mCwKs7qy8zvJ3EXCT_pwC2Bo2Jgtr2O9Bc0xcwH2puYDclS81MppIzymTVu0_dSpx4JL6dUKNpoFcyqAe3y5GLSDi1Y68" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary scale-75 text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-md text-label-md font-bold text-black">4.9</span>
              </div>
            </div>
            <div className="p-8 space-y-6">
              {/* Property Info */}
              <div>
                <h2 className="font-headline-md text-headline-md text-primary">{bookingDetails.homestayName}</h2>
                <p className="text-on-surface-variant font-body-md text-body-md flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span> {bookingDetails.location}
                </p>
              </div>
              {/* Date & Guests */}
              <div className="grid grid-cols-2 gap-4 border-y border-outline-variant/30 py-4 border-gray-200">
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Thời gian</p>
                  <p className="font-body-md text-body-md font-semibold">{bookingDetails.dateRange}</p>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Khách</p>
                  <p className="font-body-md text-body-md font-semibold">{bookingDetails.guests}</p>
                </div>
              </div>
              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-body-md text-body-md">Giá phòng ({bookingDetails.nights} đêm)</span>
                  <span className="font-body-md text-body-md">{(bookingDetails.price * bookingDetails.nights).toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-body-md text-body-md">Phí dịch vụ</span>
                  <span className="font-body-md text-body-md">0đ</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30 border-gray-200">
                  <span className="font-headline-md text-headline-md text-primary">Tổng cộng</span>
                  <span className="font-headline-md text-headline-md text-secondary text-yellow-600">{(bookingDetails.totalAmount).toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
              {/* CTA Button */}
              <button 
                onClick={handleSubmit}
                className="w-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-headline-md text-headline-md py-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-secondary/10 bg-yellow-500 text-white"
              >
                Thanh toán ngay
              </button>
              <p className="text-center text-on-surface-variant/60 font-label-md text-label-md">
                Đảm bảo bảo mật thanh toán 100%
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ThanhToan;
