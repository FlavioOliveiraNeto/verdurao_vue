import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do seu backend
  withCredentials: true,
});

// Interceptor para adicionar o token ao cabeçalho de todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Recupera o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;