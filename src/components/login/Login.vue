<template>
  <div class="grid grid-rows items-center justify-items-center">
    <!-- TÍTULO -->
    <div class="flex gap-5 mx-auto mt-[5rem] mb-[1rem]">
      <router-link
        to="/home"
        class="w-fit mt-2 text-black hover:underline cursor-pointer self-center"
      >
        <img src="@/assets/images/casa.png" alt="Home" class="w-6 h-6 hover:p-0.5" />
      </router-link>
      <p class="text-black font-black text-4xl">Escolha uma das opções:</p>
    </div>

    <!-- CARDS DE ESCOLHA -->
    <div
      v-if="!showLoginForm && !showRegisterForm && !showForgotPasswordForm"
      class="h-max w-182 mx-auto my-auto flex items-center gap-x-10 rounded-xl p-6"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="mouse-cursor-gradient-tracking flex items-center justify-center w-80 h-100 rounded-lg shadow-lg cursor-pointer transition-colors duration-300"
        :class="card.class"
        @click="showLogin(card.type)"
        @mousemove="handleMouseMove($event, card.type)"
        @mouseleave="handleMouseLeave(card.type)"
        :style="card.type === 'admin' ? adminStyle : clienteStyle"
      >
        <p class="relative z-10 font-bold text-white pointer-events-none">{{ card.label }}</p>
      </div>
    </div>

    <!-- Formulário de Login -->
    <LoginForm
      v-if="showLoginForm"
      :type="loginType"
      @back="backTo"
      @show-register="showRegister"
      @forgot-password="showForgotPassword"
      @login="handleLogin"
    />

    <!-- Formulário de Cadastro -->
    <RegisterForm
      v-if="showRegisterForm"
      :type="registerType"
      @back="backTo"
      @register="handleRegister"
    />

    <!-- Formulário de Esqueci Minha Senha -->
    <ForgotPasswordForm
      v-if="showForgotPasswordForm"
      :type="loginType"
      @back="backTo"
      @submitForgotPassword="handleForgotPassword"
    />
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import ForgotPasswordForm from '@/components/login/ForgotPasswordForm.vue'
import LoginApi from '@/services/login'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserCards',
  components: {
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
  },
  data() {
    return {
      cards: [
        {
          type: 'admin',
          label: 'Administrador',
          class: 'bg-sky-900 hover:bg-sky-700',
        },
        {
          type: 'customer',
          label: 'Cliente',
          class: 'bg-green-800 hover:bg-green-600',
        },
      ],
      adminStyle: {},
      clienteStyle: {},
      showLoginForm: false,
      showRegisterForm: false,
      showForgotPasswordForm: false,
      loginType: '',
      registerType: '',
    }
  },
  computed: {
    ...mapGetters('alertMessage', ['message']),
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('alertMessage', ['showMessage', 'clearMessage']),

    handleMouseMove(event, card) {
      const rect = event.target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const style = {
        '--x': `${x}px`,
        '--y': `${y}px`,
        '--size': '200px',
      }
      if (card === 'admin') {
        this.adminStyle = style
      } else {
        this.clienteStyle = style
      }
    },
    handleMouseLeave(card) {
      if (card === 'admin') {
        this.adminStyle = { '--size': '0' }
      } else {
        this.clienteStyle = { '--size': '0' }
      }
    },
    showLogin(type) {
      this.loginType = type
      this.showLoginForm = true
      this.showRegisterForm = false
      this.showForgotPasswordForm = false
    },
    showRegister(type) {
      this.registerType = type
      this.showRegisterForm = true
      this.showLoginForm = false
      this.showForgotPasswordForm = false
    },
    showForgotPassword() {
      this.showForgotPasswordForm = true
      this.showLoginForm = false
      this.showRegisterForm = false
    },
    backTo() {
      this.showLoginForm = false
      this.showRegisterForm = false
      this.showForgotPasswordForm = false
    },
    async handleLogin(loginData) {
      if (loginData.cpf && loginData.password) {
        try {
          const response = await LoginApi.login(loginData.cpf, loginData.password)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))

          if (response.data.user.role === 'admin') {
            this.$router.push('/admin-dashboard')
          } else {
            this.$router.push('/home')
          }

          this.showMessage({
            text: 'Login realizado com sucesso!',
            type: 'success',
          })

          this.redirectUser(response.data.user.role)
        } catch (error) {
          this.showMessage({
            text: 'Login falhou: ' + (error.response?.data?.error || 'Erro desconhecido'),
            type: 'error',
          })
        }
      }
    },
    async handleRegister(registerData) {
      try {
        const response = await LoginApi.register({
          ...registerData,
          role: this.registerType,
        })
        this.setUser(response.data.user)
        this.showMessage({
          text: 'Cadastro realizado com sucesso!',
          type: 'success',
        })
        this.showRegisterForm = false
        this.showLoginForm = true
      } catch (error) {
        this.showMessage({
          text: 'Cadastro falhou: ' + (error.response?.data?.error || 'Erro desconhecido'),
          type: 'error',
        })
      }
    },
    async handleForgotPassword(forgotPasswordData) {
      try {
        await LoginApi.requestPasswordReset(forgotPasswordData.email)
        this.showMessage({
          text: 'Email de recuperação enviado.',
          type: 'success',
        })
        this.backTo()
      } catch (error) {
        this.showMessage({
          text: error.response?.data?.error || 'Erro ao enviar email de recuperação',
          type: 'error',
        })
      }
    },
    redirectUser(role) {
      const routes = {
        admin: '/admin-dashboard',
        customer: '/home',
      }
      this.$router.push(routes[role] || '/home')
    },
  },
}
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
  grid-template-rows: 0.05fr 0.95fr;
}
</style>
