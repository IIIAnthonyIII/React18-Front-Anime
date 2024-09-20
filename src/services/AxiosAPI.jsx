import axios from 'axios';
import environment from '../environment/environment';

// Configuración base de axios
const apiClient = axios.create({
  baseURL: environment.uri,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;