const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function fetchJson(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    let errorDetail = `Request failed: ${response.statusText}`;
    try {
      const errJson = await response.json();
      errorDetail = errJson.detail || errorDetail;
    } catch (e) {
      // fallback
    }
    throw new Error(errorDetail);
  }
  return response.json();
}

export const api = {
  // Products
  getProducts: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.category_slug) searchParams.append('category_slug', params.category_slug);
    if (params.category_id) searchParams.append('category_id', params.category_id);
    if (params.search) searchParams.append('search', params.search);
    if (params.featured !== undefined) searchParams.append('featured', params.featured);
    if (params.sort_by) searchParams.append('sort_by', params.sort_by);
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return fetchJson(`/products${query}`);
  },

  getProduct: (id) => fetchJson(`/products/${id}`),

  createProduct: (data) => fetchJson('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateProduct: (id, data) => fetchJson(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteProduct: (id) => fetchJson(`/products/${id}`, {
    method: 'DELETE',
  }),

  // Categories
  getCategories: () => fetchJson('/categories'),

  // Apartments
  getApartments: () => fetchJson('/apartments'),
  getApartment: (id) => fetchJson(`/apartments/${id}`),
  createApartment: (data) => fetchJson('/apartments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Batches
  getBatches: () => fetchJson('/batches'),
  getCurrentBatch: () => fetchJson('/batches/current'),
  createBatch: (data) => fetchJson('/batches', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateBatchStatus: (id, status) => fetchJson(`/batches/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PUT',
  }),

  // Orders
  createOrder: (orderData) => fetchJson('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),

  getOrders: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.apartment_id) searchParams.append('apartment_id', params.apartment_id);
    if (params.batch_id) searchParams.append('batch_id', params.batch_id);
    if (params.status) searchParams.append('status', params.status);
    if (params.search) searchParams.append('search', params.search);
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return fetchJson(`/orders${query}`);
  },

  trackOrder: (identifier) => fetchJson(`/orders/track/${encodeURIComponent(identifier)}`),

  getOrder: (id) => fetchJson(`/orders/${id}`),

  updateOrderStatus: (id, order_status) => fetchJson(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ order_status }),
  }),

  updatePaymentStatus: (id, payment_status, upi_reference = null) => fetchJson(`/orders/${id}/payment`, {
    method: 'PUT',
    body: JSON.stringify({ payment_status, upi_reference }),
  }),

  // Admin Specific
  getDashboardStats: (batchId = null) => {
    const query = batchId ? `?batch_id=${batchId}` : '';
    return fetchJson(`/admin/stats${query}`);
  },

  getCombinedDemandSummary: (batchId = null, apartmentId = null) => {
    const searchParams = new URLSearchParams();
    if (batchId) searchParams.append('batch_id', batchId);
    if (apartmentId) searchParams.append('apartment_id', apartmentId);
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return fetchJson(`/admin/demand-summary${query}`);
  },

  getPackingSlips: (batchId = null, apartmentId = null, status = null) => {
    const searchParams = new URLSearchParams();
    if (batchId) searchParams.append('batch_id', batchId);
    if (apartmentId) searchParams.append('apartment_id', apartmentId);
    if (status) searchParams.append('order_status', status);
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return fetchJson(`/admin/packing-slips${query}`);
  },

  batchBulkUpdateStatus: (batchId, fromStatus, toStatus) => fetchJson(
    `/admin/batch-bulk-update-status?batch_id=${batchId}&from_status=${encodeURIComponent(fromStatus)}&to_status=${encodeURIComponent(toStatus)}`,
    { method: 'POST' }
  ),

  // Auth
  adminLogin: (credentials) => fetchJson('/auth/admin-login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  residentLogin: (data) => fetchJson('/auth/resident-login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};
