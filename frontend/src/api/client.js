const API_BASE = '/homestay';

async function parseResponse(response) {
  const text = await response.text();
  if (!text) {
    throw new Error('Không nhận được phản hồi từ server. Hãy kiểm tra backend đã chạy chưa (port 8081).');
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Server trả về dữ liệu không hợp lệ. Kiểm tra backend và kết nối database.');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Đã xảy ra lỗi');
  }
  return data.result;
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  return parseResponse(response);
}

export function getStoredUser() {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function requireUser(navigate) {
  const user = getStoredUser();
  if (!user?.id) {
    navigate('/dang-nhap');
    return null;
  }
  return user;
}

export const homestayApi = {
  list: (params = {}) => {
    const query = new URLSearchParams();
    if (params.location) query.set('location', params.location);
    if (params.maxPrice) query.set('maxPrice', params.maxPrice);
    if (params.minStars) query.set('minStars', params.minStars);
    const qs = query.toString();
    return apiFetch(`/homestays${qs ? `?${qs}` : ''}`);
  },
  detail: (id) => apiFetch(`/homestays/${id}`),
};

export const bookingApi = {
  create: (payload) =>
    apiFetch('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  pay: (bookingId, paymentMethod) =>
    apiFetch(`/bookings/${bookingId}/pay`, {
      method: 'POST',
      body: JSON.stringify({ paymentMethod }),
    }),
  list: (userId, status) => {
    const query = new URLSearchParams({ userId });
    if (status && status !== 'Tất cả') query.set('status', status);
    return apiFetch(`/bookings?${query}`);
  },
  detail: (idOrCode) => apiFetch(`/bookings/${idOrCode}`),
};

export const authApi = {
  login: (username, password) =>
    apiFetch('/auth/log-in', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  register: (payload) =>
    apiFetch('/users', { method: 'POST', body: JSON.stringify(payload) }),
};

export const PAYMENT_METHOD_MAP = {
  credit_card: 'CREDIT_CARD',
  wallet: 'E_WALLET',
  bank: 'BANK_TRANSFER',
  checkin: 'PAY_AT_CHECKIN',
};
