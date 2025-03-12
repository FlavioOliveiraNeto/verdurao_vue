<template>
  <nav class="flex justify-between items-center py-4 border-b">
    <!-- Logo and Navigation Menu -->
    <div class="flex items-center gap-20 w-fit">
      <router-link to="/home"
        ><img src="@/assets/images/logo_icon.png" alt="Logo" class="w-12 h-12"
      /></router-link>
      <ul class="flex gap-16">
        <li>
          <a href="#" class="text-gray-700 hover:text-black">Sobre nós</a>
        </li>
        <li>
          <router-link to="/products" class="text-gray-700 hover:text-black">
            Produtos
          </router-link>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-black">Contatos</a>
        </li>
      </ul>
    </div>

    <!-- Search Bar -->
    <div class="flex w-[40%] font-medium">
      <input
        type="text"
        placeholder="Procure por produtos ou marcas"
        class="border py-2 px-1 w-full rounded-l font-medium"
      />
      <button
        class="bg-black text-white px-4 py-2 rounded-r hover:cursor-pointer hover:bg-gray-800"
      >
        Buscar
      </button>
    </div>

    <!-- Common Buttons -->
    <div class="flex gap-6">
      <!-- Ícone do Carrinho -->
      <div class="relative">
        <router-link
          v-if="isCustomerLoggedIn"
          to="#"
          class="text-gray-700 hover:text-black grid justify-items-center gap-0.5"
          @click="toggleCart"
        >
          <img
            src="@/assets/images/shop_icon.png"
            alt="Carrinho"
            class="w-6 h-6 cursor-pointer hover:p-[0.05rem]"
          />

          <span class="bg-red-500 px-[7px] rounded-4xl">{{ cartItemCount }}</span>
        </router-link>
        <img
          v-else
          src="@/assets/images/shop_icon.png"
          alt="Carrinho Desabilitado"
          class="w-6 h-6 opacity-50 cursor-not-allowed"
        />

        <!-- Componente Cart com Dropdown -->
        <Cart v-if="showCart" @close="toggleCart" />
      </div>

      <!-- Ícone do Usuário Logado com Dropdown -->
      <UserDropdown v-if="isCustomerLoggedIn" :user="user" class="cursor-pointer" />

      <!-- Ícone do Usuário Não Logado -->
      <router-link v-else to="/login" class="text-gray-700 hover:text-black">
        <img
          src="@/assets/images/user_icon.png"
          alt="Login"
          class="w-6 h-6 cursor-pointer hover:p-[0.05rem]"
        />
      </router-link>
    </div>
  </nav>
</template>

<script>
import Cart from '@/components/client/Cart.vue'
import UserDropdown from '@/components/home/UserDropdown.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Cart,
    UserDropdown,
  },
  data() {
    return {
      showCart: false,
      user: null,
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItemCount']),
    isCustomerLoggedIn() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.user = user
      return user && user.role === 'customer'
    },
  },
  methods: {
    toggleCart() {
      this.showCart = !this.showCart
    },
  },
}
</script>

<style scoped></style>
