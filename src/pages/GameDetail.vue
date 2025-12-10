<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import GameCard from "../components/GameCard.vue";

const route = useRoute();
const game = ref(null);
const popularGames = ref([]);
const trendingGames = ref([]);
const categories = ref([
    { id: 1, name: "Sports & Racing", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.png" }, // Placeholder
    { id: 2, name: "RPG", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.png" },
    { id: 3, name: "Adventure", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tamu.png" },
    { id: 4, name: "Strategy", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vec.png" },
    { id: 5, name: "Survival", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ft5.png" },
    { id: 6, name: "Action", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7x.png" },
]);

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
    const requestBody = `fields *, cover.url, cover.width, cover.height, screenshots.url, screenshots.width, screenshots.height, videos.video_id, platforms.name, platforms.platform_family.name, genres.name, involved_companies.company.name; where id = ${id};`;
    
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
        game.value = response.data[0];
    } catch (err) {
        console.error("Error fetching game details:", err);
    }
};

const fetchPopularGames = async () => {
    const requestBody = `fields *, cover.url, platforms.name, platforms.platform_family.name, videos.video_id; sort popularity desc; limit 5; where videos != null;`;
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
        popularGames.value = response.data;
    } catch (err) {
        console.error("Error fetching popular games:", err);
    }
};

const fetchTrendingGames = async () => {
     const requestBody = `fields *, cover.url, platforms.name, platforms.platform_family.name, videos.video_id; sort hypes desc; limit 5; where videos != null;`;
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
        trendingGames.value = response.data;
    } catch (err) {
        console.error("Error fetching trending games:", err);
    }
};

onMounted(() => {
    if (route.params.id) {
        fetchGameDetails(route.params.id);
    }
    fetchPopularGames();
    fetchTrendingGames();
});

watch(() => route.params.id, (newId) => {
   if(newId) fetchGameDetails(newId);
});

</script>

<template>
    <div class="game-detail-page" v-if="game">
        <!-- Hero Section -->
        <div class="hero" :style="{ backgroundImage: `linear-gradient(to right, #1c1b29 10%, rgba(28, 27, 41, 0.8) 50%, rgba(28, 27, 41, 0.4) 100%), url(${getImageUrl(game.screenshots?.[0] || game.cover, 't_1080p')})` }">
            <div class="hero-content">
                <div class="breadcrumb">
                    <span>Home</span> > <span>Store</span> > <span>{{ game.name }}</span>
                </div>
                
                <h1 class="game-title">{{ game.name }}</h1>
                
                <p class="game-summary">{{ game.summary?.substring(0, 300) }}...</p>
                
                <div class="game-meta">
                    <div class="rating-box">
                        <div class="rating-circle">
                             <svg viewBox="0 0 36 36" class="circular-chart">
                                <path class="circle-bg"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path class="circle"
                                    :stroke-dasharray="`${Math.round(game.rating || 0)}, 100`"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.35" class="percentage">{{ Math.round(game.rating || 0) }}</text>
                            </svg>
                        </div>
                        <span>/100</span>
                    </div>
                    
                    <div class="meta-info">
                        <div class="meta-item">
                           <i class="fas fa-calendar-alt"></i>
                           <span>{{ formatDate(game.first_release_date) }}</span>
                        </div>
                         <div class="meta-item">
                           <strong>Available For:</strong>
                           <span>{{ game.platforms?.map(p => p.name).slice(0, 3).join(', ') }}</span>
                        </div>
                         <div class="meta-item">
                           <strong>Genre:</strong>
                           <span>{{ game.genres?.map(g => g.name).slice(0, 2).join(', ') }}</span>
                        </div>
                    </div>
                </div>

                <div class="platform-tags">
                     <span v-for="platform in game.platforms?.slice(0, 3)" :key="platform.id" class="platform-tag">{{ platform.name }}</span>
                </div>

                <div class="actions">
                    <button class="btn btn-primary">Buy Now</button>
                    <button class="btn btn-secondary">Game review</button>
                </div>
            </div>

            <div class="sidebar-right">
                <h3>The Most <span class="highlight">Popular</span> Games</h3>
                <div class="sidebar-games">
                    <div v-for="popGame in popularGames" :key="popGame.id" class="sidebar-game-card">
                         <img :src="getImageUrl(popGame.cover, 't_cover_big')" alt="Cover" class="sidebar-cover">
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="main-content">
             <!-- Categories -->
            <section class="section categories">
                <h3>Game Categories</h3>
                <div class="categories-grid">
                     <div v-for="cat in categories" :key="cat.id" class="category-card" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${cat.image})` }">
                         <span>{{ cat.name }}</span>
                     </div>
                </div>
            </section>

             <!-- Trending -->
            <section class="section trending">
                <h3>Trending Games <a href="#" class="view-all">View All ></a></h3>
                <div class="trending-list">
                      <GameCard v-for="game in trendingGames" :key="game.id" :data="game" />
                </div>
            </section>
            
            <!-- More Sections placeholders to match design -->
             <section class="section mixed-grid">
                 <div class="game-of-month">
                     <h3>Game Of The Month</h3>
                     <div class="featured-game">
                         <h4>{{ game.name }}</h4>
                         <p>{{ game.summary?.substring(0, 200) }}...</p>
                         <div class="rating-row">
                             <span class="score">{{ Math.round(game.rating || 0) }}</span>/100
                         </div>
                         <button class="btn btn-primary">Buy Now</button>
                     </div>
                 </div>
                 
                 <div class="trailer-gallery">
                      <h3>Trailer & Gallery</h3>
                      <div class="trailer-wrapper">
                            <iframe v-if="game.videos?.[0]" width="100%" height="250" :src="`https://www.youtube.com/embed/${game.videos[0].video_id}`" frameborder="0" allowfullscreen></iframe>
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
    <div v-else class="loading">
        Loading...
    </div>
</template>

<style scoped>
.game-detail-page {
    color: white;
    background-color: #1c1b29;
}

.hero {
    display: flex;
    justify-content: space-between;
    padding: 100px 5% 50px 5%;
    background-size: cover;
    background-position: center;
    position: relative;
    min-height: 80vh;
}

.hero-content {
    max-width: 50%;
    z-index: 1;
}

.breadcrumb {
    color: #aaa;
    margin-bottom: 20px;
    font-size: 0.9em;
}

.game-title {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.1;
}

.game-summary {
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 30px;
    max-width: 600px;
}

.game-meta {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
}

.rating-box {
    display: flex;
    align-items: center;
    gap: 10px;
}

.rating-circle {
    width: 50px;
    height: 50px;
}

.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 250px;
}

.circle-bg {
  fill: none;
  stroke: #444;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke: #ffbd17; 
}

.percentage {
  fill: #fff;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 0.8em;
  text-anchor: middle;
}

.meta-info {
    display: flex;
    gap: 20px;
    font-size: 0.9em;
}

.meta-item {
    display: flex;
    flex-direction: column;
}

.meta-item strong {
    color: #888;
    margin-bottom: 5px;
}

.platform-tags {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
}

.platform-tag {
    border: 1px solid #555;
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 0.8em;
    color: #ddd;
    text-transform: uppercase;
}

.actions {
    display: flex;
    gap: 20px;
}

.btn {
    padding: 12px 30px;
    border-radius: 25px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.9em;
    transition: transform 0.2s;
}

.btn:hover {
    transform: scale(1.05);
}

.btn-primary {
    background: #ff0055;
    color: white;
    background: linear-gradient(90deg, #ff0055 0%, #ff0077 100%);
}

.btn-secondary {
    background: transparent;
    border: 1px solid #555;
    color: white;
}

.sidebar-right {
    width: 300px;
    background: rgba(0,0,0,0.3);
    padding: 20px;
    border-radius: 15px;
    height: fit-content;
}

.sidebar-right h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.1em;
}

.highlight {
    color: #ff0055;
}

.sidebar-games {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns like design? Actually design looks like row of small posters */
    gap: 10px;
}
.sidebar-game-card img {
    width: 100%;
    border-radius: 8px;
    aspect-ratio: 3/4;
    object-fit: cover;
}


.main-content {
    padding: 50px 5%;
}

.section {
    margin-bottom: 60px;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.category-card {
    height: 120px;
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    display: flex;
    align-items: flex-end;
    padding: 15px;
    font-weight: bold;
    transition: transform 0.2s;
    cursor: pointer;
}
.category-card:hover {
    transform: translateY(-5px);
}

.trending-list {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding-bottom: 20px;
}

.mixed-grid {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 30px;
}
</style>
