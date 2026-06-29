import React, { useEffect, useState } from 'react';
import HostAdminLayout from '../components/HostAdminLayout';

const HostVerification = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    documentUrl: '',
    businessProofUrl: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Verification request submitted.');
  };

  return (
    <HostAdminLayout>
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Xác minh chủ sở hữu</h1>
          <p className="mt-2 text-sm text-slate-600">Tải lên giấy tờ xác minh để được duyệt.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-4">
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Họ và tên" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Đường dẫn giấy tờ" value={form.documentUrl} onChange={(e) => setForm({ ...form, documentUrl: e.target.value })} />
          <input className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Đường dẫn giấy tờ kinh doanh" value={form.businessProofUrl} onChange={(e) => setForm({ ...form, businessProofUrl: e.target.value })} />
          <button className="rounded-xl bg-[#032452] px-4 py-3 text-white">Gửi xác minh</button>
        </form>
      </div>
    </HostAdminLayout>
  );
};

export default HostVerification;
