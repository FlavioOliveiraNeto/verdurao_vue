import { createRouter, createWebHistory } from "vue-router";
import ListaProdutos from "@/components/products/ListaProdutos.vue";
import Login from "@/components/login/Login.vue";
import AdminDashboard from "@/components/admin/AdminDashboard.vue";
import ClienteDashboard from "@/components/client/ClientDashboard.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/products", component: ListaProdutos },
  { path: "/admin-dashboard", component: AdminDashboard },
  { path: "/cliente-dashboard", component: ClienteDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;