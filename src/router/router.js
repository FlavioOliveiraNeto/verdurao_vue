import { createRouter, createWebHistory } from "vue-router";
import store from '@/store/store.js'

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/components/home/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/login/Login.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/components/login/ResetPasswordForm.vue"),
    props: (route) => ({ token: route.query.token }),
  },
  {
    path: "/products",
    name: "ProductsList",
    component: () => import("@/components/client/ProductsList.vue"),
  },
  {
    path: "/custormer-info",
    name: "CustomerInfoForm",
    component: () => import("@/components/client/CustomerInfoForm.vue"),
  },
  {
    path: "/payment-info",
    name: "PaymentMethod",
    component: () => import("@/components/client/PaymentMethod.vue"),
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: () => import("@/components/admin/AdminDashboard.vue"),
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/templates/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('auth/initializeStore');

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: "Login" });
    } else if (to.meta.role && to.meta.role !== user.role) {
      next({ name: "NotFound" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;