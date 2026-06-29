import React from 'react';
import SystemAdminLayout from '../components/SystemAdminLayout';

const SystemAdminDashboard = () => {
  return (
    <SystemAdminLayout>
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">System Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Theo dõi toàn bộ nền tảng.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ['Total bookings', '0'],
            ['Total revenue', '₫0'],
            ['Total users', '0'],
            ['Bookings today', '0'],
            ['Occupancy rate', '0%'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </SystemAdminLayout>
  );
};

export default SystemAdminDashboard;
