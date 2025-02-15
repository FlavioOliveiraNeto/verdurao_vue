import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, 
});

export default {
  login(cpf, password) {
    return api.post('/auth/login', { cpf, password });
  },
  register(userData) {
    return api.post('/auth/register', { user: userData });
  },
};