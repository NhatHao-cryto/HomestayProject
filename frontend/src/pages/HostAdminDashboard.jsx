import React from 'react';
import { Link } from 'react-router-dom';

const HostAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Trung tâm quản lý Host
        </h1>
        <p className="mt-2 text-slate-500">
          Quản lý xác minh chủ sở hữu, homestay và phòng của bạn.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Xác minh chủ sở hữu</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Đang xử lý</h2>
          <p className="mt-2 text-sm text-slate-500">
            Gửi minh chứng để được phép đăng homestay.
          </p>
          <Link
            to="/host-admin/verification"
            className="mt-4 inline-block rounded-xl bg-[#032452] px-4 py-2 text-sm font-medium text-white"
          >
            Gửi xác minh
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Homestay</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Quản lý</h2>
          <p className="mt-2 text-sm text-slate-500">
            Thêm, sửa, xóa và cập nhật trạng thái homestay.
          </p>
          <Link
            to="/host-admin/homestays"
            className="mt-4 inline-block rounded-xl bg-[#032452] px-4 py-2 text-sm font-medium text-white"
          >
            Quản lý homestay
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Phòng</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Quản lý</h2>
          <p className="mt-2 text-sm text-slate-500">
            Theo dõi phòng trống, phòng đang thuê và phòng bảo trì.
          </p>
          <Link
            to="/host-admin/rooms"
            className="mt-4 inline-block rounded-xl bg-[#032452] px-4 py-2 text-sm font-medium text-white"
          >
            Quản lý phòng
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Gợi ý thao tác
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Bước 1</p>
            <p className="mt-1 text-sm text-slate-500">
              Gửi minh chứng chủ sở hữu để hệ thống duyệt.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Bước 2</p>
            <p className="mt-1 text-sm text-slate-500">
              Thêm thông tin homestay sau khi được xác minh.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Bước 3</p>
            <p className="mt-1 text-sm text-slate-500">
              Tạo phòng và cập nhật trạng thái phòng theo thực tế.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostAdminDashboard;