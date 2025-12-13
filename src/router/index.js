import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Catalog from "../pages/Catalog.vue";
import NotFound from "../pages/NotFound.vue";
import Cart from "../pages/Cart.vue";
const routes = [
    { path: "/", component: Home },
    { path: "/catalog", component: Catalog },
    { path: "/cart", component: Cart },
    { path: "/connexion", component: Cart },
    { path: "/game/:id", component: () => import("../pages/GameDetail.vue") },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
