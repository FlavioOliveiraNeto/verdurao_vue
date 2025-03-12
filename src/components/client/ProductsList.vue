<template>
  <div class="container mx-auto text-black">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Header Section -->
    <header class="flex gap-3 justify-between items-center mt-[3rem] mb-[2rem]">
      <div class="grid gap-3">
        <h1 class="text-5xl font-bold">Produtos do Verdurão Center</h1>
        <p>Encontre os melhores produtos frescos e naturais!</p>
      </div>
    </header>

    <!-- Filtros e Ordenação -->
    <section class="grid gap-3 mb-[2rem]">
      <div class="grid xl:grid-cols-3 gap-6 h-fit">
        <!-- Campo de Pesquisa por Nome -->
        <div class="relative">
          <div class="grid gap-0.5">
            <label for="" class="px-1">Pesquisa por nome</label>
            <input
              v-model="filters.name"
              type="text"
              placeholder="Pesquisar por nome..."
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              @input="debouncedFilter"
            />
            <button
              v-if="filters.name"
              @click="filters.name = ''"
              class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>

        <!-- Filtro de Categoria -->
        <div class="grid gap-0.5">
          <label for="" class="px-1">Categorias</label>
          <select
            v-model="filters.category"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer"
          >
            <option value="">Todas as categorias</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Ordenação -->
        <div class="grid gap-0.5">
          <label for="" class="px-1">Ordenar por</label>
          <select
            v-model="sortBy"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>

      <!-- Botão para Limpar Filtros -->
      <button
        @click="clearFilters"
        class="h-fit mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 justify-self-end hover:cursor-pointer"
      >
        Limpar Filtros
      </button>
    </section>

    <!-- Lista de Produtos -->
    <section class="grid gap-6 mb-[1rem]">
      <div class="grid xl:grid-cols-4 gap-6">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="grid bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-fit h-[10rem] justify-self-center object-cover rounded-t-lg"
          />
          <div class="grid gap-3 p-4">
            <div class="grid">
              <h3 class="w-fit text-xl font-semibold">{{ product.name }}</h3>
              <p class="text-gray-600 mt-2">{{ product.description }}</p>
            </div>
            <div class="grid gap-1">
              <p class="text-green-600 font-bold mt-2">{{ product.price }}</p>
              <button
                v-if="isCustomerLoggedIn"
                @click="addToCart(product)"
                class="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:cursor-pointer"
              >
                Adicionar ao Carrinho
              </button>
              <p v-else class="text-red-500 mt-4 text-[0.85rem]">
                Logue no nosso site para ir às compras!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="mt-8 flex justify-center gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-4 py-2 border rounded-lg',
            currentPage === page
              ? 'bg-green-500 text-white border-green-500'
              : 'border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </section>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script>
import Navigation from '@/templates/Navigation.vue'
import Footer from '@/templates/Footer.vue'
import { debounce } from 'lodash'
import { useDebounceFn } from '@vueuse/core'
import { mapActions } from 'vuex'

/* Importação das imagens */
import maca_verde from '@/assets/images/maca-verde.png'
import pao_integral from '@/assets/images/pao-integral.png'
import arroz_integral from '@/assets/images/arroz-integral.png'
/* Fim das importações */

export default {
  name: 'ProductsList',
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Maçã Verde',
          description: 'Maçãs frescas e crocantes, ideais para lanches saudáveis.',
          price: 'R$ 5,99/kg',
          image: maca_verde,
          category: 'Hortifruti',
        },
        {
          id: 2,
          name: 'Pão Integral',
          description: 'Pão integral feito com grãos selecionados.',
          price: 'R$ 7,50/un',
          image: pao_integral,
          category: 'Padaria',
        },
        {
          id: 3,
          name: 'Arroz Integral',
          description: 'Arroz integral orgânico, pacote de 5kg.',
          price: 'R$ 12,00',
          image: arroz_integral,
          category: 'Mercearia',
        },
        // Adicione mais produtos aqui
      ],
      categories: ['Hortifruti', 'Padaria', 'Mercearia', 'Açougue', 'Frios'],
      filters: {
        name: '',
        category: '',
      },
      sortBy: 'name',
      sortOptions: [
        { text: 'Nome', value: 'name' },
        { text: 'Preço', value: 'price' },
      ],
      currentPage: 1,
      itemsPerPage: 8,
    }
  },
  computed: {
    isCustomerLoggedIn() {
      const user = JSON.parse(localStorage.getItem('user'))
      return user && user.role === 'customer'
    },
    filteredProducts() {
      let filtered = this.products

      if (this.filters.name) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(this.filters.name.toLowerCase()),
        )
      }

      if (this.filters.category) {
        filtered = filtered.filter((product) => product.category === this.filters.category)
      }

      if (this.sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name))
      } else if (this.sortBy === 'price') {
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('R$ ', '').replace(',', '.'))
          const priceB = parseFloat(b.price.replace('R$ ', '').replace(',', '.'))
          return priceA - priceB
        })
      }

      return filtered
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProducts.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
    },
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    clearFilters() {
      this.filters.name = ''
      this.filters.category = ''
      this.sortBy = 'name'
    },
    debouncedFilter: useDebounceFn(function () {
      // Atualiza a lista de produtos com debounce
    }, 300),
  },
}
</script>

<style scoped>
.container {
  max-width: 85vw;
  display: grid;
}
</style>
