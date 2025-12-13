<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <nav>
        <div class="navbar">
            <div class="navbar-left">
                <span class="icon"><RouterLink to="/"><img src="/src/assets/logos/logo.png" width="65px" ></img></RouterLink></span>
            </div>

            <ul class="navbar-links">
                <li><RouterLink to="/" class="navbar-item">Home</RouterLink></li>
                <li><RouterLink to="/catalog" class="navbar-item">Catalog</RouterLink></li>
            </ul>

            <div class="navbar-right">
                <button class="cart">
                    <i class="fa-solid fa-basket-shopping"></i>
                </button>
                <button class="user">
                    s
                    <i class="fa-solid fa-circle-user"></i>
                </button>
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
    z-index: 2;
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
}

.navbar-links a {
    color: white;
    font-weight: bold;
    text-decoration: none;
}

.navbar-links a:hover {
    color: #da1061;
}

.navbar-right {
    display: flex;
    gap: 25px;
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
