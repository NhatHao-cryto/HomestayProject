import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DangNhap = () => {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Login success
    localStorage.setItem('user', JSON.stringify({ name: "Nguyễn Hoàng", email: "julian.alex@luxestay.luxury" }));
    navigate('/');
  };

  return (
    <div className="bg-surface-container-high font-body-md text-on-surface antialiased flex items-center justify-center min-h-screen">
      <main className="w-full max-w-[1280px] h-[976px] flex bg-surface-container-lowest shadow-xl overflow-hidden rounded-xl bg-white">
        {/* Left Side: Cinematic Travel Image */}
        <section className="hidden lg:block w-7/12 relative h-full">
          <div className="absolute inset-0 bg-primary/10 z-10"></div>
          <img 
            alt="Sapa Landscape" 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4dWn0kFFyiC5H5Qsk8mD_kyQH_YO9Yq4qNZutzbt6ogy9ZOGVUOieoKPvDNwzZ4KBsUO1dtfgOzvXNihXcck_S5_0iins_ryTufFHW5bzX7MWNRr8ubm0nKVbTKGH1gXmipZfWunGdSkIzQULycxjlI_TeBQdWOxG067JvCJhNRszTPCpTAwIrCxnAoPeTVRqT6jnPe9DKY0ZzH--9MBfTI1Rs76u1msN4E0EAxbrv96_n7-cEECHqzpmtNYR5EWIsrbJL7UnOwI" 
          />
          {/* Branding Overlay */}
          <div className="absolute top-margin-desktop left-margin-desktop z-20">
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-headline-md font-extrabold text-white tracking-tighter">Luxestay</span>
            </div>
          </div>
          {/* Quote/Context Overlay */}
          <div className="absolute bottom-margin-desktop left-margin-desktop z-20 max-w-md">
            <h2 className="font-display-lg text-display-lg text-white mb-4">Khám phá tinh hoa nghỉ dưỡng.</h2>
            <p className="font-body-lg text-body-lg text-white/90 opacity-80">Trải nghiệm những homestay cao cấp được tuyển chọn khắt khe nhất tại Việt Nam.</p>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="w-full lg:w-5/12 bg-white flex flex-col px-margin-mobile md:px-16 lg:px-12">
          <div className="w-full max-w-[440px] my-auto">
            {/* Brand Mobile */}
            <div className="lg:hidden mb-12 flex justify-center">
              <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tighter">Luxestay</span>
            </div>
            <div className="mb-10 text-center lg:text-left">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-3">Đăng nhập vào Luxestay</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Chào mừng bạn quay trở lại với những kỳ nghỉ tuyệt vời.</p>
            </div>
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Phone Input */}
              <div className="group">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2 transition-colors group-focus-within:text-secondary" htmlFor="identity">
                  Email / Số điện thoại
                </label>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-3.5 bg-background border border-outline-variant rounded-lg font-body-md focus:ring-0 focus:border-secondary transition-all placeholder:text-outline/50" 
                    id="identity" 
                    placeholder="example@email.com" 
                    type="text"
                    required
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                  />
                </div>
              </div>
              {/* Password Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-label-md text-label-md text-on-surface-variant transition-colors group-focus-within:text-secondary" htmlFor="password">
                    Mật khẩu
                  </label>
                  <a className="font-label-md text-label-md text-secondary hover:text-secondary-fixed-dim transition-colors underline-offset-4 hover:underline" href="#">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-3.5 bg-background border border-outline-variant rounded-lg font-body-md focus:ring-0 focus:border-secondary transition-all" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Actions */}
              <button 
                className="w-full bg-primary text-on-primary font-headline-md text-body-md py-4 rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-[0.98] mt-2 text-white" 
                type="submit"
              >
                Đăng nhập
              </button>
            </form>
            
            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-outline font-label-md">Hoặc tiếp tục với</span>
              </div>
            </div>
            
            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleSubmit} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors group">
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLzRO3WV85vpsV8IdivSj16VFkds1823rpX7QuI9vtHoE6G6ScSQjEJfmoESCqPuLoLVs5iMXeSMm-tNrddZufPzYfQwbwiNibSw56oUwOphP7CGXZ6djIttfRffcJC07TqE0B8e79WIydkhBh2dxHz69_3Yxr337u78PzZzIn8jByqxD_Agamas4faP5jzO_Wa5a80UggjkVgyDTPocql2e9bbgq_7L_oBmEGGAEKnptYgp5Ymp_3mCVjN_k7WsXASwM8lHq7EU8" />
                <span className="font-label-md text-on-surface-variant group-hover:text-on-surface">Google</span>
              </button>
              <button onClick={handleSubmit} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors group">
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
                <span className="font-label-md text-on-surface-variant group-hover:text-on-surface">Facebook</span>
              </button>
            </div>

            {/* Register Link */}
            <div className="mt-12 text-center">
              <p className="font-body-md text-on-surface-variant">
                Bạn chưa có tài khoản? 
                <Link className="font-label-md text-secondary font-bold ml-1 hover:text-secondary-fixed-dim transition-colors" to="/dang-ky">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
          <div className="mt-auto py-8">
            <p className="font-label-md text-[12px] text-outline-variant uppercase tracking-widest text-center">Luxestay Premium Service © 2024</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DangNhap;
