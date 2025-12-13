<script setup>
import { ref, onMounted, inject, computed } from "vue";
import CartItem from "../components/CartItem.vue";
import { useStorage } from "../composables/useStorage";

const { isDrawerOpen, closeDrawer } = inject("cart-drawer-key");
const { getItems, remove } = useStorage();
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
</script>

<template>
    <div class="cart">
        <div class="cart-list">
            <p class="cart-list-title">
                Cart <span class="cart-count">({{ itemCount }} items)</span>
            </p>
            <div class="cart-items">
                <CartItem :game="game" v-for="game in games"></CartItem>
            </div>
        </div>
        <div class="cart-summary">
            <p class="cart-list-title">Summary</p>
            <div class="cart-summary-content">
                <div class="total-cart-summary">
                    <span id="text-total">Total Cart</span>
                    <span id="total-amount">{{ totalPrice }} €</span>
                </div>
                <button id="go-cart-button">Pay</button>
            </div>
        </div>
    </div>
</template>

<style>
.cart {
    width: 65vw;
    margin: auto;

    margin-top: 100px;
    margin-bottom: 100px;

    display: flex;
    gap: 25px;
}
.cart-list {
    width: 65%;
}
.cart-summary {
    position: sticky;
    top: 50px;
    width: 35%;
    height: fit-content;
}
.cart-summary-content {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}
.cart-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.cart-list-title {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    margin-top: 0;
}

.cart-count {
    font-size: 20px;
    font-weight: normal;
}

.cart-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 25px;
}
#go-cart-button {
    --spotlight-opacity: 0;
    /*background: radial-gradient(
            circle at center,
            rgba(255, 165, 0, var(--spotlight-opacity)) 0%,
            rgba(255, 165, 0, 0) 70%
        ),
        linear-gradient(0deg, #b9003e, #ff0055 45%);*/
    background: linear-gradient(0deg, #b9003e, #ff0055 45%);
    transition: --spotlight-opacity 5s ease-in-out;
    background-size: 100% 100%, 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 12px;

    height: 75px;
    color: white;
    font-size: 20px;
    text-align: center;
    border: none;
}

#go-cart-button:hover {
    --spotlight-opacity: 0.5;
    cursor: pointer;
}

.total-cart-summary {
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom: 5px;
}

#total-amount {
    font-weight: bold;
}
</style>
