const API_BASE_URL = 'http://localhost:8080/homestay';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || 'Yêu cầu thất bại');
  }

  return data?.result ?? data;
};

export const getHostHomestays = () => request('/host/homestays');
export const createHostHomestay = (payload) => request('/host/homestays', { method: 'POST', body: JSON.stringify(payload) });
export const updateHostHomestay = (id, payload) => request(`/host/homestays/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteHostHomestay = (id) => request(`/host/homestays/${id}`, { method: 'DELETE' });

export const getHostRooms = () => request('/host/rooms');
export const createHostRoom = (payload) => request('/host/rooms', { method: 'POST', body: JSON.stringify(payload) });
export const updateHostRoom = (id, payload) => request(`/host/rooms/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteHostRoom = (id) => request(`/host/rooms/${id}`, { method: 'DELETE' });
export const updateHostRoomStatus = (id, status) => request(`/host/rooms/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PUT' });

export const getSystemBookings = () => request('/system/bookings');
export const updateSystemBookingStatus = (id, status) => request(`/system/bookings/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PUT' });
