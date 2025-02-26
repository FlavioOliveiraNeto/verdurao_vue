<template>
  <div class="grid content-between container mx-auto p-4 text-black">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Header Section -->
    <header class="flex gap-3 justify-between items-center py-4 mt-[4rem]">
      <div class="grid gap-3">
        <h1 class="text-5xl font-bold">Produtos do Verdurão Center</h1>
        <p>Encontre os melhores produtos frescos e naturais!</p>
      </div>
    </header>

    <!-- Filtros e Ordenação -->
    <section class="mt-[2rem]">
      <div class="flex gap-4 mb-4 flex-wrap">
        <input
          v-model="filters.name"
          type="text"
          placeholder="Pesquisar por nome..."
          class="border p-2 rounded w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          v-model="filters.category"
          class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todas as categorias</option>
          <option v-for="category in categories" :key="category.name" :value="category.name">
            {{ category.name }}
          </option>
        </select>
        <select
          v-model="sortBy"
          class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="name">Ordenar por nome</option>
          <option value="price">Ordenar por preço</option>
        </select>
      </div>
    </section>

    <!-- Lista de Produtos -->
    <section class="mt-[2rem]">
      <div class="grid xl:grid-cols-4 gap-6">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-60 h-70 object-cover rounded-t-lg place-self-center"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-600 mt-2">{{ product.description }}</p>
            <p class="text-green-600 font-bold mt-2">{{ product.price }}</p>
            <button
              v-if="isCustomerLoggedIn"
              @click="addToCart(product)"
              class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 cursor-pointer"
            >
              Adicionar ao Carrinho
            </button>
            <p v-else class="text-red-500">Logue no nosso site para ir às compras!</p>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="flex justify-between items-center mt-8">
        <div class="text-sm text-gray-600">
          Mostrando {{ paginatedProducts.length }} de {{ filteredProducts.length }} produtos
        </div>
        <div class="flex gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors duration-300"
          >
            Anterior
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors duration-300"
          >
            Próxima
          </button>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script>
  import Navigation from "@/components/Navigation.vue";
  import Footer from "@/components/Footer.vue";

  /* Importação das imagens */
  import maca_verde from "@/assets/images/maca-verde.png"
  import pao_integral from "@/assets/images/pao-integral.png"
  import arroz_integral from "@/assets/images/arroz-integral.png"
  /* Fim das importações */   

  export default {
    name: "ListaProdutos",
    components: {
      Navigation,
      Footer
    },
    data() {
      return {
        products: [
          {
            id: 1,
            name: "Maçã Verde",
            description: "Maçãs frescas e crocantes, ideais para lanches saudáveis.",
            price: "R$ 5,99/kg",
            image: maca_verde,
            category: "Hortifruti",
          },
          {
            id: 2,
            name: "Pão Integral",
            description: "Pão integral feito com grãos selecionados.",
            price: "R$ 7,50/un",
            image: pao_integral,
            category: "Padaria",
          },
          {
            id: 3,
            name: "Arroz Integral",
            description: "Arroz integral orgânico, pacote de 5kg.",
            price: "R$ 12,00",
            image: arroz_integral,
            category: "Mercearia",
          },
          // Adicione mais produtos aqui
        ],
        categories: [
          { name: "Hortifruti" },
          { name: "Padaria" },
          { name: "Mercearia" },
          { name: "Açougue" },
          { name: "Frios" },
        ],
        filters: {
          name: "",
          category: "",
        },
        sortBy: "name",
        currentPage: 1,
        itemsPerPage: 8,
      };
    },
    computed: {
      isCustomerLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.role === 'customer';
      },
      filteredProducts() {
        let filtered = this.products;

        if (this.filters.name) {
          filtered = filtered.filter((product) =>
            product.name.toLowerCase().includes(this.filters.name.toLowerCase())
          );
        }

        if (this.filters.category) {
          filtered = filtered.filter(
            (product) => product.category === this.filters.category
          );
        }

        if (this.sortBy === "name") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.sortBy === "price") {
          filtered.sort((a, b) => {
            const priceA = parseFloat(a.price.replace("R$ ", "").replace(",", "."));
            const priceB = parseFloat(b.price.replace("R$ ", "").replace(",", "."));
            return priceA - priceB;
          });
        }

        return filtered;
      },
      paginatedProducts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredProducts.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      },
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      addToCart(product) {
        // Lógica para adicionar ao carrinho
        alert(`${product.name} adicionado ao carrinho!`);
      },
    },
  };
</script>

<style scoped>
  .container {
    max-width: 85vw;
  }
</style>