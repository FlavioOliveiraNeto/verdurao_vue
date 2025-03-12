import api from '@/services/axiosConfig'; // Importa a instância configurada do Axios

export default {
  // Criar pedido
  createOrder(orderData) {
    return api.post('/api/orders', { orderData });
  },
};