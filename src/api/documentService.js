import api from './axiosConfig';

const listDocuments = () => api.get('/documents');
const getDocumentById = (id) => api.get(`/documents/${id}`);
const createDocument = (data) => api.post('/documents', data);
const updateDocument = (id, data) => api.put(`/documents/${id}`, data);
const deleteDocument = (id) => api.delete(`/documents/${id}`);

export default { listDocuments, getDocumentById, createDocument, updateDocument, deleteDocument };
