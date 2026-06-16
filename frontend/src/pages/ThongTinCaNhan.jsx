import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThongTinCaNhan = () => {
  const navigate = useNavigate();

  // Profile data states
  const [profile, setProfile] = useState({
    name: "Nguyễn Hoàng",
    email: "julian.alex@luxestay.luxury",
    phone: "+1 (555) 012-3456",
    birthday: "November 24, 1988",
    gender: "Nam"
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Cập nhật thông tin cá nhân thành công!");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert("Đã đăng xuất thành công!");
    navigate('/dang-nhap');
  };

  return (
    <main className="max-w-[1024px] mx-auto px-6 flex flex-col md:flex-row gap-6 min-h-[calc(100vh-12rem)] py-6 pt-28">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-56 flex-shrink-0">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Cài đặt</h1>
        <nav className="flex flex-col gap-0.5">
          <a className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 bg-surface-container-high text-primary font-bold bg-gray-200" href="#">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <span className="font-label-md text-label-md">Thông tin cá nhân</span>
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 text-error hover:bg-error-container/20 text-red-600 text-left w-full"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="font-label-md text-label-md">Đăng xuất</span>
          </button>
        </nav>
      </aside>

      {/* Content Canvas */}
      <div className="flex-grow space-y-4">
        {/* Personal Info Section */}
        <section className="glass-card rounded-xl p-6 md:p-6 shadow-sm bg-white border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-md text-headline-md text-primary">Thông tin cá nhân</h2>
            <span className="text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider text-gray-500">HOÀN THIỆN: 100%</span>
          </div>

          {/* Avatar Upload */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative group">
              <img 
                alt="Profile photo" 
                className="w-20 h-20 rounded-full object-cover border-4 border-surface shadow-md" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNWGInCdIR3kKSGf3OOFeqOgym_YTgxyj-I5VKVCiseA09YFtvWvcY6-1spOqpaZS_rovBlPtsZjNLZyL-bATkqju1IkiWv1fGViZo3LRxsdbH9GATCbXF3SEa3TEfUyyles_agWYlgc7iYYKuMilPkd59Rc8PLxohg0a4RiEvU6rh-EYEgvEb9g42vhEkp4Tn9IlvGysyKAok0dasR_LIjJsDnI0nAvd6I__yBwMdyqGtZMccCye6nesdj8ooyqNOm2MvZBQP1E" 
              />
              <label className="absolute inset-0 bg-primary/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-black/40" htmlFor="avatar-upload">
                <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
              </label>
              <input className="hidden" id="avatar-upload" type="file" />
            </div>
            <div>
              <h3 className="font-headline-md text-[16px] text-primary">{profile.name}</h3>
              <p className="text-on-surface-variant font-body-md text-[13px]">San Francisco, CA • Joined May 2023</p>
              <div className="mt-1 flex gap-3">
                <button className="font-label-md text-label-md text-secondary hover:underline text-yellow-600">Thay đổi ảnh</button>
                <button className="font-label-md text-label-md text-error hover:underline text-red-600">Xóa</button>
              </div>
            </div>
          </div>

          {/* Personal Info Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="relative group border rounded-lg p-3 pt-1">
                <label className="text-on-surface-variant font-label-md text-[11px] text-gray-500">Họ và tên</label>
                <input 
                  className="w-full bg-transparent font-body-md text-body-md outline-none transition-all border-none p-0 focus:ring-0" 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="relative group border rounded-lg p-3 pt-1">
                <label className="text-on-surface-variant font-label-md text-[11px] text-gray-500">Địa chỉ Email</label>
                <input 
                  className="w-full bg-transparent font-body-md text-body-md outline-none transition-all border-none p-0 focus:ring-0" 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="relative group border rounded-lg p-3 pt-1">
                <label className="text-on-surface-variant font-label-md text-[11px] text-gray-500">Số điện thoại</label>
                <input 
                  className="w-full bg-transparent font-body-md text-body-md outline-none transition-all border-none p-0 focus:ring-0" 
                  type="tel" 
                  value={profile.phone} 
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="relative group border rounded-lg p-3 pt-1">
                <label className="text-on-surface-variant font-label-md text-[11px] text-gray-500">Ngày sinh</label>
                <input 
                  className="w-full bg-transparent font-body-md text-body-md outline-none transition-all border-none p-0 focus:ring-0" 
                  type="text" 
                  value={profile.birthday} 
                  onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                />
              </div>
              <div className="relative group border rounded-lg p-3 pt-1 flex flex-col md:col-span-1 justify-center">
                <label className="text-on-surface-variant font-label-md text-[11px] text-gray-500 mb-1">Giới tính</label>
                <select 
                  className="w-full bg-transparent font-body-md text-body-md outline-none border-none p-0 focus:ring-0 appearance-none"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                  <option>Không muốn trả lời</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="text-white px-8 py-2.5 rounded-lg font-headline-md text-[16px] hover:shadow-md active:scale-[0.98] transition-all bg-primary"
                style={{ backgroundColor: "rgb(0, 35, 73)" }}
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ThongTinCaNhan;
