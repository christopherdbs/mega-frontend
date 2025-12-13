<script setup>
import { provide } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
import CartDrawer from "./components/CartDrawer.vue";
import { useDrawerState } from "./composables/useDrawerState";
import { useReviewDrawerState } from "./composables/useReviewDrawerState";
import ReviewDrawer from "./components/ReviewDrawer.vue";

const drawerState = useDrawerState();
const reviewDrawerState = useReviewDrawerState();

provide("cart-drawer-key", drawerState);
provide("review-drawer-key", reviewDrawerState);
</script>

<template>
    <Navbar />
    <div class="main">
        <RouterView></RouterView>
    </div>
    <CartDrawer></CartDrawer>
    <ReviewDrawer></ReviewDrawer>
    <Footer />
</template>

<style>
.main {
    flex: 1;
}
</style>
