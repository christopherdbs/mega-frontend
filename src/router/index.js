import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Catalog from "../pages/Catalog.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/catalog", component: Catalog },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
