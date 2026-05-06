import api from './axiosConfig';

const listPayments = () => api.get('/payments');
const getPaymentById = (id) => api.get(`/payments/${id}`);
const createPayment = (data) => api.post('/payments', data);
const updatePayment = (id, data) => api.put(`/payments/${id}`, data);
const removePayment = (id) => api.delete(`/payments/${id}`);

export default { listPayments, getPaymentById, createPayment, updatePayment, removePayment };
