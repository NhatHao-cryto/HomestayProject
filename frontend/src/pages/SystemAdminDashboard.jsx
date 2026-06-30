import React from 'react';

const stats = [
  { label: 'Tổng người dùng', value: '24' },
  { label: 'Tổng host', value: '8' },
  { label: 'Tổng homestay', value: '12' },
  { label: 'Tổng phòng', value: '36' },
  { label: 'Tổng booking', value: '92' },
  { label: 'Doanh thu', value: '₫1.2 tỷ' },
  { label: 'Chờ duyệt host', value: '3' },
];

const revenueData = [
  { month: 'T1', value: 22 },
  { month: 'T2', value: 28 },
  { month: 'T3', value: 33 },
  { month: 'T4', value: 41 },
  { month: 'T5', value: 38 },
  { month: 'T6', value: 49 },
];

const roomTypes = [
  { label: 'Standard', value: 45 },
  { label: 'Deluxe', value: 35 },
  { label: 'Suite', value: 20 },
];

const SystemAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">System Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Theo dõi toàn bộ nền tảng.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Doanh thu & booking theo tháng</h2>

          <div className="mt-5 flex items-end gap-3 h-48">
            {revenueData.map((item) => (
              <div key={item.month} className="flex-1 text-center">
                <div
                  className="rounded-t-xl bg-[#032452]"
                  style={{ height: `${item.value * 2.5}px` }}
                />
                <p className="mt-2 text-xs text-slate-500">{item.month}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Tỷ lệ loại phòng</h2>

          <div className="mt-5 space-y-4">
            {roomTypes.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm text-slate-600">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-[#032452]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;