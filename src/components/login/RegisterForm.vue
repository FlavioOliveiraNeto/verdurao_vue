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
        Cadastro de {{ type }}
      </p>
      <form @submit.prevent="register" class="grid gap-y-2 mb-[1rem]">
        <input
          v-model="registerData.name"
          type="text"
          placeholder="Nome completo"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <input
          v-model="registerData.email"
          type="email"
          placeholder="E-mail"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <input
          v-model="registerData.cpf"
          v-mask="'###.###.###-##'"
          type="text"
          placeholder="CPF"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <input
          v-model="registerData.password"
          type="password"
          placeholder="Senha"
          class="w-full p-2 rounded bg-amber-50 text-black text-lg"
        />
        <button
          type="submit"
          :class="
            type === 'admin' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
          "
          class="w-[7rem] p-2 bg-blue-500 hover:bg-blue-600 text-white rounded place-self-center cursor-pointer"
        >
          Cadastrar
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
      registerData: {
        name: '',
        email: '',
        cpf: '',
        password: '',
      },
    }
  },
  methods: {
    backTo() {
      this.$emit('back')
    },
    register() {
      this.$emit('register', this.registerData)
    },
  },
}
</script>
