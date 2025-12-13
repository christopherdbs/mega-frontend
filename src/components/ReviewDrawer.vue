<script setup>
import { inject, ref } from "vue";

const { isDrawerOpen, closeDrawer } = inject("review-drawer-key");

const reviews = ref([
    { id: 1, user: "GamerOne", rating: 90, comment: "Absolutely fantastic experience." },
    { id: 2, user: "ProPlayer", rating: 85, comment: "Great graphics but story lags a bit." },
    { id: 3, user: "ReviewerX", rating: 95, comment: "Masterpiece. A must play." },
    { id: 4, user: "CasualJoe", rating: 70, comment: "It's okay, fun for a weekend." },
]);
</script>

<template>
    <div class="drawer" :class="{ isOpen: isDrawerOpen }">
        <div class="drawer-header">
            <p class="close" @click="closeDrawer">X</p>
            <p class="cart-title">Game Reviews</p>
        </div>
        <div class="drawer-content">
            <div class="drawer-items">
                <div v-for="review in reviews" :key="review.id" class="review-item">
                    <div class="review-header">
                        <span class="review-user">{{ review.user }}</span>
                        <span class="review-rating">{{ review.rating }}/100</span>
                    </div>
                    <p class="review-comment">{{ review.comment }}</p>
                </div>
            </div>
            <button id="go-cart-button" @click="closeDrawer">Close Reviews</button>
        </div>
    </div>
</template>

<style scoped>
/* Reusing styles from CartDrawer mostly */
.drawer {
    background-color: #3b3955; /* Slightly different shade */
    width: 25vw;
    margin: 25px;
    position: fixed;
    right: 0px;
    top: 0px;
    bottom: 0px;
    transition: transform 0.3s ease-out;
    z-index: 10; /* Higher than some other elements */
    border-radius: 12px;
    overflow-y: auto;
    transform: translateX(105%);
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 30px rgba(0,0,0,0.5);
}

.isOpen {
    transform: translateX(0);
}

.drawer-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding-top: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 20px;
}

.cart-title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    margin: 10px 0 20px 0;
}

.close {
    font-size: 20px;
    font-weight: bold;
    right: 0;
    top: 0;
    margin: 20px;
    position: absolute;
    cursor: pointer;
    color: #aaa;
}
.close:hover {
    color: white;
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
    gap: 20px;
}

.review-item {
    background: rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.05);
}

.review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-weight: bold;
    color: #ffbd17;
}

.review-user {
    color: #fff;
}

.review-comment {
    color: #ddd;
    font-size: 0.9em;
    line-height: 1.4;
    margin: 0;
}

#go-cart-button {
    background-color: #29273b;
    border-radius: 12px;
    height: 60px;
    color: white;
    font-size: 18px;
    text-align: center;
    border: none;
    transition: background-color 0.15s ease-in-out;
    margin-top: 20px;
}

#go-cart-button:hover {
    background-color: #ff0055;
    cursor: pointer;
}
</style>
