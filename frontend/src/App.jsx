import 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import QuanLy from './pages/QuanLy';
import NhapMaPin from "./pages/NhapMaPin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without standard layout */}
        <Route path="/dang-nhap" element={<DangNhap />} />
        <Route path="/dang-ky" element={<DangKy />} />

        {/* Standard routes with Layout (Header + Footer) */}
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
          <Route path="quan-ly" element={<QuanLy />} />
          <Route path="/xac-thuc-pin" element={<NhapMaPin />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
