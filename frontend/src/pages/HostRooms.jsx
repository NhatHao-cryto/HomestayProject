import React, { useEffect, useState } from 'react';
import { createHostRoom, deleteHostRoom, getHostRooms, updateHostRoom, updateHostRoomStatus } from '../services/hostService';

const emptyForm = {
  homestayId: '',
  roomName: '',
  roomType: 'Standard',
  price: '',
  capacity: '',
  status: 'AVAILABLE',
};

const HostRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await getHostRooms();
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể tải danh sách phòng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRooms(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const payload = { ...form, price: Number(form.price) || 0, capacity: Number(form.capacity) || 0 };
      if (editingId) {
        await updateHostRoom(editingId, payload);
        setSuccessMessage('Đã cập nhật phòng');
      } else {
        await createHostRoom(payload);
        setSuccessMessage('Đã thêm phòng mới');
      }
      setForm(emptyForm);
      setEditingId('');
      await loadRooms();
    } catch (error) {
      setErrorMessage(error.message || 'Không thể lưu phòng');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      homestayId: item.homestayId || '',
      roomName: item.roomName || '',
      roomType: item.roomType || 'Standard',
      price: item.price || '',
      capacity: item.capacity || '',
      status: item.status || 'AVAILABLE',
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteHostRoom(id);
      setSuccessMessage('Đã xoá phòng');
      await loadRooms();
    } catch (error) {
      setErrorMessage(error.message || 'Không thể xoá phòng');
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateHostRoomStatus(id, status);
      setSuccessMessage('Đã cập nhật trạng thái phòng');
      await loadRooms();
    } catch (error) {
      setErrorMessage(error.message || 'Không thể cập nhật trạng thái phòng');
    }
  };

  return (
  <div className="space-y-6">
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <h1 className="text-2xl font-semibold text-slate-900">Quản lý phòng</h1>
      <p className="mt-2 text-sm text-slate-600">Theo dõi các phòng trong từng homestay.</p>
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
          {editingId ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Homestay ID"
            value={form.homestayId}
            onChange={(e) => setForm({ ...form, homestayId: e.target.value })}
            required
          />

          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Tên phòng"
            value={form.roomName}
            onChange={(e) => setForm({ ...form, roomName: e.target.value })}
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
            placeholder="Giá"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Sức chứa"
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            required
          />

          <select
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="RENTED">RENTED</option>
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
        <h2 className="text-lg font-semibold text-slate-900">Danh sách phòng</h2>

        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Đang tải...</p>
        ) : rooms.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Chưa có phòng nào.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {rooms.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.roomName}</p>
                    <p className="text-sm text-slate-500">
                      {item.roomType} • {item.capacity} người •{' '}
                      {Number(item.price || 0).toLocaleString('vi-VN')} ₫
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {item.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
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

                  <button
                    className="rounded-lg border border-emerald-200 px-3 py-2 text-sm text-emerald-600"
                    onClick={() =>
                      handleStatus(
                        item.id,
                        item.status === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE'
                      )
                    }
                  >
                    Đổi trạng thái
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

export default HostRooms;
