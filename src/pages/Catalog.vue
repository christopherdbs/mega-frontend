<script setup>
import { ref, onMounted } from "vue";
import GameCard from "../components/GameCard.vue";
import Pagination from "../components/Pagination.vue";
import Filter from "../components/Filter.vue";
import PlatformNavbar from "../components/PlatformNavbar.vue";
import { useIGDB } from "../composables/useIGDB";
const {
    games,
    currentPage,
    itemsPerPage,
    totalPages,
    filter,
    filtersList,
    family,
    setFamily,
    setCurrentPage,
    setFilter,
    fetchGames,
} = useIGDB();

/*
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
*/

const goToPage = (newPage) => {
    if (newPage <= totalPages.value && newPage >= 1) {
        setCurrentPage(newPage);
    }
};

const sortBy = (newSortValue) => {
    setFilter(newSortValue);
};

const filterBy = (newFilter) => {
    setFamily(newFilter);
};
</script>

<template>
    <PlatformNavbar :family="family" @update:platformFamily="filterBy"></PlatformNavbar>
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
