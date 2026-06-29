import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../js/api";

const DangKy = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('Nam');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      await api.post("/homestay/auth/register", {
        username,
        password,
        fullName: name,
        email,
        phone: Number(phone),
        dob,
        sex
      });
      sessionStorage.setItem(
          "verifyEmail",
          email
      );
      alert("Mã OTP đã được gửi đến email.");
      navigate("/xac-thuc-pin");
    } catch (error) {
      alert(
          error.response?.data?.message
          || "Đăng ký thất bại."
      );
    }

  };

  return (
    <div className="bg-surface font-body-md text-on-surface flex items-center justify-center min-h-screen">
      <main className="w-full flex flex-col md:flex-row bg-white" style={{ width: "1280px", height: "976px", minHeight: "976px" }}>
        {/* Left Side: Visual Inspiration */}
        <section className="relative hidden md:flex md:w-1/2 overflow-hidden bg-primary">
          <img 
            alt="Misty Sapa mountain landscape" 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujY01G_CdHUxeONz3BdbMQoXe7oGbI60wy_rwP33fBsGszsNnJNeaXKApOXSBFHHNHVsIppKqxLGQAgRYDc4beOMasHFwdzWYH6LtkFEXcHRdMsQTZe1YR5fj0ywfEz8H-Jj6tWIBi1GBuziz6xdHVIopLJm949nFrxW0zvj2Z-SPQJrETd-yteN2Ont1QjcwvpV6Lez6cANSL-AyscqMKOytOKCbAeFwiGuQyeqfmypPikUfAkgvCNNA" 
          />
          {/* Gradient & Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-margin-desktop">
            <div className="max-w-md space-y-4">
              <h1 className="font-display-lg text-display-lg text-white leading-tight">
                Bắt đầu hành trình của bạn.
              </h1>
              <p className="font-body-lg text-body-lg text-white/90">
                Tham gia cộng đồng Luxestay để tận hưởng những kỳ nghỉ tinh hoa nhất Việt Nam.
              </p>
              <div className="h-1 w-16 bg-secondary-container mt-6"></div>
            </div>
          </div>
          {/* Brand Logo Overlay */}
          <div className="absolute top-margin-desktop left-margin-desktop">
            <span className="font-headline-md text-headline-md font-bold text-white tracking-tight">Luxestay</span>
          </div>
        </section>

        {/* Right Side: Registration Form */}
        <section className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-margin-desktop h-full">
          <div className="w-full max-w-[480px]">
            {/* Mobile Header */}
            <div className="md:hidden mb-12">
              <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Luxestay</span>
              <h2 className="mt-6 font-headline-lg-mobile text-headline-lg-mobile text-primary">Tạo tài khoản mới</h2>
            </div>
            <div className="hidden md:block mb-10">
              <h2 className="font-headline-lg text-headline-lg text-primary">Tham gia Luxestay</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Điền thông tin bên dưới để bắt đầu trải nghiệm nghỉ dưỡng cao cấp.</p>
            </div>
            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label
                    className="block font-label-md text-label-md text-on-surface-variant"
                    htmlFor="username"
                >
                  Tên đăng nhập
                </label>

                <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                />
              </div>
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="name">Họ và tên</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-surface-container-lowest transition-all font-body-md text-on-surface" 
                  id="name" 
                  placeholder="Ví dụ: Nguyễn Văn A" 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email</label>
                  <input 
                    className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-surface-container-lowest transition-all font-body-md text-on-surface" 
                    id="email" 
                    placeholder="email@vi-du.com" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="phone">Số điện thoại</label>
                  <input 
                    className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-surface-container-lowest transition-all font-body-md text-on-surface" 
                    id="phone" 
                    placeholder="09xx xxx xxx" 
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                      className="block font-label-md text-label-md text-on-surface-variant"
                  >
                    Ngày sinh
                  </label>
                  <input
                      type="date"
                      value={dob}
                      onChange={(e)=>setDob(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                      className="block font-label-md text-label-md text-on-surface-variant"
                  >
                    Giới tính
                  </label>
                  <select
                      value={sex}
                      onChange={(e)=>setSex(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>
              {/* Password */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="password">Mật khẩu</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-surface-container-lowest transition-all font-body-md text-on-surface" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="confirm-password">Xác nhận mật khẩu</label>
                <input 
                  className="w-full px-4 py-3.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-surface-container-lowest transition-all font-body-md text-on-surface" 
                  id="confirm-password" 
                  placeholder="••••••••" 
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {/* Primary CTA */}
              <button 
                className="w-full bg-primary text-white font-label-md py-4 rounded-full hover:bg-primary-container transition-colors shadow-md active:scale-[0.98] transform mt-4" 
                type="submit"
              >
                Đăng ký
              </button>
            </form>
            
            {/* Social Divider */}
            <div className="relative my-10">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-on-surface-variant font-label-md uppercase tracking-widest text-[10px]">Hoặc tiếp tục với</span>
              </div>
            </div>
            
            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleSubmit} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors font-label-md text-on-surface">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span>Google</span>
              </button>
              <button onClick={handleSubmit} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors font-label-md text-on-surface">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-12 text-center">
              <p className="font-body-md text-on-surface-variant">
                Đã có tài khoản? 
                <Link className="text-primary font-bold hover:underline ml-1" to="/dang-nhap">Đăng nhập ngay</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DangKy;
