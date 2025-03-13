<template>
  <div
    class="dropdown absolute right-[-8.05rem] mt-[0.7rem] w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
  >
    <div class="grid px-4 py-2 h-full content-between gap-1.5">
      <div class="mb-6 justify-self-center">
        <h2 class="text-xl font-bold">Carrinho de Compras</h2>
        <button
          @click="closeCart"
          class="text-[2rem] absolute top-[-0.5rem] right-[0.5rem] hover:cursor-pointer"
        >
          &times;
        </button>
      </div>

      <!-- Lista de Itens no Carrinho -->
      <ul class="grid gap-1">
        <li v-for="item in cartItems" :key="item.id" class="mb-4 flex justify-between items-center">
          <span class="text-sm">{{ item.name }} - {{ item.price }}</span>
          <input
            type="number"
            v-model.number="item.quantity"
            min="0"
            class="w-12 text-center border border-gray-300 rounded-lg"
            @change="updateQuantity(item)"
          />
        </li>
      </ul>

      <!-- Total -->
      <p class="mt-6 font-bold justify-self-end">Total: {{ cartTotal }}</p>

      <!-- Botão de finalizar pedido -->
      <router-link
        to="/custormer-info"
        class="block w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mt-[1rem] rounded-lg justify-self-center"
      >
        Finalizar Pedido
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['cartItems', 'cartTotal']),
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'updateCartItemQuantity']),
    closeCart() {
      this.$emit('close')
    },
    updateQuantity(item) {
      if (item.quantity <= 0) {
        this.removeFromCart(item.id)
      } else {
        this.updateCartItemQuantity({ id: item.id, quantity: item.quantity })
      }
    },
  },
}
</script>

<style scoped>
.dropdown {
  border-radius: 15px;
  width: 300px;
  height: fit-content;
  position: absolute;
  float: left;
  padding: 5px;
  z-index: 10;

  button {
    color: gray;
  }

  button:hover {
    color: black;
  }
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
