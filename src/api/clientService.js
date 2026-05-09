import api from './axiosConfig';

const getAllClients = ({ page = 1, limit = 20 } = {}) =>
  api.get('/clients', { params: { page, limit } });

const getClientById = (id) => api.get(`/clients/${id}`);

const createClient = (data) => api.post('/clients', data);

const updateClient = (id, data) => api.put(`/clients/${id}`, data);

const deleteClient = (id) => api.delete(`/clients/${id}`);

export default { getAllClients, getClientById, createClient, updateClient, deleteClient };
