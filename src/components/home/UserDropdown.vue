<template>
  <div class="relative">
    <!-- Ícone do Usuário Logado -->
    <div class="grid items-center justify-items-center cursor-pointer" @click="toggleMenu">
      <img
        src="@/assets/images/user_icon_logged.png"
        alt="Login"
        class="w-6 h-6 hover:p-[0.05rem]"
      />
      <label class="font-[0.8rem] mt-[.2rem]">{{ getFirstName(user.name) }}</label>
    </div>

    <!-- Dropdown Menu -->
    <div
      v-if="showMenu"
      class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <ul>
        <li>
          <router-link
            to="/configuracoes"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
            @click="closeMenu"
          >
            Configurações
          </router-link>
        </li>
        <li>
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LoginApi from '@/services/login'

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    getFirstName(fullName) {
      return fullName.split(' ')[0]
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    closeMenu() {
      this.showMenu = false
    },
    logout() {
      LoginApi.logout()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    },
  },
}
</script>

<style scoped></style>
