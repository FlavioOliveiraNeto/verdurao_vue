import { createStore } from 'vuex';

export default createStore({
  state: {
    alertMessage: {
      text: '',
      type: '',
      visible: false,
    },
    cart: [],
  },
  mutations: {
    SHOW_MESSAGE(state, payload) {
      state.alertMessage = {
        text: payload.text,
        type: payload.type,
        visible: true,
      };
    },
    HIDE_MESSAGE(state) {
      state.alertMessage.visible = false;
    },
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },
  actions: {
    showMessage({ commit }, payload) {
      commit('SHOW_MESSAGE', payload);

      setTimeout(() => {
        commit('HIDE_MESSAGE');
      }, 5000);
    },
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    }
  },
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price, 0)
  }
});