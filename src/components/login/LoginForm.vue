<template>
  <div class="h-max w-182 mx-auto my-auto items-center gap-x-10 rounded-xl p-6">
    <div
      :class="type === 'admin' ? 'bg-sky-900' : 'bg-green-800'"
      class="grid rounded-lg shadow-lg py-5 px-7 gap-y-2"
    >
      <button
        @click="backTo"
        class="w-fit mt-2 text-white hover:underline cursor-pointer text-start"
      >
        ⭠ Voltar
      </button>
      <p class="text-white text-xl font-bold w-fit place-self-center mb-[1rem]">
        Login de {{ type }}
      </p>
      <form @submit.prevent="login" class="grid gap-y-2 mb-[1rem]">
        <input
          v-model="loginData.cpf"
          v-mask="'###.###.###-##'"
          type="text"
          placeholder="CPF"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <input
          v-model="loginData.password"
          type="password"
          placeholder="Digite sua senha"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <div class="flex justify-between">
          <button
            type="button"
            @click="showRegister"
            class="w-fit mt-2 text-white hover:underline cursor-pointer text-start"
          >
            Criar cadastro
          </button>
          <button
            type="button"
            @click="forgotPassword"
            class="w-fit mt-2 text-white hover:underline cursor-pointer text-start"
          >
            Esqueci minha senha
          </button>
        </div>
        <button
          type="submit"
          :class="
            type === 'admin' ? 'bg-blue-500 hover:bg-blue-600' : ' bg-green-500 hover:bg-green-600'
          "
          class="w-[7rem] p-2 bg-blue-500 hover:bg-blue-600 text-white rounded place-self-center cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  directives: {
    mask,
  },
  data() {
    return {
      loginData: {
        cpf: '',
        password: '',
      },
    }
  },
  methods: {
    backTo() {
      this.$emit('back')
    },
    showRegister() {
      this.$emit('show-register', this.type)
    },
    forgotPassword() {
      this.$emit('forgot-password')
    },
    login() {
      this.$emit('login', this.loginData)
    },
  },
}
</script>
