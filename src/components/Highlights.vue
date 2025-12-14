<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import axios from "axios";
import GameCard from "../components/GameCard.vue";
import Pagination from "../components/Pagination.vue";
import Filter from "../components/Filter.vue";
import { useIGDB } from "../composables/useIGDB";
import Carousel from "./Carousel.vue";
import { useStorage } from "../composables/useStorage";
import { RouterLink } from "vue-router";

const {
    games,
    currentPage,
    itemsPerPage,
    totalPages,
    filter,
    fetchGames,
    platforms,
    fetchTrendingGames,
} = useIGDB();

const { openDrawer } = inject("cart-drawer-key");
const trendingGames = ref(null);
onMounted(async () => {
    trendingGames.value = await fetchTrendingGames();
    console.log(trendingGames.value);
});
const activeIndex = ref(0);

const activeGame = computed(() => {
    if (trendingGames.value && trendingGames.value.length > 0) {
        return trendingGames.value[activeIndex.value];
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

const updateActiveGameIndex = (newIndex) => {
    console.log(newIndex);
    activeIndex.value = newIndex;
};

const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const { add } = useStorage();

const addToCart = (game) => {
    add(game);
    openDrawer();
};
</script>

<template>
    <section class="highlights">
        <div class="highlights-left" v-if="activeGame">
            <h1 class="game-title">{{ activeGame.name }}</h1>
            <p class="game-description">
                {{ activeGame.summary }}
            </p>
            <div class="game-meta">
                <div class="rating-row-banner">
                    <span class="score">{{
                        activeGame.rating && activeGame.rating != 0
                            ? Math.round(activeGame.rating || 0)
                            : "-"
                    }}</span
                    >/100
                </div>

                <div class="meta-info">
                    <div class="meta-item">
                        <strong>Published on:</strong>
                        <span>{{ formatDate(activeGame.first_release_date) }}</span>
                    </div>
                    <div class="meta-item">
                        <strong>Genre:</strong>
                        <span>{{
                            activeGame.genres
                                ?.map((g) => g.name)
                                .slice(0, 2)
                                .join(", ")
                        }}</span>
                    </div>
                    <div class="meta-item">
                        <strong>Available For:</strong>
                        <div class="platform-icons-row">
                            <span
                                v-for="p in activeGameFilteredPlatforms"
                                :key="p.id"
                                class="platform-icon-wrap"
                            >
                                <img
                                    v-if="p.name"
                                    :src="`/src/assets/logos/${p.logo}`"
                                    :alt="p.name"
                                    class="mini-logo"
                                />
                                <span v-else>{{ p.name }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary" @click="addToCart(activeGame)">Buy Now</button>
                <RouterLink :to="`/game/${activeGame.id}`"
                    ><button class="btn btn-secondary">Game Review</button></RouterLink
                >
            </div>
        </div>
        <Carousel :data="trendingGames" v-model="activeIndex"></Carousel>
    </section>
</template>

<style>
.highlights {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 60px;
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
    position: relative;
    height: 65vh;
}

.highlights-left {
    width: 35%;
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

.game-meta {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-bottom: 40px;
    background: rgba(255, 255, 255, 0.03);
    padding: 15px 25px;
    border-radius: 16px;
    backdrop-filter: blur(5px);
    width: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.meta-info {
    display: flex;
    gap: 30px;
    font-size: 0.95em;
}

.meta-item {
    display: flex;
    flex-direction: column;
}

.meta-item strong {
    color: #8fa3bf;
    margin-bottom: 6px;
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 1px;
}

.btn {
    padding: 16px 40px;
    border-radius: 12px;
    border: none;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.95em;
    letter-spacing: 1px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.btn-primary {
    background: linear-gradient(135deg, #ff0055 0%, #ff0077 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 0, 85, 0.4);
}

.btn-primary:hover {
    box-shadow: 0 8px 25px rgba(255, 0, 85, 0.6);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    backdrop-filter: blur(5px);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
}

.rating-row-banner {
    font-size: 1.3em;
    display: flex;
    align-items: baseline;
    gap: 5px;
}

.rating-row .score {
    font-size: 2.2em;
    font-weight: 900;
    color: #ffbd17;
    text-shadow: 0 0 20px rgba(255, 189, 23, 0.3);
}

.rating-row-banner .score {
    font-size: 2.2em;
    font-weight: 900;
    color: #ffbd17;
    text-shadow: 0 0 20px rgba(255, 189, 23, 0.3);
}

.platform-icons-row {
    display: flex;
    gap: 10px;
    align-items: center;
}

.platform-icon-wrap {
    display: inline-flex;
    align-items: center;
}

.mini-logo {
    height: 20px;
    width: auto;
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
