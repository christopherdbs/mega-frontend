<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from "vue";
import { RouterLink } from "vue-router";
import CartDrawerItem from "./CartDrawerItem.vue";
import { useStorage } from "../composables/useStorage";

const { isDrawerOpen, closeDrawer } = inject("cart-drawer-key");
const { getItems, remove } = useStorage();
const drawerRef = ref(null);
const games = getItems();
const itemCount = computed(() => {
    return games.value.reduce((total, game) => {
        return total + game.quantity;
    }, 0);
});

const totalPrice = computed(() => {
    return parseFloat(
        games.value
            .reduce((total, game) => {
                return total + game.quantity * game.price;
            }, 0)
            .toFixed(2)
    ).toFixed(2);
});

function changeFamily(family) {
    emit("update:platformFamily", family);
}

const handleOutsideClick = (event) => {
    console.log(event);
    if (!isDrawerOpen.value) {
        return;
    }

    closeDrawer();
};
onMounted(() => {
    document.addEventListener("mousedown", handleOutsideClick);
});
onUnmounted(() => {
    document.removeEventListener("mousedown", handleOutsideClick);
});
</script>

<template>
    <div class="drawer" :ref="drawerRef" :class="{ isOpen: isDrawerOpen }" @mousedown.stop>
        <div class="drawer-header">
            <p class="close" @click="closeDrawer">X</p>

            <p class="cart-title">
                Cart <span class="cart-count">({{ itemCount }} items)</span>
            </p>
        </div>
        <div class="drawer-content">
            <div class="drawer-items">
                <CartDrawerItem :game="game" v-for="game in games"></CartDrawerItem>
            </div>
        </div>
        <div class="drawer-panel">
            <div class="total-cart">
                <span id="text-total">Total Cart</span>
                <span id="total-amount">{{ totalPrice }} €</span>
            </div>
            <RouterLink to="/cart"
                ><button id="go-cart-button" @click="closeDrawer">
                    Go to the cart
                </button></RouterLink
            >
        </div>
    </div>
</template>

<style>
.drawer {
    background-color: #3a3853;
    width: 25vw;
    margin: 25px;
    position: fixed;
    right: 0px;
    top: 0px;
    bottom: 0px;
    transition: transform 0.3s ease-out;
    z-index: 5;
    border-radius: 12px;
    overflow-y: auto;
    transform: translateX(105%);
    display: flex;
    flex-direction: column;
    scrollbar-color: #3a3853;
}

.drawer::-webkit-scrollbar {
    width: 10px;
    height: 8px;
}

.drawer::-webkit-scrollbar-thumb {
    background-color: #ff0055;
    border-radius: 5px;
}

.isOpen {
    transform: translateX(0);
}

.drawer-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.cart-title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
.cart-count {
    font-size: 20px;
    font-weight: normal;
}
.close {
    font-size: 20px;
    font-weight: bold;
    right: 0;
    top: 0;
    margin: 20px;
    position: absolute;
    cursor: pointer;
}

.drawer-content {
    display: flex;
    flex-direction: column;

    padding: 25px;
    flex: 1;
}
.drawer-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.drawer-panel {
    position: sticky;
    bottom: 0;
    background-color: #29273b;
    padding: 25px;
    display: flex;
    flex-direction: column;
}
#go-cart-button {
    background-color: #29273b;
    border-radius: 12px;
    width: 100%;
    height: 75px;
    color: white;
    font-size: 20px;
    text-align: center;
    border: none;
    transition: background-color 0.15s ease-in-out;
}

#go-cart-button:hover {
    background-color: #ff0055;
    cursor: pointer;
}

.total-cart {
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom: 15px;
}
</style>
