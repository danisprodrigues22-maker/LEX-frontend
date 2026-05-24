import axios from 'axios';
import { removeToken } from '../utils/storage';
import { toast } from '../utils/toast';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

let isRedirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;
      removeToken();
      toast.error('Sessão expirada. Faça login novamente.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;