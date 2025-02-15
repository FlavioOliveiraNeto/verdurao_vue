<template>
    <div v-if="visible" 
         :class="['fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white', 
                  type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ text }}
    </div>
</template>
  
<script>
  export default {
    name: "AlertMessage",
    props: {
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        validator: (value) => ['success', 'error'].includes(value),
      },
      visible: {
        type: Boolean,
        required: true,
      },
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