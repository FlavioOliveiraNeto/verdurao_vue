<template>
    <div class="container mx-auto p-4 text-black">
      <!-- Navigation Header -->
      <Navigation />
      
      <!-- Header Section -->
      <header class="flex gap-3 justify-between items-center py-4 mt-[4rem]">
        <div class="grid gap-3">
            <h1 class="text-5xl font-bold">Seja Bem-vindo(a) ao Verdurão Center</h1>
            <p>Venha descobrir a magia dos alimentos fresquinhos!</p>
        </div>
        <img src="@/assets/images/banner.png" alt="Banner" class="relative h-[20rem] w-[70%] rounded-[10rem]">
      </header>
      
      <!-- Categories -->
      <section class="mt-[6rem]">
        <h2 class="text-2xl font-bold text-center mb-[2rem]">Categories</h2>
        <div class="grid grid-cols-5 gap-4 mt-4">
          <div v-for="category in categories" :key="category.name" class="bg-gray-200 p-3 rounded text-center font-black cursor-pointer hover:bg-gray-300">
            <div class="grid">
                <p class="h-fit ">{{ category.name }}</p>
                <img :src="category.image" alt="category.name" class="w-12 h-12 mx-auto mt-[1rem]" />
            </div>
          </div>
        </div>
      </section>
      
      <!-- Special Offers & Trending Products -->
      <section class="mt-[15rem] flex gap-4">
        <div class="w-1/4 bg-gray-100 p-4 rounded">
          <h3 class="font-bold">Special Offers</h3>
          <div class="bg-white p-4 mt-2 rounded text-center">
            <p class="text-lg font-bold">Fresh</p>
            <span class="text-gray-500">by Juicy</span>
            <p class="text-xl font-bold">20% OFF</p>
            <button class="bg-black text-white px-4 py-2 mt-2 rounded">Buy Now</button>
          </div>
        </div>
        
        <div class="w-3/4 bg-gray-100 p-4 rounded">
          <h3 class="font-bold">Trending Products</h3>
          <div class="grid grid-cols-3 gap-4 mt-2">
            <div v-for="product in trendingProducts" :key="product.name" class="bg-white p-4 rounded text-center relative">
              <p class="mt-2">{{ product.name }}</p>
              <p class="font-bold">{{ product.price }}</p>
              <button class="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
  
<script>
    import Navigation from "@/components/Navigation.vue"

    /* Importação das imagens */
    import hortifruti from "@/assets/images/hortifruti.png"
    import padaria from "@/assets/images/padaria.png"
    import mercearia from "@/assets/images/mercearia.png"
    import acougue from "@/assets/images/acougue.png"
    import frios from "@/assets/images/frios.png"
    /* Fim das importações */    

    export default {
        name: "Home",
        components: { 
            Navigation 
        },
        data() {
            return {
                categories: [
                    { name: "Hortifruti", image: hortifruti },
                    { name: "Padaria", image: padaria },
                    { name: "Mercearia", image: mercearia },
                    { name: "Açougue", image: acougue },
                    { name: "Frios", image: frios },
                ],
                trendingProducts: [
                    { name: "Cold-pressed Juice", price: "$5.99" },
                    { name: "Citrus Blend Juice", price: "$6.99" },
                    { name: "Seasonal Fruit Basket", price: "$4.99" },
                    { name: "Organic Green", price: "$2.99" },
                    { name: "Fresh Fruits Selection", price: "$3.99" },
                    { name: "Herbal Seasonings Pack", price: "$4.99" },
                ]
            };
        }
    };
</script>
  
<style>
  .container {
    max-width: 85vw;
  }
</style>