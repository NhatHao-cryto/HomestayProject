import { useEffect, useState } from 'react';
import api from "../js/api.js";
import { useNavigate } from 'react-router-dom';

const ModalDoiMatKhau = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (oldPassword === newPassword) {
      setError('Mật khẩu mới phải khác mật khẩu cũ.');
      return;
    }

    try {
      setLoading(true);
      await api.put('/homestay/users/change-password', { oldPassword, newPassword });
      setSuccess(true);
      setTimeout(() => onClose(), 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const EyeToggle = ({ show, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      tabIndex={-1}
    >
      <span className="material-symbols-outlined text-[20px]">
        {show ? 'visibility_off' : 'visibility'}
      </span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,35,73,0.1)' }}>
            <span className="material-symbols-outlined text-[20px]" style={{ color: 'rgb(0,35,73)' }}>lock</span>
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'rgb(0, 35, 73)' }}>Đổi mật khẩu</h2>
            <p className="text-gray-500 text-sm">Nhập mật khẩu cũ để xác thực</p>
          </div>
        </div>

        {success && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Đổi mật khẩu thành công! Đang đóng...
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">Mật khẩu hiện tại</label>
            <div className="relative">
              <input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => { setOldPassword(e.target.value); setError(''); }}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:border-blue-400 transition-colors text-sm"
                required
              />
              {/* eslint-disable-next-line react-hooks/static-components */}
              <EyeToggle show={showOld} onToggle={() => setShowOld(!showOld)} />
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200" />

          <div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                placeholder="Tối thiểu 8 ký tự"
                className="w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:border-blue-400 transition-colors text-sm"
                required
              />
              {/* eslint-disable-next-line react-hooks/static-components */}
              <EyeToggle show={showNew} onToggle={() => setShowNew(!showNew)} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">Xác nhận mật khẩu mới</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                placeholder="Nhập lại mật khẩu mới"
                className="w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:border-blue-400 transition-colors text-sm"
                required
              />
              {/* eslint-disable-next-line react-hooks/static-components */}
              <EyeToggle show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
            </div>
            {confirmPassword && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${newPassword === confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {newPassword === confirmPassword ? 'check_circle' : 'cancel'}
                </span>
                {newPassword === confirmPassword ? 'Mật khẩu khớp' : 'Mật khẩu chưa khớp'}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">dev
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-all text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 py-3 rounded-lg text-white font-medium hover:opacity-90 disabled:opacity-50 transition-all text-sm"
              style={{ backgroundColor: 'rgb(0, 35, 73)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Đang xử lý...
                </span>
              ) : 'Xác nhận'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//  Trang Thông Tin Cá Nhân
const ThongTinCaNhan = () => {
  const navigate = useNavigate();
  const [showModalDoiMatKhau, setShowModalDoiMatKhau] = useState(false);

  const [profile, setProfile] = useState({
    id: '', username: '', fullName: '', email: '',
    phone: '', dob: '', sex: '', roles: []
  });

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await api.get('/homestay/users/myInfo');
        setProfile(response.data.result);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/dang-nhap');
      }
    };
    fetchMyInfo();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
          "/homestay/users/myInfo",
          {
            fullName: profile.fullName,
            email: profile.email,
            phone: Number(profile.phone),
            dob: profile.dob,
            sex: profile.sex
          }
      );

      setProfile(response.data.result);
      alert("Cập nhật thành công!");

    } catch (error) {
      console.error(error);
      alert(
          error.response?.data?.message ??
          "Không thể cập nhật thông tin."
      );
    }
  };

  const handleLogout = async () => {

    try {
      await api.post("/homestay/auth/logout");
    } catch (error) {

      console.error(error);

    } finally {
      localStorage.removeItem("token");
      navigate("/dang-nhap");
    }
  };

  return (
    <>
      {showModalDoiMatKhau && (
        <ModalDoiMatKhau onClose={() => setShowModalDoiMatKhau(false)} />
      )}

      <main className="max-w-[1024px] mx-auto px-6 flex flex-col md:flex-row gap-6 min-h-[calc(100vh-12rem)] py-6 pt-28">
        {/* Sidebar */}
        <aside className="w-full md:w-56 flex-shrink-0">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Cài đặt</h1>
          <nav className="flex flex-col gap-0.5">
            <a
              className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 bg-gray-200 text-primary font-bold"
              href="#"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <span className="font-label-md text-label-md">Thông tin cá nhân</span>
            </a>
            <button
              onClick={() => setShowModalDoiMatKhau(true)}
              className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-700 text-left w-full"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span className="font-label-md text-label-md">Đổi mật khẩu</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 text-left w-full"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="font-label-md text-label-md">Đăng xuất</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-grow space-y-4">
          <section className="glass-card rounded-xl p-6 md:p-6 shadow-sm bg-white border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-md text-primary">Thông tin cá nhân</h2>
              <span className="text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider text-gray-500">HOÀN THIỆN: 100%</span>
            </div>

            <div className="flex items-center gap-5 mb-6">
              <div className="relative group">
                <img
                  alt="Profile photo"
                  className="w-20 h-20 rounded-full object-cover border-4 border-surface shadow-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNWGInCdIR3kKSGf3OOFeqOgym_YTgxyj-I5VKVCiseA09YFtvWvcY6-1spOqpaZS_rovBlPtsZjNLZyL-bATkqju1IkiWv1fGViZo3LRxsdbH9GATCbXF3SEa3TEfUyyles_agWYlgc7iYYKuMilPkd59Rc8PLxohg0a4RiEvU6rh-EYEgvEb9g42vhEkp4Tn9IlvGysyKAok0dasR_LIjJsDnI0nAvd6I__yBwMdyqGtZMccCye6nesdj8ooyqNOm2MvZBQP1E"
                />
                <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" htmlFor="avatar-upload">
                  <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
                </label>
                <input className="hidden" id="avatar-upload" type="file" />
              </div>
              <div>
                <h3 className="font-headline-md text-[16px] text-primary">{profile.fullName}</h3>
                <p className="text-on-surface-variant font-body-md text-[13px]">San Francisco, CA • Joined May 2023</p>
                <div className="mt-1 flex gap-3">
                  <button className="font-label-md text-label-md hover:underline text-yellow-600">Thay đổi ảnh</button>
                  <button className="font-label-md text-label-md hover:underline text-red-600">Xóa</button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="relative border rounded-lg p-3 pt-1">
                  <label className="text-gray-500 text-[11px]">
                    Họ và tên
                  </label>
                  <input
                      type="text"
                      className="w-full bg-transparent border-none outline-none p-0 focus:ring-0"
                      value={profile.fullName || ""}
                      onChange={(e) =>
                          setProfile({
                            ...profile,
                            fullName: e.target.value,
                          })
                      }
                      required
                  />
                </div>
                <div className="relative border rounded-lg p-3 pt-1">
                  <label className="text-gray-500 text-[11px]">
                    Địa chỉ Email
                  </label>
                  <input
                      type="email"
                      className="w-full bg-transparent border-none outline-none p-0 focus:ring-0"
                      value={profile.email || ""}
                      onChange={(e) =>
                          setProfile({
                            ...profile,
                            email: e.target.value,
                          })
                      }
                      required
                  />
                </div>

                <div className="relative border rounded-lg p-3 pt-1">
                  <label className="text-gray-500 text-[11px]">
                    Số điện thoại
                  </label>
                  <input
                      type="tel"
                      className="w-full bg-transparent border-none outline-none p-0 focus:ring-0"
                      value={profile.phone || ""}
                      onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone: e.target.value,
                          })
                      }
                      required
                  />
                </div>
                <div className="relative border rounded-lg p-3 pt-1">
                  <label className="text-gray-500 text-[11px]">
                    Ngày sinh
                  </label>
                  <input
                      type="date"
                      className="w-full bg-transparent border-none outline-none p-0 focus:ring-0"
                      value={profile.dob || ""}
                      onChange={(e) =>
                          setProfile({
                            ...profile,
                            dob: e.target.value,
                          })
                      }
                  />
                </div>
                <div className="relative border rounded-lg p-3 pt-1 md:col-span-2">
                  <label className="text-gray-500 text-[11px]">
                    Giới tính
                  </label>

                  <select
                      className="w-full bg-transparent border-none outline-none p-0 focus:ring-0"
                      value={profile.sex || ""}
                      onChange={(e) =>
                          setProfile({
                            ...profile,
                            sex: e.target.value,
                          })
                      }
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="text-white px-8 py-2.5 rounded-lg font-headline-md text-[16px] hover:shadow-md active:scale-[0.98] transition-all"
                  style={{ backgroundColor: 'rgb(0, 35, 73)' }}
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default ThongTinCaNhan;
