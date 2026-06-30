const API_BASE_URL = 'http://localhost:8080/homestay';

const buildHeaders = (token, contentType) => {
  const headers = {};

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async (path, options = {}) => {
  const token = localStorage.getItem('authToken');
  const requestHeaders = options.headers || {};
  const contentType = requestHeaders['Content-Type'] || (typeof options.body === 'string' ? 'application/json' : undefined);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(token, contentType),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Yêu cầu thất bại');
  }

  return data?.result ?? data;
};

export const login = async (username, password) => {
  return request('/auth/token', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

export const submitHostVerification = async (formData) => {
  return request('/admin/host-verification', {
    method: 'POST',
    body: formData,
    headers: {},
  });
};

export const getHostVerifications = async () => {
  return request('/admin/host-verifications');
};

export const reviewHostVerification = async (id, status, rejectionReason) => {
  const query = new URLSearchParams({ status });
  if (rejectionReason) {
    query.append('rejectionReason', rejectionReason);
  }
  return request(`/admin/host-verifications/${id}?${query.toString()}`, {
    method: 'PUT',
  });
};
