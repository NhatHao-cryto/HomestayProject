import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & pages
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DSHomestay from './pages/DSHomestay';
import CTHomestay from './pages/CTHomestay';
import CamNang from './pages/CamNang';
import DangNhap from './pages/DangNhap';
import DangKy from './pages/DangKy';
import HoTro from './pages/HoTro';
import LSDatPhong from './pages/LSDatPhong';
import ChiTietLS from './pages/ChiTietLS';
import ThanhToan from './pages/ThanhToan';
import XacNhanThanhToan from './pages/XacNhanThanhToan';
import ThongTinCaNhan from './pages/ThongTinCaNhan';

import HostAdminDashboard from './pages/HostAdminDashboard';
import SystemAdminDashboard from './pages/SystemAdminDashboard';
import HostVerification from './pages/HostVerification';
import HostHomestays from './pages/HostHomestays';
import HostRooms from './pages/HostRooms';
import SystemAdminUsers from './pages/SystemAdminUsers';
import SystemAdminHosts from './pages/SystemAdminHosts';
import SystemAdminBookings from './pages/SystemAdminBookings';

import HostAdminLayout from './components/HostAdminLayout';
import SystemAdminLayout from './components/SystemAdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without standard layout */}
        <Route path="/dang-nhap" element={<DangNhap />} />
        <Route path="/dang-ky" element={<DangKy />} />

        {/* Host Admin routes */}
        <Route
          path="/host-admin"
          element={
            <ProtectedRoute allowedRoles={['HOST_ADMIN']}>
              <HostAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HostAdminDashboard />} />
          <Route path="verification" element={<HostVerification />} />
          <Route path="homestays" element={<HostHomestays />} />
          <Route path="rooms" element={<HostRooms />} />
        </Route>

        {/* System Admin routes */}
        <Route
          path="/system-admin"
          element={
            <ProtectedRoute allowedRoles={['SYSTEM_ADMIN']}>
              <SystemAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SystemAdminDashboard />} />
          <Route path="users" element={<SystemAdminUsers />} />
          <Route path="hosts" element={<SystemAdminHosts />} />
          <Route path="bookings" element={<SystemAdminBookings />} />
        </Route>

        {/* Standard routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="homestays" element={<DSHomestay />} />
          <Route path="homestays/:id" element={<CTHomestay />} />
          <Route path="cam-nang" element={<CamNang />} />
          <Route path="ho-tro" element={<HoTro />} />
          <Route path="lich-su" element={<LSDatPhong />} />
          <Route path="lich-su/:id" element={<ChiTietLS />} />
          <Route path="thanh-toan" element={<ThanhToan />} />
          <Route path="xac-nhan-thanh-toan" element={<XacNhanThanhToan />} />
          <Route path="thong-tin-ca-nhan" element={<ThongTinCaNhan />} />

          {/* Route cũ, chuyển về thông tin cá nhân */}
          <Route path="quan-ly" element={<Navigate to="/thong-tin-ca-nhan" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;