<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import GameCard from "../components/GameCard.vue";
import Pagination from "../components/Pagination.vue";
import Filter from "../components/Filter.vue";
import { platforms } from "../utils/platforms";

const CLIENT_ID = import.meta.env.VITE_IGDB_CLIENT_ID;
const ACCESS_TOKEN = import.meta.env.VITE_IGDB_ACCESS_TOKEN;
const games = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(1);
const filter = ref("popularity");

const pc_platforms_ids = [6, 3, 14, 92];

const getFamilyStr = () => {
    const platform_ids = [...platforms.map((objet) => objet.id), ...pc_platforms_ids];
    let str = "(";
    for (let i = 0; i < platform_ids.length; i++) {
        str += i != platform_ids.length - 1 ? platform_ids[i] + ", " : platform_ids[i];
    }
    str += ")";
    return str;
};

const fetchGames = async () => {
    const currentOffset = (currentPage.value - 1) * itemsPerPage;
    const requestBody =
        "fields *, cover.url, cover.width, cover.height, platforms.name, platforms.platform_family.name, videos.name, videos.video_id; where videos != null & platforms = " +
        getFamilyStr() +
        "; sort " +
        filter.value +
        " desc; limit " +
        itemsPerPage +
        "; offset " +
        currentOffset +
        ";";
    const response = await axios({
        method: "POST",
        url: "/api/v4/games",
        data: requestBody,
        headers: {
            "Client-ID": CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "X-Total-Count": "1",
        },
    });
    games.value = response.data;
    return response;
};

onMounted(async () => {
    try {
        const response = await fetchGames();
        const totalCount = parseInt(response.headers["x-count"]) || 0;
        totalPages.value = Math.ceil(totalCount / itemsPerPage);
    } catch (err) {
        console.error("Error while fetching games:", err);
    } finally {
    }
});

const goToPage = (newPage) => {
    if (newPage <= totalPages.value && newPage >= 1) {
        currentPage.value = newPage;
        fetchGames();
    }
};

const sortBy = (newFilter) => {
    filter.value = newFilter;
    fetchGames();
};

const filtersList = {
    popularity: "Most Popular",
    rating: "Best Rated",
    first_release_date: "New Releases (Date)",
    hypes: "Most Anticipated",
    total_rating: "Best Critic Score",
    name: "Name (A-Z)",
};
</script>

<template>
    <div class="catalog-page">
        <h1>Catalog</h1>
        <Filter :filters="filtersList" :selected="filter" @update:filter="sortBy" class="sort" />
        <div class="catalog">
            <template v-for="game in games" :key="game.id">
                <GameCard :data="game" v-if="game.videos && game.videos.length > 0" />
            </template>
        </div>
        <div>
            <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                @update:page="goToPage"
            />
        </div>
    </div>
</template>

<style>
.catalog-page {
    width: 65vw;
    margin: auto;
}

.catalog-page h1 {
    text-align: center;
    color: white;
}
.catalog {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
    gap: 20px;
    justify-content: center;
}

.sort {
    margin-left: 85px;
    margin-bottom: 30px;
}

.pagination {
    height: 50px;
    color: white;
    text-align: center;
    margin-top: 10px;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    margin: auto;
}

.page-button {
    background-color: #29273b;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    text-align: center;

    font-size: large;
    font-weight: bold;
    border-radius: 12%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.current-page {
    background-color: #3a3853;
}

.dots {
    font-size: x-large;
}
</style>
