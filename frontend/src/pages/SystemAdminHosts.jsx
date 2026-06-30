import React, { useEffect, useState } from 'react';
import { getHostVerifications, reviewHostVerification } from '../services/adminService';

const SystemAdminHosts = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [processingId, setProcessingId] = useState('');

  const loadRequests = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await getHostVerifications();
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể tải danh sách xác minh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleReview = async (id, status) => {
    setProcessingId(id);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await reviewHostVerification(
        id,
        status,
        status === 'REJECTED' ? 'Không đủ hồ sơ' : ''
      );

      setSuccessMessage(
        status === 'APPROVED'
          ? 'Yêu cầu đã được duyệt.'
          : 'Yêu cầu đã bị từ chối.'
      );

      await loadRequests();
    } catch (error) {
      setErrorMessage(error.message || 'Không thể cập nhật yêu cầu.');
    } finally {
      setProcessingId('');
    }
  };

  const visibleRequests =
    filter === 'ALL'
      ? requests
      : requests.filter((request) => request.status === filter);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Duyệt chủ nhà</h1>
        <p className="mt-2 text-sm text-slate-600">
          Duyệt và quản lý yêu cầu host.
        </p>
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

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Danh sách yêu cầu xác minh
          </h2>

          <select
            className="rounded-xl border border-slate-200 px-4 py-3"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">Tất cả</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {loading ? (
          <p className="mt-4 text-sm text-slate-500">
            Đang tải danh sách xác minh...
          </p>
        ) : visibleRequests.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Chưa có yêu cầu xác minh nào.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-3 pr-4">Host</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Số điện thoại</th>
                  <th className="py-3 pr-4">Trạng thái</th>
                  <th className="py-3">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {visibleRequests.map((request) => (
                  <tr key={request.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-medium text-slate-900">
                      {request.fullName || 'N/A'}
                    </td>

                    <td className="py-3 pr-4">
                      {request.email || 'N/A'}
                    </td>

                    <td className="py-3 pr-4">
                      {request.phone || 'N/A'}
                    </td>

                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        {request.status || 'PENDING'}
                      </span>
                    </td>

                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          className="rounded-lg bg-emerald-600 px-3 py-2 text-white disabled:opacity-70"
                          disabled={
                            processingId === request.id ||
                            request.status === 'APPROVED'
                          }
                          onClick={() => handleReview(request.id, 'APPROVED')}
                        >
                          {processingId === request.id ? 'Đang xử lý...' : 'Approve'}
                        </button>

                        <button
                          className="rounded-lg bg-red-600 px-3 py-2 text-white disabled:opacity-70"
                          disabled={
                            processingId === request.id ||
                            request.status === 'REJECTED'
                          }
                          onClick={() => handleReview(request.id, 'REJECTED')}
                        >
                          Reject
                        </button>
                      </div>
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

export default SystemAdminHosts;