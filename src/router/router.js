import { createRouter, createWebHistory } from "vue-router";
import ListaProdutos from "../components/ListaProdutos.vue";

const routes = [
  { path: "/", component: ListaProdutos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
