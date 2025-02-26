<template>
    <div v-if="alertMessage.visible" 
         :class="['fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white', 
                  alertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ alertMessage.text }}
    </div>
</template>
  
<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['alertMessage']),
    },
  };
</script>
  
<style scoped>
  /* Animação para aparecer e desaparecer */
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
  
  .fixed {
    animation: slideIn 0.3s ease-out;
    z-index: 1000; /* Garante que a mensagem fique acima de tudo */
  }
  
  .fixed.hide {
    animation: fadeOut 0.5s ease-out;
  }
</style>