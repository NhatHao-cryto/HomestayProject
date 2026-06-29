import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const menu = [
  { to: '/host-admin', label: 'Dashboard' },
  { to: '/host-admin/verification', label: 'Xác minh chủ sở hữu' },
];

const HostAdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-200 bg-[#032452] p-6 text-white">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Host Admin</h2>
            <p className="mt-1 text-sm text-slate-300">Quản lý dữ liệu của bạn</p>
          </div>
          <nav className="space-y-2">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm transition ${isActive ? 'bg-white/15 text-white' : 'text-slate-200 hover:bg-white/10'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Homestay Management System</p>
              <h1 className="text-2xl font-semibold text-slate-900">Host Admin Panel</h1>
            </div>
            <Link to="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">Về trang chủ</Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default HostAdminLayout;
