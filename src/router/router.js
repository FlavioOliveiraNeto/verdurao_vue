import { createRouter, createWebHistory } from "vue-router";
import ListaProdutos from "@/components/products/ListaProdutos.vue";
import Home from "@/components/home/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/products", component: ListaProdutos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
