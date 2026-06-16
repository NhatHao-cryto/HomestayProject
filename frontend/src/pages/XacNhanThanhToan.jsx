import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const XacNhanThanhToan = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();

  // Selected booking details from payment submission or default values
  const details = routerLocation.state || {
    bookingId: "LX-12345",
    homestayName: "Villa Hoàng Hôn",
    dateRange: "15/12/2024 - 18/12/2024 (3 đêm)",
    guests: "2 người lớn",
    paymentMethod: "Thẻ tín dụng (**** 4242)",
    totalAmount: 14355000
  };

  return (
    <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mb-6 shadow-sm bg-blue-50 text-blue-900">
          <span className="material-symbols-outlined text-on-primary-container text-[40px] text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-2">Thanh toán thành công!</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Mã đơn hàng: <span className="font-bold text-primary">{details.bookingId}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Booking Summary Card */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
              <img 
                alt="Villa Hoàng Hôn" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida/ADBb0uiph8rbXFCOjLrNx7RAkeE3B4liU5HOqdrSXThWOFaGnJdWvu6kmw7U7T39crMgrtRh-VogZghgBNw6zn0QdhixppuzM6pSdLzIC5TEqn7Ba_bsRydEbNfqzRBZ1W0IXwn8f-vBNwApR62ke4on9aoxRKszzus1nMMek1yRINAtfwPTXScd5L0i081Q4rOp7AWIqC-Y2oEc4iw1quU_W3hwzTyOdu-me1VXv_DF9gYFTtZMv8cVQ9DigjU" 
              />
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-headline-md text-headline-md text-primary">{details.homestayName}</h2>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-label-md rounded-full bg-yellow-100 text-yellow-800">Đã xác nhận</span>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                    <span className="font-body-md text-on-surface-variant">{details.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">group</span>
                    <span className="font-body-md text-on-surface-variant">{details.guests}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">payments</span>
                    <span className="font-body-md text-on-surface-variant">Phương thức: {details.paymentMethod}</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-end border-gray-100">
                <div>
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider text-gray-500">Tổng cộng đã thanh toán</p>
                  <p className="font-headline-lg text-headline-lg text-secondary text-yellow-600">{(details.totalAmount).toLocaleString('vi-VN')}đ</p>
                </div>
                <span className="material-symbols-outlined text-secondary text-4xl text-yellow-600" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps & Info */}
        <div className="lg:col-span-4 space-y-gutter">
          <div className="bg-primary-container p-8 rounded-xl text-on-primary-container bg-blue-900 text-white">
            <h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-white">info</span>
              Tiếp theo
            </h3>
            <p className="font-body-md mb-6 leading-relaxed opacity-90 text-white/90">
              Chúng tôi đã gửi email xác nhận kèm theo chi tiết đặt phòng và hướng dẫn nhận phòng đến địa chỉ email của bạn.
            </p>
            <div className="bg-primary/20 p-4 rounded-lg bg-blue-950">
              <p className="font-body-md text-sm italic text-white/70">
                Bạn có thể xem lại thông tin này bất cứ lúc nào trong phần "Lịch sử đặt phòng".
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/lich-su')}
              className="w-full bg-primary text-on-primary font-headline-md py-4 rounded-xl hover:opacity-90 transition-all shadow-lg text-white"
            >
              Xem lịch sử đặt phòng
            </button>
            <Link 
              to="/"
              className="w-full border-[1.5px] border-secondary text-secondary font-headline-md py-4 rounded-xl hover:bg-secondary-container/10 transition-all border text-center flex items-center justify-center border-secondary text-yellow-600"
            >
              Về trang chủ
            </Link>
          </div>
          
          <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/20 bg-gray-50 text-center">
            <p className="font-body-md text-on-surface-variant">
              Cần hỗ trợ? Gọi <span className="font-bold text-primary">1900 6789</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default XacNhanThanhToan;
