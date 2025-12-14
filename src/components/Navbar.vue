<script setup>
import { RouterLink } from "vue-router";
import SearchBar from "./SearchBar.vue";
</script>

<template>
    <nav>
        <div class="navbar">
            <div class="navbar-left">
                <span class="icon"
                    ><RouterLink to="/"
                        ><img src="/src/assets/logos/logo.png" width="65px" /></RouterLink
                ></span>
            </div>

            <ul class="navbar-links">
                <li><RouterLink to="/" class="navbar-item">Home</RouterLink></li>
                <li><RouterLink to="/catalog" class="navbar-item">Catalog</RouterLink></li>
            </ul>

            <div class="navbar-right">
                <SearchBar></SearchBar>
                <RouterLink to="/cart">
                    <button class="cart-button" @click="openCart">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </RouterLink>
                <RouterLink to="/login">
                    <button class="user">
                        <i class="fa-solid fa-circle-user"></i>
                    </button>
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<style>
nav {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 75px;
    background: linear-gradient(90deg, #990c4483, #0202025e 45%);
    z-index: 20;
}

.navbar {
    display: flex;
    align-items: center;
    width: 95%;
    justify-content: space-between;
    margin: 0px;
    padding: 0px;
    color: white;
}

.navbar-links {
    display: flex;
    gap: 100px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.navbar-links a {
    color: white;
    font-weight: bold;
    text-decoration: none;
}

.navbar-links a:hover {
    color: #da1061;
}

.navbar-left {
    width: 370px;
}

.navbar-right {
    display: flex;
    gap: 25px;
    width: 370px;
}

.navbar-right button {
    color: white;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.navbar-right button:hover {
    color: #da1061;
}
</style>
