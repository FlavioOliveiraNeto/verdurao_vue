<template>
  <div
    class="dropdown absolute right-[-8.05rem] mt-[0.7rem] w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
  >
    <div class="grid px-4 py-2 h-full content-between">
      <div class="mb-6">
        <h2 class="text-xl font-bold">Carrinho de Compras</h2>
        <button
          @click="closeCart"
          class="text-gray-700 hover:text-black text-[2rem] absolute top-[-0.5rem] right-[0.5rem] hover:cursor-pointer hover:text-[2.2rem]"
        >
          &times;
        </button>
      </div>

      <!-- Lista de Itens no Carrinho -->
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="mb-4 flex justify-between items-center">
          <span>{{ item.name }} - {{ item.price }}</span>
          <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700">
            Remover
          </button>
        </li>
      </ul>

      <!-- Total -->
      <p class="mt-6 font-bold">Total: {{ cartTotal }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal']),
  },
  methods: {
    ...mapActions(['removeFromCart']),
    closeCart() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.dropdown {
  border-radius: 15px;
  width: 300px;
  height: 100px;
  position: absolute;
  float: left;
  padding: 5px;
  z-index: 10;
}

.dropdown:hover {
  z-index: 15;
}

.dropdown:after {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid black;
  top: -11px;
  left: 50%;
}
</style>
