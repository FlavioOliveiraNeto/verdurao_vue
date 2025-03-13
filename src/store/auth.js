export default {
    namespaced: true,
    state: {
      user: JSON.parse(localStorage.getItem('user')) || null, // Armazena as informações do usuário logado
      token: localStorage.getItem('token') || null, // Armazena o token do usuário
    },
    mutations: {
      // Define o usuário logado e salva no localStorage
      SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      },
      // Define o token de autenticação
      SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
      },
      // Limpa as informações do usuário (logout)
      CLEAR_USER(state) {
        state.user = null;
        state.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      },
    },
    actions: {
      // Ação para fazer login e armazenar o usuário no Vuex
      login({ commit }, { user, token }) {
        commit('SET_USER', user);
        commit('SET_TOKEN', token);
      },
      // Ação para fazer logout
      logout({ commit }) {
        commit('CLEAR_USER');
      },
      // Inicializa o Vuex restaurando o usuário e o token do localStorage
      initializeStore({ commit }) {
        return new Promise((resolve) => {
          const user = JSON.parse(localStorage.getItem('user'));
          const token = localStorage.getItem('token');
          if (user && token) {
            commit('SET_USER', user);
            commit('SET_TOKEN', token);
          }
          resolve();
        });
      },
    },
    getters: {
      // Retorna as informações do usuário logado
      user: (state) => state.user,
      // Retorna o token do usuário
      token: (state) => state.token,
      // Verifica se o usuário está autenticado (TRUE ou FALSE)
      isAuthenticated: (state) => !!state.token,
    },
};
  