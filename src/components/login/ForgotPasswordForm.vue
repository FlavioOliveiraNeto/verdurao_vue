<template>
    <div class="h-max w-182 mx-auto my-auto items-center gap-x-10 rounded-xl p-6">
      <div :class="type === 'admin' ? 'bg-sky-900' : 'bg-green-800'" class="grid rounded-lg shadow-lg py-5 px-7 gap-y-2">
        <button @click="backTo" class="w-fit mt-2 text-white hover:underline cursor-pointer text-start">⭠ Voltar</button>
        <p class="text-white text-xl font-bold w-fit place-self-center mb-[1rem]">Recuperar senha de {{ type }}</p>
        <div class="grid gap-y-2 mb-[1rem]">
          <input v-model="forgotPasswordData.email" type="email" placeholder="E-mail" class="w-full p-2 rounded bg-amber-50 text-black text-lg">
        </div>
        <button @click="submit" :class="type === 'admin' ? 'bg-blue-500 hover:bg-blue-600' : ' bg-green-500 hover:bg-green-600'" 
                class="w-[7rem] p-2 bg-blue-500 hover:bg-blue-600 text-white rounded place-self-center cursor-pointer">Enviar</button>
      </div>
    </div>
</template>
  
<script>
  import LoginApi from '@/services/login';

  export default {
    props: {
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        forgotPasswordData: {
          email: ''
        }
      };
    },
    methods: {
      backTo() {
        this.$emit('back');
      },
      async submit() {
        if(this.forgotPasswordData.email) {
          try {
            await LoginApi.requestPasswordReset(this.forgotPasswordData.email)
            this.$emit('showMessage', 'Email de recuperação enviado', 'success');
            this.backTo()
          } catch (error) {
            this.$emit('showMessage', error.response.data.error, 'error');
          }
        } else {
          this.$emit('showMessage', 'Por favor, preencha todos os campos.', 'error');
        }
      }
    }
  };
</script>