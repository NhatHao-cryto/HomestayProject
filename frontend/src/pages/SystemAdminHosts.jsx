import React from 'react';
import SystemAdminLayout from '../components/SystemAdminLayout';

const SystemAdminHosts = () => {
  return (
    <SystemAdminLayout>
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Duyệt chủ nhà</h1>
          <p className="mt-2 text-sm text-slate-600">Duyệt và quản lý yêu cầu host.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-4">Host</th>
                <th className="py-3 pr-4">Trạng thái</th>
                <th className="py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4">Demo Host</td>
                <td className="py-3 pr-4">PENDING</td>
                <td className="py-3">
                  <button className="rounded-lg bg-emerald-600 px-3 py-2 text-white">Approve</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SystemAdminLayout>
  );
};

export default SystemAdminHosts;
