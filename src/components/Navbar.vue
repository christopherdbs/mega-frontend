<script setup></script>

<template>
    <nav>
        <div class="navbar">
            <div class="navbar-left">
                <span class="icon">Logo</span>
                <span class="brand"><strong>MEGA</strong></span>
            </div>

            <ul class="navbar-links">
                <li><a href="#" class="navbar-item">Home</a></li>
                <li><a href="#" class="navbar-item">Catalog</a></li>
            </ul>

            <div class="navbar-right">
                <button class="cart">🛒</button>
                <button class="user">👤</button>
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
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
</style>
