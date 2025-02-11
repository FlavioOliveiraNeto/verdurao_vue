<template>
    <div class="grid grid-rows items-center justify-items-center">
        <div class="grid mx-auto mt-[5rem] mb-[1rem]">
            <p class="text-white font-black text-5xl">Verdurão Center</p>
        </div>
        <div v-if="!showLoginForm" class="mx-auto my-auto flex max-w-4x1 items-center gap-x-10 rounded-xl p-6">
            <div class="mouse-cursor-gradient-tracking flex items-center justify-center w-80 h-100 rounded-lg shadow-lg bg-sky-900 hover:bg-sky-700 
                        cursor-pointer transition-colors duration-300" 
                @click="showLogin('admin')"
                @mousemove="handleMouseMove($event, 'admin')" 
                @mouseleave="handleMouseLeave('admin')" 
                :style="adminStyle">
              <p class="relative z-10 font-bold text-white pointer-events-none">Administrador</p>
            </div>
        
            <div class="mouse-cursor-gradient-tracking flex items-center justify-center w-80 h-100 rounded-lg shadow-lg bg-green-800 hover:bg-green-600 
                      cursor-pointer transition-colors duration-300"
                @click="showLogin('cliente')"
                @mousemove="handleMouseMove($event, 'cliente')"
                @mouseleave="handleMouseLeave('cliente')"
                :style="clienteStyle">
              <p class="relative z-10 font-bold text-white pointer-events-none">Cliente</p>
            </div>
        </div>
        <div v-else class="login-form p-6 rounded-xl shadow-lg bg-gray-800">
          <p class="text-white text-xl font-bold mb-4">Login de {{ loginType }}</p>
          <input v-model="loginData.username" type="text" placeholder="Usuário" class="w-full p-2 mb-2 rounded bg-gray-700 text-white">
          <input v-model="loginData.password" type="password" placeholder="Senha" class="w-full p-2 mb-4 rounded bg-gray-700 text-white">
          <button @click="login" class="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Entrar</button>
          <button @click="showLoginForm = false" class="w-full p-2 mt-2 bg-red-500 hover:bg-red-600 text-white rounded">Voltar</button>
        </div>
    </div>
</template>
  
<script>
  export default {
    name: "UserCards",
    data() {
      return {
        adminStyle: {},
        clienteStyle: {},
        showLoginForm: false,
        loginType: '',
        loginData: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      handleMouseMove(event, card) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const style = {
          '--x': `${x}px`,
          '--y': `${y}px`,
          '--size': '200px'
        };
        if (card === 'admin') {
          this.adminStyle = style;
        } else {
          this.clienteStyle = style;
        }
      },
      handleMouseLeave(card) {
        if (card === 'admin') {
          this.adminStyle = { '--size': '0' };
        } else {
          this.clienteStyle = { '--size': '0' };
        }
      },
      showLogin(type) {
        this.loginType = type === 'admin' ? 'Administrador' : 'Cliente';
        this.showLoginForm = true;
      },
      login() {
        if (this.loginData.username && this.loginData.password) {
          if (this.loginType === 'Administrador') {
            this.$router.push('/admin-dashboard');
          } else {
            this.$router.push('/cliente-dashboard');
          }
        } else {
          alert('Por favor, preencha todos os campos.');
        }
      }
    }
  };
</script>
  
<style scoped>
  .mouse-cursor-gradient-tracking {
    position: relative;
    overflow: hidden;

    p {
      font-size: 1.6rem;
    }
  }
  
  .mouse-cursor-gradient-tracking::before {
    content: '';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle closest-side, rgba(255, 255, 255, 0.2), transparent);
    transform: translate(-50%, -50%);
    transition: none;
  }

  .grid-rows {
    grid-template-rows: .05fr .95fr;
  }
</style>