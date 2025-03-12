export default {
    namespaced: true,
    state: {
        message: null, // { text: 'Mensagem de exemplo', type: 'success' }
        timeoutId: null, // ID do timeout para limpar a mensagem
    },
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload
        },
        CLEAR_MESSAGE(state) {
            state.message = null
        },
        SET_TIMEOUT_ID(state, timeoutId) {
            state.timeoutId = timeoutId
        },
        CLEAR_TIMEOUT(state) {
            if (state.timeoutId) {
              clearTimeout(state.timeoutId)
              state.timeoutId = null
            }
        },
    },
    actions: {
        showMessage({ commit, state }, payload) {
            // Limpa o timeout anterior, se existir
            commit('CLEAR_TIMEOUT')
        
            // Define a nova mensagem
            commit('SET_MESSAGE', payload)
        
            // Configura o timeout para limpar a mensagem após 5 segundos
            const timeoutId = setTimeout(() => {
              commit('CLEAR_MESSAGE')
            }, 5000)
        
            // Salva o ID do timeout
            commit('SET_TIMEOUT_ID', timeoutId)
        },
        clearMessage({ commit }) {
            commit('CLEAR_MESSAGE')
            commit('CLEAR_TIMEOUT')
        },
    },
    getters: {
        message: (state) => state.message,
    },
};
  