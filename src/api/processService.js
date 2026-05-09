import api from './axiosConfig';

const listProcesses = ({ page = 1, limit = 20 } = {}) =>
  api.get('/processes', { params: { page, limit } });
const getProcessById = (id) => api.get(`/processes/${id}`);
const createProcess = (data) => api.post('/processes', data);
const updateProcess = (id, data) => api.put(`/processes/${id}`, data);
const deleteProcess = (id) => api.delete(`/processes/${id}`);

export default { listProcesses, getProcessById, createProcess, updateProcess, deleteProcess };
