import React, { useEffect, useState } from 'react';
import { createHostHomestay, deleteHostHomestay, getHostHomestays, updateHostHomestay } from '../services/hostService';

const emptyForm = {
  name: '',
  address: '',
  city: '',
  description: '',
  pricePerNight: '',
  roomType: 'Standard',
  status: 'ACTIVE',
  imageUrl: '',
};

const HostHomestays = () => {
  const [homestays, setHomestays] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadHomestays = async () => {
    setLoading(true);
    try {
      const data = await getHostHomestays();
      setHomestays(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể tải danh sách homestay');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadHomestays(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const payload = { ...form, pricePerNight: Number(form.pricePerNight) || 0 };
      if (editingId) {
        await updateHostHomestay(editingId, payload);
        setSuccessMessage('Đã cập nhật homestay');
      } else {
        await createHostHomestay(payload);
        setSuccessMessage('Đã thêm homestay mới');
      }
      setForm(emptyForm);
      setEditingId('');
      await loadHomestays();
    } catch (error) {
      setErrorMessage(error.message || 'Không thể lưu homestay');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name || '',
      address: item.address || '',
      city: item.city || '',
      description: item.description || '',
      pricePerNight: item.pricePerNight || '',
      roomType: item.roomType || 'Standard',
      status: item.status || 'ACTIVE',
      imageUrl: item.imageUrl || '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteHostHomestay(id);
      setSuccessMessage('Đã xoá homestay');
      await loadHomestays();
    } catch (error) {
      setErrorMessage(error.message || 'Không thể xoá homestay');
    }
  };

  return (
  <div className="space-y-6">
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <h1 className="text-2xl font-semibold text-slate-900">Quản lý homestay</h1>
      <p className="mt-2 text-sm text-slate-600">Thêm, chỉnh sửa và quản lý danh sách homestay của bạn.</p>
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

    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">
          {editingId ? 'Chỉnh sửa homestay' : 'Thêm homestay mới'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Tên homestay"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Địa chỉ"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />

          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Thành phố"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />

          <textarea
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="3"
          />

          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Giá mỗi đêm"
            type="number"
            value={form.pricePerNight}
            onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
            required
          />

          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Loại phòng"
            value={form.roomType}
            onChange={(e) => setForm({ ...form, roomType: e.target.value })}
          />

          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <select
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </select>

          <div className="flex gap-3">
            <button
              className="rounded-xl bg-[#032452] px-4 py-3 text-white disabled:opacity-70"
              disabled={saving}
            >
              {saving ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm mới'}
            </button>

            {editingId && (
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-3 text-slate-700"
                onClick={() => {
                  setEditingId('');
                  setForm(emptyForm);
                }}
              >
                Huỷ
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Danh sách homestay</h2>

        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Đang tải...</p>
        ) : homestays.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Chưa có homestay nào.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {homestays.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      {item.city} • {Number(item.pricePerNight || 0).toLocaleString('vi-VN')} ₫/đêm
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {item.status}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    onClick={() => handleEdit(item)}
                  >
                    Sửa
                  </button>

                  <button
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default HostHomestays;
