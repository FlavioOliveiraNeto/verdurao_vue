<template>
  <div class="container mx-auto p-4 text-black">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Header Section -->
    <header class="flex gap-3 justify-between items-center py-4 mt-[2rem]">
      <div class="grid gap-3">
        <h1 class="text-5xl font-bold">Produtos do Verdurão Center</h1>
        <p>Encontre os melhores produtos frescos e naturais!</p>
      </div>
    </header>

    <!-- Filtros e Ordenação -->
    <section class="grid mt-[2rem]">
      <div class="grid xl:grid-cols-3 gap-6">
        <!-- Campo de Pesquisa por Nome -->
        <v-text-field
          v-model="filters.name"
          label="Pesquisar por nome..."
          outlined
          dense
          clearable
          class="w-full md:w-[300px]"
          @input="debouncedFilter"
        />

        <!-- Filtro de Categoria -->
        <v-select
          v-model="filters.category"
          :items="categories"
          label="Categorias"
          outlined
          dense
          clearable
          class="w-full md:w-[200px]"
        />

        <!-- Ordenação -->
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          item-title="text"
          item-value="value"
          label="Ordenar por"
          outlined
          dense
          class="w-full md:w-[200px]"
        />
      </div>

      <!-- Botão para Limpar Filtros -->
      <v-btn @click="clearFilters" color="gray" outlined class="w-fit md:w-auto justify-self-end">
        Limpar Filtros
      </v-btn>
    </section>

    <!-- Lista de Produtos -->
    <section class="mt-[1rem]">
      <div class="grid xl:grid-cols-4 gap-6">
        <v-card
          v-for="product in paginatedProducts"
          :key="product.id"
          class="grid bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <v-img
            :src="product.image"
            :alt="product.name"
            class="w-50 h-fit object-cover rounded-t-lg place-self-center"
          />
          <v-card-text class="grid p-4">
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-600 mt-2">{{ product.description }}</p>
            <p class="text-green-600 font-bold mt-2">{{ product.price }}</p>
            <v-btn
              v-if="isCustomerLoggedIn"
              @click="addToCart(product)"
              color="green"
              class="mt-4 w-full text-white"
            >
              Adicionar ao Carrinho
            </v-btn>
            <p v-else class="text-red-500">Logue no nosso site para ir às compras!</p>
          </v-card-text>
        </v-card>
      </div>

      <!-- Paginação -->
      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" class="mt-8" />
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
  name: 'ListaProdutos',
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
}
</style>
