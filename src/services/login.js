import api from '@/services/axiosConfig'; // Importa a instância configurada do Axios

export default {
  // Login
  async login(cpf, password) {
    try {
      const response = await api.post('/auth/login', { cpf, password });
      // Salva o token e o usuário no localStorage após o login
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response;
    } catch (error) {
      throw error;
    }
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