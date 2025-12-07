<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <Navbar />
    <RouterView class="main"></RouterView>
    <Footer />
</template>

<style>
.main {
    flex: 1;
}
</style>
