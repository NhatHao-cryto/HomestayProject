import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm h-20">
      <div className="flex justify-between items-center h-full px-margin-desktop max-w-container-max mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 active:scale-95 transition-all duration-300">
          <img
            alt="Luxestay Logo"
            className="h-10 w-auto"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFlmB8P6nnSkwzL0IoCjE-CXJoH-EwjEDmfTFP_r_sxPIBnq02wU65wXeEoG3W7vTtewtG_LKHCyOgCiNpl_vW4pcaE2kgtfnOLYAXxevr7WHSUqzKdC4CivATXrlv3INeNJPig4hzzxIBhY6SRELiELul1lO7Dn4w_97KgWjkeZwzV1eAGJk9OMHAkv4aExe_m6ozqr2MVlr68Xbot4S5XlWj0wnbG5L6wVmVW6BAGHZRAuoV2kwyD1f-hQCnivYGn0C1Ds7ajbY"
          />
          <span className="font-headline-md text-headline-md text-primary tracking-tight">
            Luxestay
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-all duration-300 h-full flex items-center border-b-2 ${
                isActive
                  ? 'text-primary font-bold border-secondary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/homestays"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-all duration-300 h-full flex items-center border-b-2 ${
                isActive
                  ? 'text-primary font-bold border-secondary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`
            }
          >
            Homestay
          </NavLink>

          <NavLink
            to="/cam-nang"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-all duration-300 h-full flex items-center border-b-2 ${
                isActive
                  ? 'text-primary font-bold border-secondary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`
            }
          >
            Cẩm nang
          </NavLink>

          <NavLink
            to="/ho-tro"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-all duration-300 h-full flex items-center border-b-2 ${
                isActive
                  ? 'text-primary font-bold border-secondary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`
            }
          >
            Hỗ trợ
          </NavLink>

          <NavLink
            to="/lich-su"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-all duration-300 h-full flex items-center border-b-2 ${
                isActive
                  ? 'text-primary font-bold border-secondary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`
            }
          >
            Lịch sử
          </NavLink>
        </nav>

        {/* User Account */}
        <div className="flex items-center gap-4">
          <Link
            to="/thong-tin-ca-nhan"
            className="w-10 h-10 bg-primary text-on-primary rounded-lg cursor-pointer active:scale-95 transition-all duration-300 flex items-center justify-center shadow-sm"
            aria-label="Account"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;