<template>
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="not-found-title">404</h1>
        <p class="not-found-subtitle">Oops! Página não encontrada.</p>
        <p class="not-found-text">
          A página que você está procurando pode ter sido removida, renomeada ou
          temporariamente indisponível.
        </p>
        <router-link to="/" class="not-found-button">
          Voltar para o Início
        </router-link>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: "NotFound",
  };
</script>
  
<style scoped>
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f8f9fa;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    padding: 20px;
  }
  
  .not-found-content {
    max-width: 600px;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.8s ease-in-out;
  }
  
  .not-found-title {
    font-size: 6rem;
    font-weight: 700;
    color: #ff6b6b;
    margin: 0;
    line-height: 1;
  }
  
  .not-found-subtitle {
    font-size: 1.75rem;
    font-weight: 600;
    color: #343a40;
    margin: 20px 0 10px;
  }
  
  .not-found-text {
    font-size: 1rem;
    color: #6c757d;
    margin: 0 0 30px;
  }
  
  .not-found-button {
    display: inline-block;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 500;
    color: #ffffff;
    background-color: #007bff;
    border-radius: 6px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .not-found-button:hover {
    background-color: #0056b3;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>