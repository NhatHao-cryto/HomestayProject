import React, { useState } from 'react';

const CamNang = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [email, setEmail] = useState('');

  const articles = [
    {
      id: 1,
      category: "Trải nghiệm",
      date: "12 Tháng 10, 2024",
      title: "5 Homestay có bể bơi vô cực ngắm mây tại Đà Lạt",
      description: "Đà Lạt luôn là điểm đến lãng mạn, nhưng trải nghiệm ngắm mây từ bể bơi nước nóng của những căn homestay elite sẽ khiến bạn...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSv-BMT2Onn7_NaokIW4x3tkNVenAWLxUPoPDQkYfPxKPPCZ-vTiz8h-LGFhU_0HmQfZXJxwyhdQCy2MMHz1-MGO-2SEg4f7_zSIXpw5bYo4bPNNoM1h9POAtpSRnf4Qq8_nqdGWPdsGr2hAA1q8lTH5jDWy-WAkdTF_wrcsBPlIvX0v4zJ5W6QG5eznHyyh5YeIQ5uyhKIG7DjMIfGaYzk2MckGCiqz75gLUMrH43DZZlK8aFjjwCVOuP7I1TruGtBfJrhKYeu2U"
    },
    {
      id: 2,
      category: "Bí kíp",
      date: "08 Tháng 10, 2024",
      title: "Kiến trúc \"Mới & Cũ\" trong các khu nghỉ dưỡng di sản",
      description: "Sự kết hợp tinh tế giữa vật liệu bản địa và thiết kế đương đại đang tạo nên làn sóng mới trong ngành homestay cao cấp tại Việt Nam...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUQStXF2ksQNjt8DrbNKDwPVjKpsDv1eaITPnbmWJ8ohSkxdIn2aljRIdCbNYFs7C2s5yF5Y8Z0W_5PpPa8TTfTZ8mqG66AZztlG3HyZwBjIaAqzJhPuzGYgiZRliXT1Xx38dXtE2qzR-wPEk2vCioHxfPHxgR7zzX-srYXAXVbGZyahShLeTDZJMBIpiJ5Tg7ZjCsrhBqAFCQw3yF-8OziEAX4cIYYdTUp7XUcHpHp3uX03fOEdADIsMql8Ehf4eG_sdrrurX17g"
    },
    {
      id: 3,
      category: "Điểm đến",
      date: "05 Tháng 10, 2024",
      title: "Hội An: Phố cổ lung linh qua lăng kính người bản địa",
      description: "Bỏ qua những con phố đông đúc, hãy cùng Luxestay khám phá những ngõ nhỏ yên tĩnh và các xưởng thủ công truyền thống kín đáo...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdPir7cdY4yG1ZFg5PI6xYJxgjQmtxtZkhHMnF-9hlRL74p1KwLVJSo54LK9fCFp3Ku-Jf9nNth2Lg7brmcKdjz91cdkZc8oJvEKaPMvJ2UYaEVtYwovee02NbOpjZ14oANuH43YU1lEjE1Ix_QFsH90MevCOvogHd5vUiWq6M9xSkd-fmhlOf1evKP-SlRprm9z75KBTuzB_h_bz5u4sD5cD-s_w2ysIBr9cV04nl40Fcx_Rf79qmtyA8K69Lj8CVAnu30KKvBz4"
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Cảm ơn bạn đã đăng ký với email: ${email}`);
    setEmail('');
  };

  const filteredArticles = activeTab === 'Tất cả' 
    ? articles 
    : articles.filter(item => item.category === activeTab);

  return (
    <div>
      {/* Hero Section */}
      <header className="relative w-full h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover brightness-[0.7]" 
            alt="Sapa Terraced Fields" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzM75jsKK5OtV6Pq-tIMJJYnsA-rBDEp9IA5yXTzOVd2d3N8CXkVnXMcPMXSstetx_Lr2TKI16-AsDngjEZa1a-JfdDo7kr8wtkHctDTuoH-PQXtuJW4JumLYiwnETCMlc9AgONWR2kWXJYJ6C683wjK8YoKx-05Mqa8PVY_HHS4WnNylhizpzWglTWNHDInq6A-mfSHDwhCsmxOkMhBWG3NDID-CE2RkJB5mDkcOrOMmL-dPMKF946QCrXnkfjI6lS-K69Hk8yuM" 
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-margin-mobile">
          <span className="font-label-md text-label-md text-secondary-fixed mb-4 tracking-[0.2em] uppercase text-yellow-500">Khám phá Việt Nam</span>
          <h1 className="font-display-lg text-display-lg text-white mb-6 text-shadow-premium">Cẩm nang du lịch</h1>
          <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto">
            Hành trình tìm về những bản sắc độc bản, nơi giao thoa giữa di sản ngàn năm và sự xa hoa tinh tế của kỷ nguyên mới.
          </p>
        </div>
      </header>

      {/* Filter Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop -mt-10 relative z-20">
        <div className="glass-card bg-surface/90 rounded-lg shadow-sm p-6 flex flex-wrap justify-center gap-4 md:gap-12">
          {['Tất cả', 'Trải nghiệm', 'Bí kíp', 'Điểm đến', 'Tin tức'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-label-md text-label-md pb-1 px-2 transition-all ${
                activeTab === tab 
                  ? 'text-primary border-b-2 border-secondary font-bold' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post (2/3 Layout) */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Large Featured */}
          <div className="lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-lg h-[600px]">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Featured post" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzZ01FOroTXCX0lJ5vQxknkvL2qLxEhWNwNW6Y547BhR8l6H2nzTzY-KU6m55XnsnU3Mq99mX4mzPG7tSUA0k8TI7NtgKltMoMXZND_6IoFm1Pl4gHOcy6ltPGskClGweqwg2ayyCN3tbFZVkW39c3mNUPw0r-6pF_-urXyF1bqsEkwwR7ABsrcy-Z-F4zhnlSAdRU36IUhxdolpnuy_jLUllDolwYMY88-ssuynRHGBAQ07crLT-ARDrB03hNH0qrQ6Qfw3wzKRA" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-10 flex flex-col justify-end">
              <span className="inline-block bg-secondary px-3 py-1 text-[10px] text-white font-bold uppercase tracking-widest w-fit mb-4">Bài viết nổi bật</span>
              <h2 className="font-headline-lg text-headline-lg text-white mb-4 group-hover:text-secondary-fixed transition-colors">Tuyệt tác kỳ quan Vịnh Hạ Long: Hành trình trên du thuyền 6 sao</h2>
              <p className="text-white/80 font-body-md line-clamp-2 max-w-xl">
                Khám phá vẻ đẹp kỳ vĩ của di sản thiên nhiên thế giới qua góc nhìn hoàn toàn mới từ tầng thượng của những siêu du thuyền sang trọng nhất.
              </p>
            </div>
          </div>
          {/* Smaller Side Posts */}
          <div className="flex flex-col gap-gutter">
            <div className="group cursor-pointer flex flex-col h-[288px] relative rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Handbook 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB49RPTJR_M0ZezComUMIhNOZbORK-W6n5BnFYuWSuRDBmJ7E_WDsp-GOsIAtgxO7uotJ2aadupVrIX87QhqX4hW8PIupVm4njtqaLsGKqdp4_MXg-rgkIqzJY51yAcLfa0Mv-y21g3ar2MH_KVqg6H9_nls2m5IXFDfs6FEQ4rIt1vZ3kCNXfF2IMwOVDyxSLwGbfc9fM4ndU9ycn1yZtpdBlpuHW7bMeEAQbWKaE6nSQrNs-k9tHogJUyVEQ4XnS3IJq2z_n3ESk" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-6 flex flex-col justify-end">
                <span className="text-yellow-500 font-label-md text-[10px] uppercase mb-2">Ẩm thực</span>
                <h3 className="text-white font-headline-md text-body-lg group-hover:text-secondary-fixed transition-colors">Bí kíp thưởng trà tại vùng cao Sapa</h3>
              </div>
            </div>
            <div className="group cursor-pointer flex flex-col h-[288px] relative rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Handbook 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxbWFUUCWNVmYZkgH_sq-3tvh_ZOSK8qdF-3jMNx-cUbwOAPbFUxXTUJTf7m49Mhp7fVjQMzW1LuzPrzx5OhQaxhxv2fCDexbDF68eUb9Dt9GY2_11ftTT4nsRQsIDsCAVo2QHMMjqn1iER0AwffLzNDwdyzHr-y8XOcEeIYxjk01e1aUpT0rVoFEQyqPicopdN-yVCSz2ELjgP_vq2dVZI2hsIhR_4fy_axwcJ5XqMxVMjSKKd7vQC0b21jWSUbKgNr4YvgPlkTU" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-6 flex flex-col justify-end">
                <span className="text-yellow-500 font-label-md text-[10px] uppercase mb-2">Chăm sóc</span>
                <h3 className="text-white font-headline-md text-body-lg group-hover:text-secondary-fixed transition-colors">Tận hưởng liệu trình Spa giữa rừng già</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="bg-surface-container-low py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Bài viết mới nhất</h2>
              <div className="h-1 w-20 bg-secondary rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredArticles.map(item => (
              <div key={item.id} className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white">
                <div className="h-64 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} src={item.image} />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-on-surface-variant font-label-md text-[12px] block mb-2">{item.date}</span>
                    <h3 className="font-headline-md text-[20px] text-primary mb-3 leading-tight group-hover:text-secondary transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-on-surface-variant font-body-md line-clamp-3 mb-4">{item.description}</p>
                  </div>
                  <button className="text-secondary font-label-md uppercase tracking-wider text-[12px] flex items-center gap-2 hover:translate-x-2 transition-transform mt-auto text-left">
                    Đọc bài viết <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-container py-section-gap relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full transform scale-150 rotate-12" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="198" stroke="white" strokeDasharray="10 10" strokeWidth="2"></circle>
            <circle cx="200" cy="200" r="148" stroke="white" strokeDasharray="10 10" strokeWidth="2"></circle>
            <circle cx="200" cy="200" r="98" stroke="white" strokeDasharray="10 10" strokeWidth="2"></circle>
          </svg>
        </div>
        <div className="max-w-2xl mx-auto text-center px-margin-mobile relative z-10">
          <h2 className="font-display-lg text-headline-lg text-white mb-4">Ghi danh cho những chuyến đi tiếp theo</h2>
          <p className="text-on-primary-container font-body-md mb-8 text-white/80">Nhận những ưu đãi độc quyền và cẩm nang du lịch định kỳ dành riêng cho thành viên Luxestay Elite.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input 
              className="flex-grow bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-body-md" 
              placeholder="Email của bạn" 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-label-md font-bold hover:bg-secondary-fixed transition-colors whitespace-nowrap bg-yellow-500 text-white" type="submit">Đăng ký ngay</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CamNang;
