<script setup>
import { ref, onMounted, computed } from "vue";
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
    sortDirection,
    setFamily,
    setCurrentPage,
    setFilter,
    setSortDirection,
    fetchGames,
} = useIGDB();

const goToPage = (newPage) => {
    if (newPage <= totalPages.value && newPage >= 1) {
        setCurrentPage(newPage);
    }
};

const sortBy = (newSortValue) => {
    setFilter(newSortValue);
};

const changeDirection = () => {
    console.log(sortDirection.value, !sortDirection.value);
    setSortDirection(!sortDirection.value);
};

const filterBy = (newFilter) => {
    setFamily(newFilter);
    setCurrentPage(1);
};

const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
};

const gameRows = computed(() => {
    if (!games.value) return [];
    return chunkArray(games.value, 5);
});
</script>

<template>
    <PlatformNavbar :family="family" @update:platformFamily="filterBy"></PlatformNavbar>
    <div class="catalog-page">
        <h1>Catalog</h1>
        <div id="filters">
            <Filter
                :filters="filtersList"
                :selected="filter"
                @update:filter="sortBy"
                class="sort"
            />
            <button id="sort-direction" @click="changeDirection" v-if="filter !== 'popularity'">
                <i
                    class="fa-solid"
                    :class="{
                        'fa-sort-numeric-up': sortDirection,
                        'fa-sort-numeric-down': !sortDirection,
                    }"
                ></i>
            </button>
        </div>
        <div class="catalog">
            <div class="game-row" v-for="(row, rowIndex) in gameRows" :key="rowIndex">
                <template v-for="game in row" :key="game.id">
                    <GameCard :data="game" v-if="game.videos && game.videos.length > 0" />
                </template>
            </div>
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
    width: 100%;
    margin: auto;
}

.game-row {
    display: flex;
    flex-direction: row;
    margin: auto;
    gap: 20px;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
}

.sort {
    margin-left: 85px;
    margin-bottom: 30px;
}

.current-page {
    background-color: #3a3853;
}

.dots {
    font-size: x-large;
}

#filters {
    display: flex;
    gap: 25px;
}

#sort-direction {
    width: 40px;
    max-height: 40px;
    background-color: #29273b;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 18px;
}
</style>
