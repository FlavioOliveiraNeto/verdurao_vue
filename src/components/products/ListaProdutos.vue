<template>
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        <li v-for="produto in produtos" :key="produto.id">
          {{ produto.nome }} - R$ {{ produto.preco }} 
        </li>
      </ul>
    </div>
</template>
  
<script>
    export default {
        data() {
        return {
            produtos: [],
        };
        },
        async mounted() {
        const response = await fetch('/api/produtos');
        this.produtos = await response.json();
        },
    };
</script>
  