import axios from 'axios';
import environment from '../environment/environment';

// Configuración base de axios
const apiClient = axios.create({
  baseURL: environment.uri,
  headers: {
    'Content-Type': 'application/json',
  },
});

const logIn = async (loginData) => {
  try {
    const response = await apiClient.post('auth/login', loginData);
    return response;
  }catch (error){
    return error;
  }
}

export default {
  logIn
};