export default {
  namespaced: true,
  state: {
    cartItems: [], // Itens no carrinho de compras;
    customerInfo: null, // Informações do cliente (endereço, etc.);
    paymentMethod: null, // Método de pagamento escolhido;
    orders: [], // Lista de pedidos finalizados;
  },
  mutations: {
    // Adiciona um produto ao carrinho ou incrementa a quantidade
    ADD_TO_CART(state, product) {
      const existingProduct = state.cartItems.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      // Salva o carrinho no localStorage (não perder os produtos em caso de reload)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // Remove um produto do carrinho
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      // Atualiza o localStorage após remover o item
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    // Limpa o carrinho
    CLEAR_CART(state) {
      state.cartItems = [];
      // Remove o carrinho do localStorage
      localStorage.removeItem('cartItems');
    },
    // Define as informações do cliente (endereço de entrega, etc.)
    SET_CUSTOMER_INFO(state, customerInfo) {
      state.customerInfo = customerInfo;
    },
    // Define o método de pagamento
    SET_PAYMENT_METHOD(state, paymentMethod) {
      state.paymentMethod = paymentMethod;
    },
    // Adiciona um pedido à lista de pedidos
    ADD_ORDER(state, order) {
      state.orders.push(order);
    },
    // Restaura o carrinho do localStorage
    RESTORE_CART(state) {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        state.cartItems = JSON.parse(cartItems);
      }
    },
  },
  actions: {
    // Adiciona um produto ao carrinho
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    // Remove um produto do carrinho
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    // Limpa o carrinho
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    // Salva as informações do cliente
    saveCustomerInfo({ commit }, customerInfo) {
      commit('SET_CUSTOMER_INFO', customerInfo);
    },
    // Define o método de pagamento
    setPaymentMethod({ commit }, paymentMethod) {
      commit('SET_PAYMENT_METHOD', paymentMethod);
    },
    // Finaliza o pedido
    async placeOrder({ commit, state, dispatch }) {
      try {
        // Simula o processamento do pagamento
        const paymentSuccess = await dispatch('processPayment');
        if (paymentSuccess) {
          // Cria o pedido
          const order = {
            id: Date.now(), // ID único para o pedido
            items: state.cartItems,
            customerInfo: state.customerInfo,
            paymentMethod: state.paymentMethod,
            total: state.cartItems.reduce((total, item) => {
              const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
              return total + price * item.quantity;
            }, 0).toFixed(2),
            status: 'completed',
          };

          // Adiciona o pedido à lista de pedidos
          commit('ADD_ORDER', order);

          // Limpa o carrinho
          commit('CLEAR_CART');

          // Envia e-mail de confirmação
          await dispatch('sendOrderConfirmationEmail', order);

          return { success: true, order };
        } else {
          throw new Error('Pagamento falhou');
        }
      } catch (error) {
        // Envia e-mail de falha no pagamento
        await dispatch('sendPaymentFailureEmail', state.customerInfo.email);
        return { success: false, error: error.message };
      }
    },
    // Simula o processamento do pagamento
    processPayment() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true); // Simula um pagamento bem-sucedido
        }, 1000);
      });
    },
    // Simula o envio de e-mail de confirmação do pedido
    sendOrderConfirmationEmail({ state }, order) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`E-mail enviado para ${state.customerInfo.email}: Pedido #${order.id} confirmado!`);
          resolve(true);
        }, 1000);
      });
    },
    // Simula o envio de e-mail de falha no pagamento
    sendPaymentFailureEmail({ state }, email) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`E-mail enviado para ${email}: Falha no pagamento.`);
          resolve(true);
        }, 1000);
      });
    },
    // Restaura o carrinho do localStorage
    restoreCart({ commit }) {
      commit('RESTORE_CART');
    },
  },
  getters: {
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => {
      return state.cartItems
        .reduce((total, item) => {
          const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.')); 
          return total + price * item.quantity; 
        }, 0)
        .toFixed(2); 
    },
    cartItemCount: (state) => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0);
    },
    customerInfo: (state) => state.customerInfo,
    paymentMethod: (state) => state.paymentMethod,
    orders: (state) => state.orders,
  },
};