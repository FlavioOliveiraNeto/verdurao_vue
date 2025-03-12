<template>
  <transition name="alert">
    <div
      v-if="alertMessage"
      :class="[
        'fixed z-9999 top-4 right-4 p-4 rounded-lg shadow-lg text-white flex items-center justify-between',
        alertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
      role="alert"
    >
      <span>{{ alertMessage.text }}</span>
      <button
        @click="clearMessage"
        class="ml-4 p-1 rounded-full hover:bg-black/10 focus:outline-none"
        aria-label="Fechar"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('alertMessage', ['message']),
    alertMessage() {
      return this.message
    },
  },
  methods: {
    ...mapActions('alertMessage', ['clearMessage']),
  },
  watch: {
    alertMessage(newMessage) {
      if (newMessage) {
        // Fecha automaticamente após 5 segundos
        setTimeout(() => {
          this.clearMessage()
        }, 5000)
      }
    },
  },
}
</script>

<style scoped>
/* Animação de entrada */
.alert-enter-active {
  animation: slideIn 0.3s ease-out;
}

/* Animação de saída */
.alert-leave-active {
  animation: fadeOut 0.5s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
