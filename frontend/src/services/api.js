import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const productsAPI = {
    getAll: (params) => api.get('/products', { params }),
    getOne: (id) => api.get(`/products/${id}`),
};

export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getUsers: () => api.get('/admin/users'),
    getBuilds: () => api.get('/admin/builds'),
    getOrders: () => api.get('/admin/orders'),
    updateOrderStatus: (id, statusData) => api.put(`/admin/orders/${id}/status`, statusData),
    createProduct: (productData) => api.post('/admin/products', productData),
    updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
    deleteProduct: (id) => api.delete(`/admin/products/${id}`),
};

export const buildsAPI = {
    checkCompatibility: (data) => api.post('/builds/check-compatibility', data),
    save: (buildData) => api.post('/builds', buildData),
    getUserBuilds: (userId) => api.get(`/builds/user/${userId}`),
};

export const cartAPI = {
    get: (userId) => api.get(`/cart/${userId}`),
    add: (data) => api.post('/cart', data),
    update: (userId, productId, quantity) => api.put(`/cart/${userId}/item/${productId}`, { quantity }),
    remove: (userId, productId) => api.delete(`/cart/${userId}/item/${productId}`),
    clear: (userId) => api.delete(`/cart/${userId}`),
};

export const paymentAPI = {
    createOrder: (orderData) => api.post('/payment/create', orderData),
    verifyPayment: (paymentData) => api.post('/payment/verify', paymentData),
    getMyOrders: (userId) => api.get(`/payment/user/${userId}`),
};
