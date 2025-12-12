<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import GameCard from "../components/GameCard.vue";
import Pagination from "../components/Pagination.vue";
import Filter from "../components/Filter.vue";
import { useIGDB } from "../composables/useIGDB";

const { games, currentPage, itemsPerPage, totalPages, filter, fetchGames, platforms } = useIGDB();

const activeIndex = ref(0);

const activeGame = computed(() => {
    if (games.value && games.value.length > 0) {
        return games.value[activeIndex.value];
    }
    return null;
});

const activeGameBackgroundUrl = computed(() => {
    if (activeGame.value && activeGame.value.cover && activeGame.value.cover.url) {
        return `url(${activeGame.value.cover.url.replace("t_thumb", "t_1080p")})`;
    }
    return "none";
});

const activeGameFilteredPlatforms = computed(() => {
    if (activeGame.value.platforms && activeGame.value.platforms.length > 0) {
        return activeGame.value.platforms.filter((gamePlatform) =>
            platforms.find((platform) => platform.id === gamePlatform.id)
        );
    }
});
</script>

<template>
    <section class="highlights">
        <div class="highlights-left" v-if="activeGame">
            <h1 class="game-title">{{ activeGame.name }}</h1>
            <p class="game-description">
                {{ activeGame.summary }}
            </p>

            <div class="game-ratings">
                <p>
                    Ratings⭐:
                    <span style="color: green">{{
                        Math.round(activeGame.rating) ? Math.round(activeGame.rating) : "_"
                    }}</span
                    >/100
                </p>
            </div>

            <div class="game-platforms">
                <div class="game-platform">
                    <div v-for="platform of activeGameFilteredPlatforms" :key="platform.id">
                        {{ platform.name }}
                    </div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn-buy">Buy Now</button>
                <button class="btn-details">Game Review</button>
            </div>
        </div>
    </section>
</template>

<style>
.highlights {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 80px;
    background: linear-gradient(
            to right,
            #1c1b29 38%,
            #1c1b2981 50%,
            #1c1b293f 75%,
            transparent 100%
        ),
        v-bind(activeGameBackgroundUrl);
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
}

.highlights-left {
    width: 30%;
}

.game-title {
    font-size: 45px;
    margin-bottom: 20px;
}

.game-description {
    line-height: 1.4;
    margin-bottom: 30px;
    text-align: justify;
}

.game-ratings {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 25px;
}

.game-platforms {
    text-align: center;
}

.game-platform {
    display: flex;
    justify-content: space-between;
    text-align: center;
    gap: 0px 5px;
    list-style: none;
    margin-bottom: 20px;
}

.game-platform div {
    color: darkgray;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 5px 15px;
    width: 100%;
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.btn-buy {
    padding: 10px 30px;
    background: #da1061;
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
}

.btn-buy:hover {
    background: #b90d52;
}

.btn-details {
    padding: 10px 30px;
    background: transparent;
    border: 2px solid #da1061;
    border-radius: 30px;
    color: #da1061;
    font-size: 16px;
    cursor: pointer;
}

.btn-details:hover {
    border: 2px solid #b90d52;
    color: #b90d52;
}

.game-img {
    width: 100%;
    object-fit: contain;
}
</style>
