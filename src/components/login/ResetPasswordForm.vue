<template>
  <div class="h-max w-182 mx-auto my-auto items-center gap-x-10 rounded-xl p-6">
    <div class="bg-sky-900 grid rounded-lg shadow-lg py-5 px-7 gap-y-2">
      <p class="text-white text-xl font-bold w-fit place-self-center mb-[1rem]">
        Olá {{ userName }}, vamos recuperar sua senha
      </p>
      <form @submit.prevent="resetPassword" class="grid gap-y-2 mb-[1rem]">
        <input
          v-model="resetPasswordData.password"
          type="password"
          placeholder="Nova senha"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <input
          v-model="resetPasswordData.passwordConfirmation"
          type="password"
          placeholder="Confirme a nova senha"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <button
          type="submit"
          class="w-[7rem] p-2 bg-blue-500 hover:bg-blue-600 text-white rounded place-self-center cursor-pointer"
        >
          Redefinir
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import LoginApi from '@/services/login'

export default {
  data() {
    return {
      resetPasswordData: {
        password: '',
        passwordConfirmation: '',
      },
      userName: '',
    }
  },
  async mounted() {
    const token = this.$route.query.token
    try {
      const response = await LoginApi.validateResetToken(token)
      this.userName = response.data.name
    } catch (error) {
      this.$router.push('/login')
      error = 'Token inválido ou expirado.'
      this.$store.dispatch('showMessage', {
        text: error,
        type: 'error',
      })
    }
  },
  methods: {
    async resetPassword() {
      if (this.resetPasswordData.password !== this.resetPasswordData.passwordConfirmation) {
        this.$store.dispatch('showMessage', {
          text: 'As senhas não coincidem.',
          type: 'error',
        })
        return
      } else if (!this.resetPasswordData.password || !this.resetPasswordData.passwordConfirmation) {
        this.$store.dispatch('showMessage', {
          text: 'Por favor, preencha todos os campos.',
          type: 'error',
        })
        return
      }

      try {
        await LoginApi.updatePassword({
          token: this.$route.query.token,
          password: this.resetPasswordData.password,
          password_confirmation: this.resetPasswordData.passwordConfirmation,
        })
        this.$store.dispatch('showMessage', {
          text: 'Senha redefinida com sucesso!',
          type: 'success',
        })
        this.$router.push('/login')
      } catch (error) {
        this.$store.dispatch('showMessage', {
          text: error.response.data.error,
          type: 'error',
        })
      }
    },
  },
}
</script>
