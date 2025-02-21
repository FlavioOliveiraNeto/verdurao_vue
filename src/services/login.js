import axios from 'axios';
import router from '@/router/router';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default {
  // Login
  login(cpf, password) {
    return api.post('/auth/login', { cpf, password });
  },

  // Cadastro
  register(userData) {
    return api.post('/auth/register', { user: userData });
  },

  // Solicitar redefinição de senha
  requestPasswordReset(email) {
    return api.post('/password_reset', { email });
  },

  // Validar token de redefinição de senha
  validateResetToken(token) {
    return api.get('/password_reset/validate_token', {
      params: { token },
    });
  },

  // Atualizar senha
  updatePassword(data) {
    return api.put('/password_reset', { user: data });
  },

  // Logout do usuário
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};