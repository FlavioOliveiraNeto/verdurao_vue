<template>
  <div class="grid grid-rows items-center justify-items-center">
      <!-- ALERTAS DE MENSAGENS -->
      <AlertMessage :text="message.text" :type="message.type" :visible="message.visible" />

      <!-- TÍTULO -->
      <div class="grid mx-auto mt-[5rem] mb-[1rem]">
          <p class="text-white font-black text-5xl">Verdurão Center</p>
      </div>

      <!-- CARDS DE ESCOLHA -->
      <div v-if="!showLoginForm && !showRegisterForm" class="h-max w-182 mx-auto my-auto flex items-center gap-x-10 rounded-xl p-6">
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
              @click="showLogin('customer')"
              @mousemove="handleMouseMove($event, 'customer')"
              @mouseleave="handleMouseLeave('customer')"
              :style="clienteStyle">
            <p class="relative z-10 font-bold text-white pointer-events-none">Cliente</p>
          </div>
      </div>

      <!-- Formulário de Login -->
      <div v-else-if="showLoginForm" class="h-max w-182 mx-auto my-auto items-center gap-x-10 rounded-xl p-6">
        <div :class="loginType === 'admin' ? 'bg-sky-900' : 'bg-green-800'" class="grid rounded-lg shadow-lg py-5 px-7 gap-y-2">
          <button @click="backTo" class="w-fit mt-2 text-white hover:underline cursor-pointer text-start">Voltar</button>
          <p class="text-white text-xl font-bold w-fit place-self-center mb-[1rem]">Login de {{ loginType }}</p>
          <div class="grid gap-y-2 mb-[1rem]">
            <input v-model="loginData.cpf" v-mask="'###.###.###-##'" type="text" placeholder="CPF" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
            <input v-model="loginData.password" type="password" placeholder="Digite sua senha" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
            <div class="flex justify-between">
              <button @click="showRegister(loginType)" class="w-fit mt-2 text-white hover:underline cursor-pointer text-start">Criar cadastro</button>
              <button @click="forgotPassword(loginType)" class="w-fit mt-2 text-white hover:underline cursor-pointer text-start">Esqueci minha senha</button>
            </div>
          </div>
          <button @click="login" :class="loginType === 'admin' ? 'bg-blue-500 hover:bg-blue-600' : ' bg-green-500 hover:bg-green-600'" 
                                class="w-[7rem] p-2 bg-blue-500 hover:bg-blue-600 text-white rounded place-self-center cursor-pointer">Entrar</button>
        </div>
      </div>

      <!-- Formulário de Cadastro -->
      <div v-else-if="showRegisterForm" class="h-max w-182 mx-auto my-auto items-center gap-x-10 rounded-xl p-6">
        <div :class="registerType === 'admin' ? 'bg-sky-900' : 'bg-green-800'" class="grid rounded-lg shadow-lg py-5 px-7 gap-y-2">
          <button @click="backTo" class="w-fit mt-2 text-white hover:underline cursor-pointer text-start">Voltar</button>
          <p class="text-white text-xl font-bold w-fit place-self-center mb-[1rem]">Cadastro de {{ registerType }}</p>
          <div class="grid gap-y-2 mb-[1rem]">
            <input v-model="registerData.name" type="text" placeholder="Nome completo" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
            <input v-model="registerData.email" type="email" placeholder="E-mail" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
            <input v-model="registerData.cpf" v-mask="'###.###.###-##'" type="text" placeholder="CPF" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
            <input v-model="registerData.password" type="password" placeholder="Senha" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
          </div>
          <button @click="register" :class="loginType === 'admin' ? 'bg-blue-500 hover:bg-blue-600' : ' bg-green-500 hover:bg-green-600'" 
                  class="w-[7rem] p-2 bg-blue-500 hover:bg-blue-600 text-white rounded place-self-center cursor-pointer">Cadastrar</button>
        </div>
      </div>
  </div>
</template>

<script>
  import LoginApi from "@/services/login";
  import { mask } from 'vue-the-mask';
  import AlertMessage from "@/components/AlertMessage.vue";

  export default {
    name: "UserCards",
    directives: {
      mask
    },
    components: {
      AlertMessage,
    },
    data() {
      return {
        adminStyle: {},
        clienteStyle: {},
        showLoginForm: false,
        showRegisterForm: false,
        loginType: '',
        registerType: '',
        loginData: {
          cpf: '',
          password: ''
        },
        registerData: {
          name: '',
          email: '',
          cpf: '',
          password: ''
        },
        message: {
          text: '',
          type: '',
          visible: false
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
        this.loginType = type === 'admin' ? 'admin' : 'customer';
        this.showLoginForm = true;
        this.showRegisterForm = false;
      },
      showRegister(type) {
        this.registerType = type;
        this.showRegisterForm = true;
        this.showLoginForm = false;
      },
      backTo() {
        if (this.showLoginForm == true) {
          this.showLoginForm = false;
        } else if (this.showRegisterForm == true) {
          this.showLoginForm = true;
          this.showRegisterForm = false;
        }
      },
      async login() {
        if (this.loginData.cpf && this.loginData.password) {
          try {
            const response = await LoginApi.login(this.loginData.cpf, this.loginData.password);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.data.user.role === 'admin') {
              this.$router.push('/admin-dashboard');
            } else {
              this.$router.push('/cliente-dashboard');
            }
          } catch (error) {
            this.showMessage('Login falhou: ' + error.response.data.error, 'error');
          }
        } else {
          this.showMessage('Por favor, preencha todos os campos.', 'error');
        }
      },
      async register() {
        if (this.registerData.name && this.registerData.email && this.registerData.cpf && this.registerData.password) {
          try {
            const response = await LoginApi.register({
              ...this.registerData,
              role: this.registerType.toLowerCase()
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.showMessage('Cadastro realizado com sucesso para ' + this.registerType + '!', 'success');

            this.registerData = {
              name: '',
              email: '',
              cpf: '',
              password: ''
            }

            this.showRegisterForm = false;
            this.showLoginForm = true;
          } catch (error) {
            this.showMessage('Cadastro falhou: ' + error.response.data.error, 'error');
          }
        } else {
          this.showMessage('Por favor, preencha todos os campos.', 'error');
        }
      },
      forgotPassword(type) {
        this.showMessage('Recuperação de senha para ' + type, 'success');
      },
      showMessage(text, type) {
        this.message.text = text;
        this.message.type = type;
        this.message.visible = true;

        setTimeout(() => {
          this.message.visible = false;
        }, 5000);
      },
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