<template>
    <div class="h-max w-182 mx-auto my-auto items-center gap-x-10 rounded-xl p-6">
      <div class="bg-sky-900 grid rounded-lg shadow-lg py-5 px-7 gap-y-2">
        <p class="text-white text-xl font-bold w-fit place-self-center mb-[1rem]">Olá {{ userName }}, vamos recuperar sua senha</p>
        <div class="grid gap-y-2 mb-[1rem]">
          <input v-model="password" type="password" placeholder="Nova senha" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
          <input v-model="passwordConfirmation" type="password" placeholder="Confirme a nova senha" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
        </div>
        <button @click="resetPassword" class="w-[7rem] p-2 bg-blue-500 hover:bg-blue-600 text-white rounded place-self-center cursor-pointer">
          Redefinir
        </button>
      </div>
    </div>
</template>
  
<script>
  import LoginApi from '@/services/login'
  
  export default {
    data() {
      return {
        password: '',
        passwordConfirmation: '',
        userName: ''
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
        this.$emit('showMessage', error, 'error');
      }
    },
    methods: {
      async resetPassword() {
        if (this.password !== this.passwordConfirmation) {
          this.$emit('showMessage', 'As senhas não coincidem.', 'error');
          return
        }
  
        try {
          await LoginApi.updatePassword({
            token: this.$route.query.token,
            password: this.password,
            password_confirmation: this.passwordConfirmation
          })
          this.$emit('showMessage', 'Senha redefinida com sucesso!', 'success');
          this.$router.push('/login')
        } catch (error) {
          this.$emit('showMessage', error.response.data.error, 'error');
        }
      }
    }
  }
</script>