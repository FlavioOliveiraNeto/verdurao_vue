<template>
  <div class="grid grid-rows items-center justify-items-center">
    
    <!-- TÍTULO -->
    <div class="flex gap-5 mx-auto mt-[5rem] mb-[1rem]">
      <button @click="windowBackTo" class="w-fit mt-2 text-black hover:underline cursor-pointer text-start">
        <img src="@/assets/images/casa.png" alt="Home" class="w-6 h-6 hover:p-0.5">
      </button>
      <p class="text-black font-black text-4xl">Escolha uma das opções:</p>
    </div>

    <!-- CARDS DE ESCOLHA -->
    <div v-if="!showLoginForm && !showRegisterForm && !showForgotPasswordForm" class="h-max w-182 mx-auto my-auto flex items-center gap-x-10 rounded-xl p-6">
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
    <LoginForm v-if="showLoginForm" :type="loginType" @back="backTo" @show-register="showRegister" @forgot-password="showForgotPassword" @login="login"/>

    <!-- Formulário de Cadastro -->
    <RegisterForm v-if="showRegisterForm" :type="registerType" @back="backTo" @register="register"/>

    <!-- Formulário de Esqueci Minha Senha -->
    <ForgotPasswordForm v-if="showForgotPasswordForm" :type="loginType" @back="backTo" @submitForgotPassword="submitForgotPassword"/>
  </div>
</template>

<script>
  import LoginForm from '@/components/login/LoginForm.vue';
  import RegisterForm from '@/components/login/RegisterForm.vue';
  import ForgotPasswordForm from '@/components/login/ForgotPasswordForm.vue';
  import LoginApi from "@/services/login";

  export default {
    name: "UserCards",
    components: {
      LoginForm,
      RegisterForm,
      ForgotPasswordForm
    },
    data() {
      return {
        adminStyle: {},
        clienteStyle: {},
        showLoginForm: false,
        showRegisterForm: false,
        showForgotPasswordForm: false,
        loginType: '',
        registerType: '',
      };
    },
    methods: {
      windowBackTo() {
        history.back();
      },
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
        this.showForgotPasswordForm = false;
      },
      showRegister(type) {
        this.registerType = type === 'admin' ? 'admin' : 'customer';
        this.showRegisterForm = true;
        this.showLoginForm = false;
        this.showForgotPasswordForm = false;
      },
      showForgotPassword() {
        this.showForgotPasswordForm = true;
        this.showLoginForm = false;
        this.showRegisterForm = false;
      },
      backTo() {
        if(this.showLoginForm) {
          this.showLoginForm = false;
          this.showRegisterForm = false;
          this.showForgotPasswordForm = false;
        } else if(this.showRegisterForm) {
          this.showLoginForm = true;
          this.showRegisterForm = false;
          this.showForgotPasswordForm = false;
        } else {
          this.showLoginForm = true;
          this.showRegisterForm = false;
          this.showForgotPasswordForm = false;
        }
      },
      async login(loginData) {
        if (loginData.cpf && loginData.password) {
          try {
            const response = await LoginApi.login(loginData.cpf, loginData.password);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.data.user.role === 'admin') {
              this.$router.push('/admin-dashboard');
            } else {
              this.$router.push('/cliente-dashboard');
            }
          } catch (error) {
            this.$store.dispatch('showMessage', {
              text: 'Login falhou: '  + error.response.data.error,
              type: 'error',
            });
          }
        } else {
          this.$store.dispatch('showMessage', {
            text: 'Por favor, preencha todos os campos.',
            type: 'error',
          });
        }
      },
      async register(registerData) {
        if (registerData.name && registerData.email && registerData.cpf && registerData.password) {
          try {
            const response = await LoginApi.register({
              ...registerData,
              role: this.registerType.toLowerCase()
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            this.$store.dispatch('showMessage', {
              text: 'Cadastro realizado com sucesso para ' + this.registerType + '!',
              type: 'success',
            });

            this.registerData = {
              name: '',
              email: '',
              cpf: '',
              password: ''
            }

            this.showRegisterForm = false;
            this.showLoginForm = true;
          } catch (error) {
            this.$store.dispatch('showMessage', {
              text: 'Cadastro falhou: ' + error.response.data.error,
              type: 'error',
            });
          }
        } else {
          this.$store.dispatch('showMessage', {
            text: 'Por favor, preencha todos os campos.',
            type: 'error',
          });
        }
      },
      async submitForgotPassword(forgotPasswordData) {
        if(forgotPasswordData.email) {
          try {
            await LoginApi.requestPasswordReset(forgotPasswordData.email)
            this.$store.dispatch('showMessage', {
              text: 'Email de recuperação enviado.',
              type: 'success',
            });
            this.backTo()
          } catch (error) {
            this.$store.dispatch('showMessage', {
              text: error.response.error,
              type: 'error',
            });
          }
        } else {
          this.$store.dispatch('showMessage', {
            text: 'Por favor, preencha todos os campos.',
            type: 'error',
          });
        }
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