import { createStore } from 'vuex';

export default createStore({
  state: {
    alertMessage: {
      text: '',
      type: '',
      visible: false,
    },
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
  },
  actions: {
    showMessage({ commit }, payload) {
      commit('SHOW_MESSAGE', payload);

      setTimeout(() => {
        commit('HIDE_MESSAGE');
      }, 5000);
    },
  },
});