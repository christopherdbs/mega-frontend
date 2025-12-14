<script setup>
import { ref, onMounted, watch, inject, nextTick, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GameCard from "../components/GameCard.vue";
import "../styles/GameDetail.css";
import sampleGameData from "../data/sampleGameDetail.json";
import samplePopularGames from "../data/samplePopularGames.json";
import { useStorage } from "../composables/useStorage";
import { useIGDB } from "../composables/useIGDB";

const route = useRoute();
const game = ref(null);
const popularGames = ref([]);
const trendingGames = ref([]);
const categories = ref([
    {
        id: 1,
        name: "Sports & Racing",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.png",
        link: "#sports",
    },
    {
        id: 2,
        name: "RPG",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.png",
        link: "#rpg",
    },
    {
        id: 3,
        name: "Adventure",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tamu.png",
        link: "#adventure",
    },
    {
        id: 4,
        name: "Strategy",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vec.png",
        link: "#strategy",
    },
    {
        id: 5,
        name: "Survival",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ft5.png",
        link: "#survival",
    },
    {
        id: 6,
        name: "Action",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7x.png",
        link: "#action",
    },
]);
const { openDrawer } = inject("cart-drawer-key");
const { openDrawer: openReviewDrawer } = inject("review-drawer-key");
const { add } = useStorage();
const {
    fetchPopularGames: fetchIGDBPopularGames,
    fetchTrendingGames,
    fetchGame,
    filterPlatforms,
    calculatePrice,
} = useIGDB();

// Helper to format date
const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

// Helper to get image URL
const getImageUrl = (image, size = "t_1080p") => {
    if (!image) return "";
    return image.url.replace("t_thumb", size);
};

const CLIENT_ID = import.meta.env.VITE_IGDB_CLIENT_ID;
const ACCESS_TOKEN = import.meta.env.VITE_IGDB_ACCESS_TOKEN;

const fetchGameDetails = async (id) => {
    // If no API credentials, use sample data
    if (!CLIENT_ID || !ACCESS_TOKEN) {
        game.value = sampleGameData;
        return;
    }

    try {
        game.value = await fetchGame(id);
        console.log(game.value);
        // Reset video state when game changes
        heroVideoReady.value = false;
        // Re-init player logic
        nextTick(() => {
            initializeHeroPlayer();
        });

        if (game.value.similar_games) {
            fetchSimilarGames(game.value.similar_games);
        } else {
            similarGames.value = [];
        }
    } catch (err) {
        console.error("Error fetching game details:", err);
        console.log("Falling back to sample data");
        game.value = sampleGameData;
    }
};

const similarGames = ref([]);

const fetchSimilarGames = async (ids) => {
    if (!ids || ids.length === 0) return;

    // Take first 6 similar games
    const targetIds = ids.slice(0, 6).join(",");

    const requestBody = `fields *, cover.url, platforms.name, platforms.platform_family.name, videos.video_id; where id = (${targetIds});`;

    try {
        const response = await axios({
            method: "POST",
            url: "/api/v4/games",
            data: requestBody,
            headers: {
                "Client-ID": CLIENT_ID,
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        similarGames.value = response.data;
    } catch (err) {
        console.error("Error fetching similar games:", err);
        // Fallback or empty
        similarGames.value = [];
    }
};

const fetchPopularGames = async () => {
    // Use the dedicated composable function
    try {
        const result = await fetchIGDBPopularGames(6); // Fetch 6 to fill the grid if needed
        if (result) {
            popularGames.value = result;
        } else {
            popularGames.value = samplePopularGames;
        }
    } catch (err) {
        console.error("Error loading popular games via hook:", err);
        popularGames.value = samplePopularGames;
    }
};

const fetchTrending = async () => {
    if (!CLIENT_ID || !ACCESS_TOKEN) {
        trendingGames.value = samplePopularGames.slice().reverse();
        return;
    }

    try {
        trendingGames.value = await fetchTrendingGames();
        console.log(trendingGames.value);
    } catch (err) {
        console.error("Error fetching trending games:", err);
        trendingGames.value = samplePopularGames.slice().reverse();
    }
};
const heroPlayerRef = ref(null);
const heroVideoReady = ref(false);

const getEmbedUrl = (videoId) => {
    const baseId = videoId || "";
    // No cookie usage, autoplay, no controls, muted, loop
    return `https://www.youtube-nocookie.com/embed/${baseId}?autoplay=1&enablejsapi=1&controls=0&rel=0&showinfo=0&mute=1&loop=1&playlist=${baseId}`;
};

function initializeHeroPlayer() {
    if (heroPlayerRef.value || !game.value?.videos?.[0]) return;

    // Safety check for YT API
    if (typeof YT === "undefined") {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        setTimeout(initializeHeroPlayer, 1000);
        return;
    }

    const videoId = game.value.videos[0].video_id;
    const iframeId = "hero-player-frame";

    // Wait for the iframe to be in DOM
    nextTick(() => {
        heroPlayerRef.value = new YT.Player(iframeId, {
            events: {
                onReady: (event) => {
                    event.target.mute();
                    event.target.playVideo();
                },
                onStateChange: (event) => {
                    // If playing, show the video
                    if (event.data === YT.PlayerState.PLAYING) {
                        heroVideoReady.value = true;
                    }
                },
            },
        });
    });
}

onUnmounted(() => {
    if (heroPlayerRef.value && heroPlayerRef.value.destroy) {
        heroPlayerRef.value.destroy();
    }
});
const emit = defineEmits(["update:addToCart"]);

const addToCart = (game) => {
    add(game);
    openDrawer();
};
onMounted(() => {
    if (route.params.id) {
        fetchGameDetails(route.params.id);
    }
    fetchPopularGames();
    fetchTrending();
});

watch(
    () => route.params.id,
    (newId) => {
        if (newId) fetchGameDetails(newId);
    }
);
</script>

<template>
    <div class="game-detail-page" v-if="game">
        <!-- Hero Section -->
        <div
            class="hero"
            :style="{
                backgroundImage: `linear-gradient(to right, #1c1b29 10%, rgba(28, 27, 41, 0.8) 50%, rgba(28, 27, 41, 0.4) 100%), url(${getImageUrl(
                    game.screenshots?.[0] || game.cover,
                    't_1080p'
                )})`,
            }"
        >
            <div class="hero-video-container" :class="{ visible: heroVideoReady }">
                <iframe
                    v-if="game.videos?.[0]"
                    id="hero-player-frame"
                    :src="getEmbedUrl(game.videos[0].video_id)"
                    frameborder="0"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <div class="hero-content">
                <!-- Breadcrumb removed as requested -->

                <h1 class="game-title">{{ game.name }}</h1>

                <p class="game-summary">{{ game.summary?.substring(0, 300) }}...</p>

                <div class="game-meta">
                    <div class="rating-row-banner">
                        <span class="score">{{
                            game.rating && game.rating != 0 ? Math.round(game.rating || 0) : "-"
                        }}</span
                        >/100
                    </div>

                    <div class="meta-info">
                        <div class="meta-item">
                            <strong>Published on:</strong>
                            <span>{{ formatDate(game.first_release_date) }}</span>
                        </div>
                        <div class="meta-item">
                            <strong>Genre:</strong>
                            <span>{{
                                game.genres
                                    ?.map((g) => g.name)
                                    .slice(0, 2)
                                    .join(", ")
                            }}</span>
                        </div>
                        <div class="meta-item">
                            <strong>Available For:</strong>
                            <div class="platform-icons-row">
                                <span
                                    v-for="p in game.platforms?.slice(0, 4)"
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

                <div class="actions">
                    <button class="btn btn-primary" @click="addToCart(game)">Buy Now</button>
                    <button class="btn btn-secondary" @click="openReviewDrawer">Game review</button>
                </div>
            </div>

            <div class="sidebar-right">
                <h3><span class="highlight">Similar</span> Games</h3>
                <div class="sidebar-games">
                    <div
                        v-for="popGame in similarGames"
                        :key="popGame.id"
                        class="sidebar-game-card"
                    >
                        <router-link :to="`/game/${popGame.id}`">
                            <img
                                :src="getImageUrl(popGame.cover, 't_cover_big')"
                                alt="Cover"
                                class="sidebar-cover"
                            />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="main-content">
            <!-- Categories
            <section class="section categories">
                <h3>Game Categories</h3>
                <div class="categories-grid">
                    <a
                        v-for="cat in categories"
                        :key="cat.id"
                        :href="cat.link"
                        class="category-card"
                        :style="{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${cat.image})`,
                        }"
                    >
                        <span>{{ cat.name }}</span>
                    </a>
                </div>
            </section>
             -->
            <!-- Trending -->
            <section class="section trending">
                <h3>
                    Trending Games
                    <RouterLink to="/catalog" class="view-all">View All</RouterLink>
                </h3>
                <div class="trending-list">
                    <GameCard v-for="game in trendingGames" :key="game.id" :data="game" />
                </div>
            </section>

            <!-- More Sections placeholders to match     design -->
            <section class="section mixed-grid">
                <div class="game-of-month">
                    <h3>Game Of The Month</h3>
                    <div class="featured-game">
                        <h4>{{ game.name }}</h4>
                        <p>{{ game.summary?.substring(0, 200) }}...</p>
                        <div class="rating-row">
                            <span class="score">{{ Math.round(game.rating || 0) }}</span
                            >/100
                        </div>
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>

                <div class="trailer-gallery">
                    <h3>Trailer & Gallery</h3>
                    <div class="trailer-wrapper">
                        <iframe
                            v-if="game.videos?.[0]"
                            width="100%"
                            height="250"
                            :src="`https://www.youtube.com/embed/${game.videos[0].video_id}`"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>

                <div class="system-reqs">
                    <h3>System Requirements</h3>
                    <div class="reqs-box">
                        <p><strong>OS:</strong> Windows 10 64-bit</p>
                        <p><strong>CPU:</strong> Intel Core i5 / AMD Ryzen 5</p>
                        <p><strong>Memory:</strong> 16GB RAM</p>
                        <p><strong>GPU:</strong> NVIDIA GeForce GTX 1060 / AMD Rx 580</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <div v-else class="loading-container">
        <img src="../assets/logos/logo.png" alt="Loading..." class="loading-logo" />
    </div>
</template>
