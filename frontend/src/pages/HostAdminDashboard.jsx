import React from 'react';
import HostAdminLayout from '../components/HostAdminLayout';

const HostAdminDashboard = () => {
  return (
    <HostAdminLayout>
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Host Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Quản lý homestay và booking của bạn.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Doanh thu hôm nay</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">₫0</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Booking hôm nay</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Tỷ lệ lấp đầy</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">0%</p>
          </div>
        </div>
      </div>
    </HostAdminLayout>
  );
};

export default HostAdminDashboard;
