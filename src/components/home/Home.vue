<template>
  <div class="grid content-between container mx-auto p-4 text-black">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Header Section -->
    <header class="flex gap-3 justify-between items-center py-4 mt-[4rem]">
      <div class="grid gap-3">
        <h1 class="text-5xl font-bold">Sejam Bem-vindos(as) ao Verdurão Center</h1>
        <p>Venha descobrir a magia dos alimentos fresquinhos!</p>
      </div>
      <img
        src="@/assets/images/banner.png"
        alt="Banner"
        class="relative h-[20rem] w-[70%] rounded-[10rem]"
      />
    </header>

    <!-- Categories -->
    <section class="mt-[2rem]">
      <h2 class="text-3xl font-bold text-center mb-[2rem]">Categories</h2>
      <div class="grid grid-cols-5 gap-4 mt-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="bg-gray-200 py-10 rounded text-center text-xl font-black cursor-pointer hover:bg-gray-300"
        >
          <div class="grid">
            <p class="h-fit">{{ category.name }}</p>
            <img :src="category.image" alt="category.name" class="w-14 h-14 mx-auto mt-[1rem]" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script>
import Navigation from '@/templates/Navigation.vue'
import Footer from '@/templates/Footer.vue'

/* Importação das imagens */
import hortifruti from '@/assets/images/hortifruti.png'
import padaria from '@/assets/images/padaria.png'
import mercearia from '@/assets/images/mercearia.png'
import acougue from '@/assets/images/acougue.png'
import frios from '@/assets/images/frios.png'
/* Fim das importações */

export default {
  name: 'Home',
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      categories: [
        { name: 'Hortifruti', image: hortifruti },
        { name: 'Padaria', image: padaria },
        { name: 'Mercearia', image: mercearia },
        { name: 'Açougue', image: acougue },
        { name: 'Frios', image: frios },
      ],
      trendingProducts: [
        { name: 'Cold-pressed Juice', price: '$5.99' },
        { name: 'Citrus Blend Juice', price: '$6.99' },
        { name: 'Seasonal Fruit Basket', price: '$4.99' },
        { name: 'Organic Green', price: '$2.99' },
        { name: 'Fresh Fruits Selection', price: '$3.99' },
        { name: 'Herbal Seasonings Pack', price: '$4.99' },
      ],
    }
  },
  computed: {
    isCustomerLoggedIn() {
      const user = JSON.parse(localStorage.getItem('user'))
      return user && user.role === 'customer'
    },
  },
}
</script>

<style>
.container {
  max-width: 85vw;
}
</style>
