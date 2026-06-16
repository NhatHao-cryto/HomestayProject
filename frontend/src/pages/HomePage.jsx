import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Tất cả địa điểm');
  const [rating, setRating] = useState('Tất cả hạng');

  const handleSearch = () => {
    // Navigate to homestays list with search query parameters
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (location !== 'Tất cả địa điểm') params.append('location', location);
    if (rating !== 'Tất cả hạng') params.append('rating', rating);
    navigate(`/homestays?${params.toString()}`);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            className="w-full h-full object-cover" 
            alt="Cinematic view of luxury modern villa" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoa3w0Mq3-OgC4Wir_zhgxbmS-L2lhzx-pkBuyo9D5VMmMfTGqhUnO8RsXGMxpIgaw5rKatfueyki3B9EZxvQ-HJpMSuxHDojSW8LJeMd1b_0TEiE9sCCupOB995n4rKVSAR0tCxrBpvoAuDAsUIqGOGuvhCnwg4TR09wHicJ4jtm4UuTG1l9IEdGYbr7Dbg9V8hzQbsUywmKmSDliYMxKZ2t2gn9FCxqUHURg1iYDdobQ113vM8277JNdntELxBMGOx4i7k_YN4A" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-surface"></div>
        </div>
        <div className="relative z-10 w-full max-w-container-max px-margin-desktop text-center">
          <h1 className="font-display-lg text-display-lg text-white mb-8 drop-shadow-lg">
            Tinh hoa kỳ nghỉ Việt
          </h1>
          {/* Glassmorphic Search Bar */}
          <div className="glass-panel p-6 rounded-2xl luxury-shadow flex flex-wrap lg:flex-nowrap gap-4 items-end text-left max-w-5xl mx-auto" style={{ background: "rgba(0, 13, 34, 0.15)" }}>
            <div className="flex-1 min-w-[200px]">
              <label className="block font-label-md text-label-md mb-2 text-white">Tên homestay</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/60">search</span>
                <input 
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-4 font-body-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white placeholder-white/60" 
                  placeholder="Nhập tên homestay..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block font-label-md text-label-md mb-2 text-white">Địa điểm</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 font-body-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white"
                style={{ colorScheme: 'dark' }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option className="text-on-surface bg-white" value="Tất cả địa điểm">Tất cả địa điểm</option>
                <option className="text-on-surface bg-white" value="Đà Nẵng">Đà Nẵng</option>
                <option className="text-on-surface bg-white" value="Sapa">Sapa</option>
                <option className="text-on-surface bg-white" value="Hội An">Hội An</option>
                <option className="text-on-surface bg-white" value="Phú Quốc">Phú Quốc</option>
              </select>
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="block font-label-md text-label-md mb-2 text-white">Hạng sao</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 font-body-md focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-white"
                style={{ colorScheme: 'dark' }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option className="text-on-surface bg-white" value="Tất cả hạng">Tất cả hạng</option>
                <option className="text-on-surface bg-white" value="5 sao">5 sao</option>
                <option className="text-on-surface bg-white" value="4 sao">4 sao</option>
                <option className="text-on-surface bg-white" value="3 sao">3 sao</option>
              </select>
            </div>
            <button 
              onClick={handleSearch}
              className="bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-headline-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-lg min-w-[180px] text-white"
            >
              Tìm homestay
            </button>
          </div>
        </div>
      </section>

      {/* Featured Homestays */}
      <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-outline-variant/30 pb-6">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase tracking-wider">Homestay Nổi Bật</h2>
            <div className="w-20 h-1 bg-secondary mt-2"></div>
          </div>
          <div className="flex gap-6 mt-6 md:mt-0">
            <button className="font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1">Tất cả</button>
            <button onClick={() => navigate('/homestays?rating=4+sao')} className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-1">&gt; 4 sao</button>
            <button onClick={() => navigate('/homestays?rating=3+sao')} className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-1">&gt; 3 sao</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter">
          {/* Sidebar (Contact Card) */}
          <div className="lg:col-span-1">
            <div className="p-8 rounded-2xl text-on-primary-fixed sticky top-24 luxury-shadow bg-primary-fixed-dim">
              <h3 className="font-headline-md text-headline-md mb-6 text-primary">Hỗ trợ khách hàng</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                    <span className="material-symbols-outlined text-primary">person</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-on-primary-container">Tư vấn viên</p>
                    <p className="font-body-md font-semibold text-primary">Booking Homestay</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                    <span className="material-symbols-outlined text-primary">call</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-on-primary-container">Hotline</p>
                    <p className="font-body-md font-semibold text-primary">0123-456-789</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10">
                    <span className="material-symbols-outlined text-primary">mail</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-on-primary-container">Email</p>
                    <p className="font-body-md font-semibold text-primary">abc@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Main Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Card 1 */}
            <div className="group bg-white rounded-xl overflow-hidden luxury-shadow border border-outline-variant/10 hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Homestay King's Finger Đà Nẵng" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEgEUgwk9fvdaaOP7AS2U8pUaRAlt8wDiLovOXhhZrDBs7DZd_0q51xodrdkAqD8N9rKUkPxHCHovhrQOJU7_eVOBK9UW9k6L1QEIXkPfi86Mfv60LjT4UXv3IZZcpfHr50EZdXhFq-HPRpxdLIKYjwttZ0DliYYw_YiwuDtczH1ITXdSM9DLg5bjnAB73wfomQj11J1GQFlZV4Yrhdld2djHLqi4-mmqeMZFfQDdT3ck27CLPZaQuqclE9r0KS-P-drSD7wExSBA" 
                />
                <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-white font-label-md text-xs" style={{ background: "rgba(0, 13, 34, 0.15)" }}>Đà Nẵng</div>
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-headline-md text-primary mb-2 line-clamp-1">Homestay King's Finger Đà Nẵng</h3>
                <p className="font-body-md text-on-tertiary-container font-bold text-lg mb-4">850.000 VNĐ <span className="text-on-surface-variant font-normal text-sm">/ Đêm</span></p>
                <Link to="/homestays/1" className="w-full py-3 border-1.5 border-secondary text-secondary font-label-md rounded-lg hover:bg-secondary hover:text-white transition-colors flex items-center justify-center gap-2 border">
                  Xem chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group bg-white rounded-xl overflow-hidden luxury-shadow border border-outline-variant/10 hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="An Villa Hội An Premium" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGluQsVC4x6cr_atrOltye4tuvogRhuudg-t2nzdE_epJfV-T2xz1zBWo8Yxzj7E1Ki4GvTEYnq1kypWmRbv-CB0Y5MAfj9PROCqqBbO7eYhUIYPxftVxiVjty0V7iOkJaFuRp0bx7dovM3C4d8aKfVf1wW8LdGS1DRYZq5I_9lWKfW46LAqlzEe6Eq7ThUNu13lhEu9QTpfJeNTxMHYRZWTvOMHGnttB2P5mvHKnI8SuPkvJYXyB8fHuZmySnYsSvZ5XGfJtJqkE" 
                />
                <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-white font-label-md text-xs" style={{ background: "rgba(0, 13, 34, 0.15)" }}>Hội An</div>
              </div>
              <div className="p-6">
                <h3 class="font-headline-md text-headline-md text-primary mb-2 line-clamp-1">An Villa Hội An Premium</h3>
                <p className="font-body-md text-on-tertiary-container font-bold text-lg mb-4">1.250.000 VNĐ <span className="text-on-surface-variant font-normal text-sm">/ Đêm</span></p>
                <Link to="/homestays/2" className="w-full py-3 border-1.5 border-secondary text-secondary font-label-md rounded-lg hover:bg-secondary hover:text-white transition-colors flex items-center justify-center gap-2 border">
                  Xem chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-section-gap bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-fixed rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto text-center mb-16">
          <h2 className="font-display-lg text-display-lg text-white mb-4">ĐIỂM ĐẾN NỔI BẬT</h2>
          <p className="font-body-lg text-body-lg text-primary-fixed/80">Top điểm đến hấp dẫn bạn nên khám phá cho kỳ nghỉ tuyệt vời</p>
          <div className="w-32 h-1 bg-secondary mx-auto mt-6"></div>
        </div>
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Destination Item 1 */}
            <div onClick={() => navigate('/homestays?location=Sapa')} className="relative group cursor-pointer overflow-hidden rounded-2xl h-80">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sapa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoBU52-GaJfWAwybyUWc-guwkkf8xHVSw94xoq9oNQjGyMCFOv4T0xizsbTIflsgcriz4pk_Aki01syf0-oeSUf-eCBadE9_KaNjDzjOEeAophZU9gU2BcljtigblLBXpq8QVbLwH2j0XOQrW_HoBwtaOIKb2_OoRQS3_pOWJi67Cik4zuZ4SwppC8IwKfvvMXaTo3_PGGRKTYYTGzuMah_fiMZ6O_aQ0pXR8Uf8lyPaJGZhPq_SnzRLIMmwKmnKHm1rVA1fvmYzw" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-center">
                <h4 className="font-headline-md text-headline-md text-white tracking-widest uppercase">Sapa</h4>
                <p className="text-secondary-fixed text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold text-white">120+ Homestays</p>
              </div>
            </div>
            {/* Destination Item 2 */}
            <div onClick={() => navigate('/homestays?location=Đà Nẵng')} className="relative group cursor-pointer overflow-hidden rounded-2xl h-80">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Đà Nẵng" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtn4zcC0Hk2MnZuNbnIvqN96QtUVx_YZtgCoaDJzFyzLbJEFUajdJx9BzmV6QggMrXv9rtBPBgwI_RbgIY7ndVON_5LI8BixVOUx9yutpLHj7qRM5RJV4juIgkGoN2OencEAoSsgg4_ODu6NS2Eb38rzIGLSUzP2vEnU-xDUiCQXji4RIPVwBZeWo8JI47s6cAPBJEQkxkFj_fXKJ-0cI-QF9yiKbf82Bq53CW_NcCiP6IRQacCCqD7Cl9Xg1fVJeygL1qifEKjoM" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-center">
                <h4 className="font-headline-md text-headline-md text-white tracking-widest uppercase">Đà Nẵng</h4>
                <p className="text-secondary-fixed text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold text-white">250+ Homestays</p>
              </div>
            </div>
            {/* Destination Item 3 */}
            <div onClick={() => navigate('/homestays?location=Hội An')} className="relative group cursor-pointer overflow-hidden rounded-2xl h-80">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Hội An" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQs7AJywhumfz2ebRjWYcrgRUQZJkFyvW8NVpjmIXr5cHx8s_gya71EPa3USBSNMpFO0xd_o3ehRK43LEwODSRFanbKiGRrSKx4o0Bp0IKyv0bRRJ72njeTmlgqzVZXeeDlJn2C2gpFuON6x0iak98KN3SJRq5Egvf-LLHouWxQTehLYo4Mz0si2Ut5UR0G3o2wGaIiCjUA0HZoX9ln9_qapQpJTgbQpmmSlvl1Ta-4g7_jQ3ATDvi6PbIgjO7P4wI9aadnf3JqcM" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-center">
                <h4 className="font-headline-md text-headline-md text-white tracking-widest uppercase">Hội An</h4>
                <p className="text-secondary-fixed text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold text-white">180+ Homestays</p>
              </div>
            </div>
            {/* Destination Item 4 */}
            <div onClick={() => navigate('/homestays?location=Hạ Long')} className="relative group cursor-pointer overflow-hidden rounded-2xl h-80">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Hạ Long" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClsZKr1tq7AQbKxX3Ko7mJMQFSN14BbqEYqDbbJ8XGOl_kHtu9ZZSL-8-Gthc7HYCsnAl1an1khkjGD3Smrd0uRQ_nSDi0M0Ivm5X0BmZH8NCFkNO3DzWHJYQki7MyOrIMShk4mhfVv-LpOgALPcd3rRfWZp485jPCD4u-KH3eeXE529KM9kUjvt-LySEZlepgdzHzsvYFw1rWzHnM67XK7QJnSwSCawYbry7ZYZU0eP2h2xciyE830caj-THdBZS7LN-9_aYth4s" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-center">
                <h4 className="font-headline-md text-headline-md text-white tracking-widest uppercase">Hạ Long</h4>
                <p className="text-secondary-fixed text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold text-white">95+ Homestays</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Handbook */}
      <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary uppercase tracking-widest mb-4">Cẩm Nang Du Lịch</h2>
          <div className="w-16 h-0.5 bg-outline-variant mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {/* Article 1 */}
          <div onClick={() => navigate('/cam-nang')} className="flex flex-col group cursor-pointer">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Article" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXFPXQlgukcJSBGonyQB_2NfNYs3nb-Z1hMBQrrGrn3CRvUgFHUzUCJmF8yhuqZUXtWJ4smvtdIZzWiaZgdYceZU0yqXiZMCx2f859MSDDw4PAFiJ4XDgTFpKUASoJQWWycYL2s_Bale3dJm00FZ-4R1I0aF7bshsjDsjA3WaJSh1odn78SW-VLpWlNjIXVxraQe1H07lFFyn_ZpeIaS_ufDZ1uJe3b2Oc7IhKlKib7XQ0xMVlc2rUaofmdUsPa-r4cBTjylswA1c" />
            </div>
            <p className="text-xs font-bold text-secondary uppercase mb-2">06 - 12 - 2024</p>
            <h3 className="font-headline-md text-body-lg text-primary leading-tight mb-2 group-hover:text-secondary transition-colors line-clamp-2">Khai trương homestay Phương Đông tại xã Đồng Văn</h3>
            <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">Chào mừng quý khách đến với không gian nghỉ dưỡng đẳng cấp mới tại vùng cao Đồng Văn với nhiều ưu đãi...</p>
          </div>
          {/* Article 2 */}
          <div onClick={() => navigate('/cam-nang')} className="flex flex-col group cursor-pointer">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Article" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZQtMkwgy1i1Jw4gQkcffsYu-Y0qGWUO6HLsJ74-nzHIXX-yVWKY9oodWr3uHo5tWKkMcxQl8Rn-QQPAj8lv75ZAG_CN4eSJ8gPmRt8uShoODVfrwWeTFTJp1QgO8AOaSqHQjv2K2hwj48_UsfVimfFd78yqEmFuSIBH9vHyv2uphk4Bofh9oBz4ssL4_8e-Z79IPx_fpuz7aDW3iVWDLFEh-5ooWrUnJmjM-BV3zGhbyPbuhrunh7LJj1NZSqrTzr6dpA93Dfti4" />
            </div>
            <p className="text-xs font-bold text-secondary uppercase mb-2">04 - 12 - 2024</p>
            <h3 className="font-headline-md text-body-lg text-primary leading-tight mb-2 group-hover:text-secondary transition-colors line-clamp-2">Top 10 Homestay có view biển đẹp nhất Việt Nam 2024</h3>
            <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">Khám phá danh sách những địa điểm nghỉ dưỡng có tầm nhìn triệu đô hướng thẳng ra biển Đông...</p>
          </div>
          {/* Article 3 */}
          <div onClick={() => navigate('/cam-nang')} className="flex flex-col group cursor-pointer">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Article" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-kgWNCSCU2tlth0HdbTMqOyZ_oWiq378PxJnMBYIB8SgUBR6HbWbSehbznAQrsJm0JjeHDDGftHRjCKJTKSVFjE_GXB3yOu0EkM9D1ZmM4Y-K6hZpFTJvrVKi2M-i1LffsJOHNludyjwLcmkamEvrqVzMri0uw1tLiabp9o609wCJ2sPhVT04xeVTJcEoaazX99-XxMTLVgmCpuZ8QW_xgaB6kaxRIdTgxCdCVqrcAp-gGKBEntfRxJo-Xi-3WRxFkbQT8cSBHTc" />
            </div>
            <p className="text-xs font-bold text-secondary uppercase mb-2">01 - 12 - 2024</p>
            <h3 className="font-headline-md text-body-lg text-primary leading-tight mb-2 group-hover:text-secondary transition-colors line-clamp-2">Kinh nghiệm đặt phòng homestay giá tốt ngày lễ</h3>
            <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">Bỏ túi ngay những bí kíp để săn được phòng đẹp với mức giá hợp lý nhất trong những kỳ nghỉ cao điểm...</p>
          </div>
          {/* Article 4 */}
          <div onClick={() => navigate('/cam-nang')} className="flex flex-col group cursor-pointer">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Article" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6qurctNI7Sm6dKrN0mgCKzVKtzjjIINPQvwvSioh8mfcVeflPwnX80miW6dtMiBJ4V6Na3Pk9R8BnB0S3Eq-2HkWyrZZviZ03QTrp5xAvHrXbuBoAaRsdvMftaak0iaNKDAvZWwlG6DYsmXHGU-YqVu6ZwXa8ooZOKCz47YKAET7mmOyXpLsLLDY72ka9TH2VRkESm8kqtAT01H_tHWMmEbdQmf3flJto9UuuoF6nrEkZ3HkVsodlVQonCwiR4Q2gpjfsODu8W4" />
            </div>
            <p className="text-xs font-bold text-secondary uppercase mb-2">28 - 11 - 2024</p>
            <h3 className="font-headline-md text-body-lg text-primary leading-tight mb-2 group-hover:text-secondary transition-colors line-clamp-2">Lịch trình khám phá Đà Lạt 3 ngày 2 đêm tự túc</h3>
            <p className="font-body-md text-on-surface-variant text-sm line-clamp-3">Gợi ý lịch trình chi tiết từ nơi ở, địa điểm ăn uống đến các góc check-in hot nhất thành phố ngàn hoa...</p>
          </div>
        </div>
      </section>

      {/* Destination Links Bar */}
      <div className="py-10 border-t border-outline-variant/20 px-margin-desktop max-w-container-max mx-auto">
        <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest text-center mb-8">Địa điểm du lịch</h3>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          <Link to="/homestays?location=Đà Nẵng" className="text-on-surface-variant hover:text-secondary transition-colors font-body-md">&gt; Du lịch Đà Nẵng</Link>
          <Link to="/homestays?location=Huế" className="text-on-surface-variant hover:text-secondary transition-colors font-body-md">&gt; Du lịch Huế</Link>
          <Link to="/homestays?location=Hội An" className="text-on-surface-variant hover:text-secondary transition-colors font-body-md">&gt; Du lịch Hội An</Link>
          <Link to="/homestays?location=Ninh Bình" className="text-on-surface-variant hover:text-secondary transition-colors font-body-md">&gt; Du lịch Ninh Bình</Link>
          <Link to="/homestays?location=Quảng Ninh" className="text-on-surface-variant hover:text-secondary transition-colors font-body-md">&gt; Du lịch Quảng Ninh</Link>
          <Link to="/homestays?location=Sapa" className="text-on-surface-variant hover:text-secondary transition-colors font-body-md">&gt; Du lịch SaPa</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
