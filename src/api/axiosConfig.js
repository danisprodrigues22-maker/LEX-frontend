import axios from 'axios';

// O "api" agora aponta para a URL base CORRETA,
// incluindo o /api
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// O interceptor de token continua igual
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lex-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;