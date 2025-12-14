<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, inject, computed } from "vue";
import { platform_families } from "../utils/platform_families";
import { useStorage } from "../composables/useStorage";
const props = defineProps({
    game: {
        type: Number,
        required: true,
    },
});
const { remove, updateQuantity } = useStorage();

const quantity = ref(props.game.quantity);
const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

const increment = () => {
    if (quantity.value < MAX_QUANTITY) {
        quantity.value = quantity.value + 1;
        clampQuantity();
    }
};

const decrement = () => {
    if (quantity.value > MIN_QUANTITY) {
        quantity.value = quantity.value - 1;
        clampQuantity();
    }
};

const clampQuantity = () => {
    let value = quantity.value;
    if (value === null || value === undefined || isNaN(value)) {
        quantity.value = MIN_QUANTITY;
        return;
    }

    if (value < MIN_QUANTITY) {
        quantity.value = MIN_QUANTITY;
        return;
    }

    if (value > MAX_QUANTITY) {
        quantity.value = MAX_QUANTITY;
        return;
    }

    updateQuantity(props.game.id, quantity.value);
};
console.log(props.game);
</script>

<template>
    <div class="cart-item">
        <img
            :src="
                game.cover
                    ? game.cover.url.replace('t_thumb', 't_original')
                    : '/src/assets/missing_cover.png'
            "
        />
        <div class="cartItemDescription">
            <p class="game-name">{{ game.name }}</p>
            <p class="game-platform">
                <!--<img
                    :src="
                        '/src/assets/logos/' +
                        platform_families.find((pf) => game.family == pf.id).logo
                    "
                />-->
                {{ platform_families.find((pf) => game.family == platform_families.id).name }}
            </p>
        </div>
        <div class="cartItemControls">
            <p class="price">{{ game.price.toFixed(2) }} €</p>
            <div class="quantity-control">
                <button class="button-quantity" @click="decrement" :disabled="quantity <= 1">
                    -
                </button>
                <input
                    id="quantity"
                    type="number"
                    v-model.number="quantity"
                    min="1"
                    max="10"
                    @change="clampQuantity"
                />

                <button class="button-quantity" @click="increment" :disabled="quantity >= 10">
                    +
                </button>
                <div @click="remove(game.id)" class="remove-btn">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.cart-item {
    background-color: #3a3853;
    width: auto;
    border-radius: 12px;
    color: white;
    display: flex;
    gap: 10px;
    padding: 25px;
}
.cart-item img {
    width: 15%;
    border-radius: 12px;
}

.remove-btn {
    color: white;
    margin-left: auto;
    width: fit-content;
}

.remove-btn i {
    font-size: 20px;
    margin-left: 20px;
}

.game-name {
    font-size: 20px;
    margin: 0;
}

.price {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    text-align: right;
}

.cartItemDescription {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
}

#quantity {
    background-color: #29273b;
    border-radius: 12%;
    width: 50px;
    height: 30px;
    color: white;
    font-size: 20px;
    text-align: center;
    border: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}

#quantity:active,
#quantity:focus-visible,
#quantity option {
    border: none !important;
    outline: none !important;
}

.button-quantity {
    background-color: #29273b;
    border-radius: 12%;
    width: 30px;
    height: 30px;
    color: white;
    font-size: 20px;
    text-align: center;
    border: none;
}
.button-quantity:disabled {
    background-color: #29273b;
    color: #666;
    opacity: 0.6;

    cursor: not-allowed;
}

.cartItemControls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.game-platform {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 200;
    margin: 0;
}
</style>
