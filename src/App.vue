<script setup>
import { provide } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
import CartDrawer from "./components/CartDrawer.vue";
import { useDrawerState } from "./composables/useDrawerState";

const drawerState = useDrawerState();

provide("cart-drawer-key", drawerState);
</script>

<template>
    <Navbar />
    <RouterView class="main"></RouterView>
    <CartDrawer></CartDrawer>
    <Footer />
</template>

<style>
.main {
    flex: 1;
}
</style>
