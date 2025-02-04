<template>
  <div class="h-screen grid">
    <!--<nav>
      <router-link to="/">🏠 Página Inicial</router-link>
    </nav>
    <router-view />-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
  };
</script>

<style>
  @import "tailwindcss";
</style>