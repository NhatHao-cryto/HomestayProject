import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ChiTietLS = () => {
  const { id } = useParams();

  const handleInvoiceDownload = () => {
    alert("Hóa đơn đang được tải xuống...");
  };

  const handleContactHost = () => {
    alert("Đang kết nối với chủ nhà Nguyễn Minh Quân qua hộp thư Chat...");
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12 pt-32">
      {/* Booking Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <nav className="flex items-center gap-2 text-label-md font-label-md text-outline mb-2">
            <Link className="hover:text-primary" to="/lich-su">Lịch sử đặt phòng</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface-variant">Chi tiết đặt phòng</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-primary-container">Villa Hoàng Hôn</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-full bg-yellow-100 text-yellow-800">Đã hoàn thành</span>
            <span className="text-outline font-label-md text-label-md">Mã đặt phòng: {id || "#LX-12345"}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleInvoiceDownload} className="px-6 py-2.5 bg-surface-container-lowest border border-outline-variant text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors bg-white">
            Tải hóa đơn
          </button>
          <Link to="/homestays/1" className="px-6 py-2.5 bg-primary text-white font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity bg-primary text-white flex items-center justify-center">
            Đặt lại phòng này
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Stay Information */}
        <div className="lg:col-span-8 space-y-12">
          {/* Image Gallery Preview */}
          <section>
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-sm">
              <img alt="Villa Hoàng Hôn" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh4yhn7cBrFHzdIDvaZf4n7lTxAJUuecn9j3k340bUSTsDW6uBAYooWGv5SbDkMHE9LBjuhA_HwP51jPRnUVwrL3BSLaR0tEdICrB0rt3ClTznZ4H12j7PTCoGI5FPFeZ82qdFIHkoX4CGwgK8y7bzmsXa1_FbyWhmZDY_odcs8yVEGq2dOs0Wxe4NlvkMscQmPZl2rO5fCSuOK-MrZ4TLDpI5SS-9871ak_Q27Or8j165h16khzXEfZ2UTb5-49NvnJuKBXHBtL0" />
              <div className="absolute bottom-6 right-6">
                <button className="glass-panel px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 text-primary shadow-lg bg-white/70">
                  <span className="material-symbols-outlined">grid_view</span>
                  Xem tất cả ảnh
                </button>
              </div>
            </div>
          </section>

          {/* Stay Details */}
          <section className="grid md:grid-cols-2 gap-8 py-8 border-y border-outline-variant/30">
            <div className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary">Thông tin lưu trú</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">calendar_today</span>
                  <div>
                    <p className="font-label-md text-label-md text-outline">Thời gian</p>
                    <p className="font-body-md text-body-md font-semibold">12 Th04 - 15 Th04, 2024</p>
                    <p className="text-sm text-outline-variant">3 đêm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">group</span>
                  <div>
                    <p className="font-label-md text-label-md text-outline">Khách hàng</p>
                    <p className="font-body-md text-body-md font-semibold">2 Người lớn, 1 Trẻ em</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <div>
                    <p className="font-label-md text-label-md text-outline">Địa chỉ</p>
                    <p className="font-body-md text-body-md font-semibold">Đường Bờ Biển, Phường Thắng Tam, Vũng Tàu</p>
                    <a className="text-secondary font-label-md text-label-md underline hover:text-secondary-fixed-dim transition-colors mt-1 inline-block" href="#">Xem trên bản đồ</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Information */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 bg-gray-50">
              <h3 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-4 text-gray-500">Thông tin chủ nhà</h3>
              <div className="flex items-center gap-4 mb-6">
                <img alt="Host Profile" className="w-16 h-16 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0CzyxaLrx2XJ-Lzpj-KbXVt-2FEZnkoWT0kF5vw3az8wWfZ0XFlcjeTOti4EGjcp4vBs_QmazSN_TS-fpoxOTdINlFBOE3by2ss_nj3pNj_RRm9q2bIeBPhSmA0ZElyAUwPa4W7m5pFC0e1-CkVSiFTK-KTTWW_9Jha5ta72o6t49BaeLgCg8Idb_zQhWLOYeO1CZG2YZRP41Ijz0xqYAox1liwf47ttg3cHCdvRhw2HO8Tk9Nlgi-28r9T2sQehVrvcd5iQkG6Y" />
                <div>
                  <p className="font-headline-md text-[20px] text-primary">Nguyễn Minh Quân</p>
                  <div className="flex items-center gap-1 text-secondary-fixed-dim">
                    <span className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-semibold text-on-surface">4.9 (120 đánh giá)</span>
                  </div>
                </div>
              </div>
              <button onClick={handleContactHost} className="w-full py-3 bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all border border-primary">
                <span className="material-symbols-outlined">chat</span>
                Liên hệ chủ nhà
              </button>
            </div>
          </section>

          {/* Amenities Preview */}
          <section>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Tiện ích đã sử dụng</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 border border-outline-variant/30 rounded-lg bg-white">
                <span className="material-symbols-outlined text-primary">pool</span>
                <span className="font-label-md text-label-md">Bể bơi riêng</span>
              </div>
              <div className="flex items-center gap-3 p-4 border border-outline-variant/30 rounded-lg bg-white">
                <span className="material-symbols-outlined text-primary">wifi</span>
                <span className="font-label-md text-label-md">Wifi tốc độ cao</span>
              </div>
              <div className="flex items-center gap-3 p-4 border border-outline-variant/30 rounded-lg bg-white">
                <span className="material-symbols-outlined text-primary">local_parking</span>
                <span className="font-label-md text-label-md">Chỗ đậu xe free</span>
              </div>
              <div className="flex items-center gap-3 p-4 border border-outline-variant/30 rounded-lg bg-white">
                <span className="material-symbols-outlined text-primary">kitchen</span>
                <span className="font-label-md text-label-md">Bếp đầy đủ</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-gutter">
          {/* Payment Summary */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/20 bg-white">
            <h3 className="font-headline-md text-[20px] text-primary mb-6">Chi tiết thanh toán</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-body-md text-on-surface-variant">
                <span>Giá phòng (3 đêm)</span>
                <span>15.000.000 ₫</span>
              </div>
              <div className="flex justify-between items-center text-body-md text-on-surface-variant">
                <span>Phí dịch vụ Luxestay</span>
                <span>1.200.000 ₫</span>
              </div>
              <div className="flex justify-between items-center text-body-md text-tertiary text-red-600">
                <span>Giảm giá thành viên</span>
                <span>-500.000 ₫</span>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                <span className="font-headline-md text-[20px] text-primary">Tổng cộng</span>
                <span className="font-headline-md text-[20px] text-secondary text-yellow-600">15.700.000 ₫</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-surface-container rounded-lg flex items-start gap-3 bg-gray-50">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <p className="text-[13px] leading-relaxed text-on-surface-variant">
                Thanh toán đã được xác nhận qua thẻ Visa (**** 4242). Luxestay đảm bảo mọi giao dịch của bạn đều được bảo mật 100%.
              </p>
            </div>
          </div>

          {/* Booking Status Timeline */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/20 bg-white">
            <h3 className="font-headline-md text-[20px] text-primary mb-8">Trạng thái đặt phòng</h3>
            <div className="relative space-y-10 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30 before:bg-gray-200">
              {/* Step 1: Booked */}
              <div className="relative flex items-center gap-6">
                <div className="relative z-10 w-6 h-6 bg-secondary flex items-center justify-center rounded-full text-white bg-yellow-600">
                  <span className="material-symbols-outlined text-[16px] text-white">check</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Đã đặt chỗ thành công</p>
                  <p className="text-xs text-outline-variant">10/04/2024, 14:20</p>
                </div>
              </div>
              {/* Step 2: Payment Confirmed */}
              <div className="relative flex items-center gap-6">
                <div className="relative z-10 w-6 h-6 bg-secondary flex items-center justify-center rounded-full text-white bg-yellow-600">
                  <span className="material-symbols-outlined text-[16px] text-white">check</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Thanh toán hoàn tất</p>
                  <p className="text-xs text-outline-variant">10/04/2024, 14:25</p>
                </div>
              </div>
              {/* Step 3: Checked-in */}
              <div className="relative flex items-center gap-6">
                <div className="relative z-10 w-6 h-6 bg-secondary flex items-center justify-center rounded-full text-white bg-yellow-600">
                  <span className="material-symbols-outlined text-[16px] text-white">check</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Đã nhận phòng</p>
                  <p className="text-xs text-outline-variant">12/04/2024, 14:00</p>
                </div>
              </div>
              {/* Step 4: Completed */}
              <div className="relative flex items-center gap-6">
                <div className="relative z-10 w-6 h-6 bg-secondary flex items-center justify-center rounded-full text-white bg-yellow-600">
                  <span className="material-symbols-outlined text-[16px] text-white">check</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Chuyến đi kết thúc</p>
                  <p className="text-xs text-outline-variant">15/04/2024, 11:30</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ChiTietLS;
