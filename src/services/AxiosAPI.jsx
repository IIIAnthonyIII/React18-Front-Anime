import axios from 'axios';
import environment from '../environment/environment';

// Configuración base de axios
const apiClient = axios.create({
  baseURL: environment.uri,
  headers: {
    'Content-Type': 'application/json',
  },
});

let token = sessionStorage.getItem('token');

apiClient.interceptors.request.use(
  (config) => {
    if (!token) token = sessionStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;