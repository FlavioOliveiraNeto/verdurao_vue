<template>
    <nav class="flex justify-between items-center py-4 border-b">
        <!-- Logo and Navigation Menu -->
        <div class="flex items-center gap-20 w-fit">
          <img src="@/assets/images/logo_icon.png" alt="Logo" class="w-12 h-12" />
          <ul class="flex gap-16">
            <li>
                <a href="#" class="text-gray-700 hover:text-black">Quem somos</a>
            </li>
            <li><a href="#" class="text-gray-700 hover:text-black">Contatos</a></li>
          </ul>
        </div>

        <!-- Search Bar -->
        <div class="flex mt-4 w-[40%] font-medium">
            <input type="text" placeholder="Procure por produtos ou marcas" class="border p-2 w-full rounded-l font-medium" />
            <button class="bg-black text-white px-4 py-2 rounded-r hover:cursor-pointer hover:bg-gray-800">Buscar</button>
        </div>

        <!-- Common Buttons -->
        <div class="flex gap-6">
          <router-link to="#" class="text-gray-700 hover:text-black">
            <img src="@/assets/images/shop_icon.png" alt="" class="w-6 h-6 cursor-pointer hover:p-0.5">
          </router-link>
          <router-link to="/login" class="text-gray-700 hover:text-black">
            <img src="@/assets/images/user_icon.png" alt="" class="w-6 h-6 cursor-pointer hover:p-0.5">
          </router-link>
        </div>
    </nav>
</template>

<script>

</script>