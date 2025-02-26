import { createRouter, createWebHistory } from "vue-router";

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
    name: "ListaProdutos",
    component: () => import("@/components/client/ListaProdutos.vue"),
    meta: { requiresAuth: true },
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
    component: () => import("@/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

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