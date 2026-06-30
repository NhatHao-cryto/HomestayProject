import React, { useEffect, useState } from 'react';
import { getSystemBookings, updateSystemBookingStatus } from '../services/hostService';

const SystemAdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getSystemBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể tải booking');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBookings(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateSystemBookingStatus(id, status);
      setSuccessMessage('Đã cập nhật trạng thái booking');
      await loadBookings();
    } catch (error) {
      setErrorMessage(error.message || 'Không thể cập nhật booking');
    }
  };

  const visible = filter === 'ALL' ? bookings : bookings.filter((item) => item.status === filter);

  return (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Quản lý booking</h1>
      <p className="text-slate-500 mt-2">Theo dõi và cập nhật trạng thái đơn đặt phòng.</p>
    </div>

    {successMessage && (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
        {successMessage}
      </div>
    )}

    {errorMessage && (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
        {errorMessage}
      </div>
    )}

    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Danh sách booking</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 bg-white"
        >
          <option value="ALL">Tất cả</option>
          <option value="PENDING">Đang chờ</option>
          <option value="CONFIRMED">Đã xác nhận</option>
          <option value="CANCELLED">Đã hủy</option>
          <option value="COMPLETED">Hoàn thành</option>
        </select>
      </div>

      {loading ? (
        <p className="text-slate-500">Đang tải booking...</p>
      ) : visible.length === 0 ? (
        <p className="text-slate-500">Không có booking nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 px-3">Khách hàng</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Homestay</th>
                <th className="py-3 px-3">Phòng</th>
                <th className="py-3 px-3">Ngày nhận</th>
                <th className="py-3 px-3">Ngày trả</th>
                <th className="py-3 px-3">Tổng tiền</th>
                <th className="py-3 px-3">Trạng thái</th>
                <th className="py-3 px-3">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {visible.map((booking) => (
                <tr key={booking.id} className="border-b border-slate-100">
                  <td className="py-3 px-3 font-medium text-slate-900">
                    {booking.customerName}
                  </td>
                  <td className="py-3 px-3">{booking.customerEmail}</td>
                  <td className="py-3 px-3">{booking.homestayName}</td>
                  <td className="py-3 px-3">{booking.roomName}</td>
                  <td className="py-3 px-3">{booking.checkInDate}</td>
                  <td className="py-3 px-3">{booking.checkOutDate}</td>
                  <td className="py-3 px-3">
                    {Number(booking.totalPrice || 0).toLocaleString('vi-VN')} đ
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700">
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);
};

export default SystemAdminBookings;
