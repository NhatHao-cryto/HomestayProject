import React, { useState } from 'react';
import { submitHostVerification } from '../services/adminService';

const HostVerification = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [businessProofFile, setBusinessProofFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('fullName', form.fullName);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      if (documentFile) {
        formData.append('documentFile', documentFile);
      }
      if (businessProofFile) {
        formData.append('businessProofFile', businessProofFile);
      }

      await submitHostVerification(formData);
      setSuccessMessage('Yêu cầu xác minh đã được gửi thành công.');
      setForm({
        fullName: '',
        email: '',
        phone: '',
      });
      setDocumentFile(null);
      setBusinessProofFile(null);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể gửi yêu cầu xác minh.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="space-y-6">
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <h1 className="text-2xl font-semibold text-slate-900">Xác minh chủ sở hữu</h1>
      <p className="mt-2 text-sm text-slate-600">Tải lên giấy tờ xác minh để được duyệt.</p>
    </div>

    {successMessage && (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        {successMessage}
      </div>
    )}

    {errorMessage && (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {errorMessage}
      </div>
    )}

    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 space-y-4"
    >
      <input
        className="w-full rounded-xl border border-slate-200 px-4 py-3"
        placeholder="Họ và tên"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        required
      />

      <input
        className="w-full rounded-xl border border-slate-200 px-4 py-3"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        className="w-full rounded-xl border border-slate-200 px-4 py-3"
        placeholder="Số điện thoại"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />

      <div>
        <label className="mb-2 block text-sm text-slate-600">
          Ảnh/giấy tờ xác minh
        </label>
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-600">
          Giấy tờ kinh doanh
        </label>
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setBusinessProofFile(e.target.files?.[0] || null)}
        />
      </div>

      <button
        className="rounded-xl bg-[#032452] px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-70"
        disabled={loading}
      >
        {loading ? 'Đang gửi...' : 'Gửi xác minh'}
      </button>
    </form>
  </div>
);
};

export default HostVerification;
