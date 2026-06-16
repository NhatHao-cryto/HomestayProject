import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HoTro = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAccordion, setActiveAccordion] = useState(0);

  const faqs = [
    {
      title: "Đặt phòng & Hủy phòng",
      icon: "calendar_month",
      content: (
        <ul className="space-y-3">
          <li className="flex gap-2">
            <span className="text-secondary">•</span>
            <span>Làm thế nào để thay đổi ngày đặt phòng sau khi đã xác nhận?</span>
          </li>
          <li className="flex gap-2">
            <span className="text-secondary">•</span>
            <span>Chính sách hoàn tiền khi hủy phòng đột xuất là gì?</span>
          </li>
          <li className="flex gap-2">
            <span className="text-secondary">•</span>
            <span>Tôi có thể yêu cầu check-in sớm hoặc check-out muộn không?</span>
          </li>
        </ul>
      )
    },
    {
      title: "Thanh toán",
      icon: "payments",
      content: "Chúng tôi chấp nhận các hình thức thanh toán bao gồm thẻ tín dụng quốc tế (Visa, Mastercard, AMEX), chuyển khoản ngân hàng và các ví điện tử phổ biến tại Việt Nam. Tất cả giao dịch đều được bảo mật tuyệt đối."
    },
    {
      title: "Chính sách",
      icon: "gavel",
      content: "Chính sách bảo mật và điều khoản sử dụng của Luxestay đảm bảo quyền lợi tốt nhất cho khách hàng, bao gồm bảo vệ thông tin cá nhân và quy trình giải quyết khiếu nại minh bạch."
    },
    {
      title: "Tài khoản",
      icon: "account_circle",
      content: "Quản lý thông tin cá nhân, xem lịch sử đặt phòng và tích lũy điểm thưởng thành viên Luxestay Premium ngay trong phần quản lý tài khoản của bạn."
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Đang tìm kiếm cho từ khóa: ${searchQuery}`);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Luxury Resort Lobby" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsY9imTjB80TxQO0EULl6tnBz08LzmHQSjeTvXtt_q3WWZxtj29VTTvkNReSSTatcnvsOCDXJzQNpeFmj0TdrTmID7np7c-qwX5Jh7-tEJp5usJ2ySnJ4Df0ZVK40omtXZKFZA1zTs6ALQh3qE3gVJ55IW7QulxR3vlybe3MxKLJ4ac600p7Gv7PwUulWXkHu6yrHgV4WedhkAzMhNpFTLZTMy1cjYdjG9mYtAHAjJWuWZaURwYosIfoF0nb840G595GUHJfFusCs" 
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-brightness-75"></div>
        </div>
        <div className="relative z-10 w-full max-w-2xl px-margin-mobile text-center">
          <h1 className="font-display-lg text-headline-lg md:text-display-lg md:font-display-lg text-white mb-8">
            Chúng tôi có thể giúp gì cho bạn?
          </h1>
          <form onSubmit={handleSearch} className="glass-effect rounded-full p-2 flex items-center shadow-lg bg-white/70">
            <span className="material-symbols-outlined text-outline ml-4">search</span>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface font-body-md placeholder:text-outline-variant outline-none" 
              placeholder="Tìm kiếm câu hỏi hoặc vấn đề của bạn..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-primary text-white px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95 text-white" type="submit">
              Tìm kiếm
            </button>
          </form>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Submit Request */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer border border-surface-container">
            <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center mb-6 text-on-secondary-container group-hover:scale-110 transition-transform bg-yellow-100 text-yellow-800">
              <span className="material-symbols-outlined text-[32px]">edit_note</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Gửi yêu cầu hỗ trợ</h3>
            <p className="text-on-surface-variant font-body-md mb-6">Mô tả vấn đề của bạn và chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
            <span className="text-secondary font-label-md flex items-center gap-2">
              Bắt đầu <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>

          {/* Live Chat */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer border border-surface-container">
            <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform bg-blue-100 text-blue-800">
              <span className="material-symbols-outlined text-[32px]">forum</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Chat trực tiếp</h3>
            <p className="text-on-surface-variant font-body-md mb-6">Kết nối ngay với chuyên viên tư vấn để được giải đáp tức thì.</p>
            <span className="text-secondary font-label-md flex items-center gap-2">
              Nhắn tin ngay <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>

          {/* Hotline */}
          <div className="bg-primary p-8 rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer text-white">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">call</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-2">Hotline: 1900 6789</h3>
            <p className="text-white/70 font-body-md mb-6">Hỗ trợ 24/7 cho các vấn đề khẩn cấp trong quá trình lưu trú.</p>
            <span className="text-secondary-fixed font-label-md flex items-center gap-2 text-yellow-300">
              Gọi ngay <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg md:text-[40px] text-primary mb-4">Câu hỏi thường gặp</h2>
          <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto">Tìm thấy câu trả lời nhanh chóng cho những thắc mắc phổ biến nhất của khách hàng Luxestay.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`accordion-item border border-surface-container rounded-xl overflow-hidden bg-white ${activeAccordion === index ? 'active' : ''}`}>
              <button 
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary">{faq.icon}</span>
                  <span className="font-headline-md text-headline-md text-primary">{faq.title}</span>
                </div>
                <span className="material-symbols-outlined arrow-icon transition-transform">expand_more</span>
              </button>
              <div className="accordion-content">
                <div className="p-6 pt-0 text-on-surface-variant font-body-md leading-relaxed border-t border-surface-container-low">
                  {faq.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden relative">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="font-headline-lg text-headline-lg md:text-[40px] text-primary">Bạn chưa tìm thấy câu trả lời?</h2>
            <p className="text-on-surface-variant font-body-lg">Khám phá Cẩm nang Luxestay để tìm hiểu thêm về các mẹo du lịch, hướng dẫn sử dụng và trải nghiệm lưu trú cao cấp.</p>
            <div className="flex flex-wrap gap-4">
              <Link className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-label-md hover:shadow-lg transition-all active:scale-95 text-white" to="/cam-nang">
                Xem Cẩm nang Luxestay
                <span className="material-symbols-outlined">open_in_new</span>
              </Link>
              <a className="inline-flex items-center gap-2 border-1.5 border-secondary text-secondary px-8 py-4 rounded-full font-label-md hover:bg-secondary/5 transition-all border border-secondary" href="#">
                Liên hệ trực tiếp
              </a>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img alt="Luxury Experience" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2G9QSWZLB_97y3Qa8YvlLf1wK_7Qm-g7rykwg-wKN9C7MBWmTGw8c4jEjn-DTJF4yeg0T8JWb4soQKz1NNSeGlHBhRDiCMb0lVT1cZVKGEH5jLrF4jNC35BwT4cOZSFlPCFlsn5mLXTMe2UtfKHk3jDcJnO_Vp39YvYr70itG9WpzIR1HFdAjT6A3UOCmpqHuUQEKb6KchaqkLplADzrN4zTfBTv8T4h2oaFcRhmieVCcUCklCf2qMJsxHD-AsMXNHwF40YMP_i4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HoTro;
