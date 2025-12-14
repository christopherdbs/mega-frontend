<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useIGDB } from "../composables/useIGDB";
import { platform_families } from "../utils/platform_families";
const { games, search, setSearch } = useIGDB();
const isSearchOpen = ref(false);
const searchRef = ref(null);
onMounted(() => {
    document.addEventListener("mousedown", handleOutsideClick);
});
onUnmounted(() => {
    document.removeEventListener("mousedown", handleOutsideClick);
});

const handleOutsideClick = (event) => {
    console.log(event);
    if (!isSearchOpen.value) {
        return;
    }
    isSearchOpen.value = false;
};

const closeSearch = () => {
    console.log("ok");
    setSearch("");
    isSearchOpen.value = false;
};
</script>

<template>
    <div class="search">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input
            class="search"
            v-model="search"
            @keyup.enter="setSearch"
            placeholder="Search a game"
            @click="isSearchOpen = true"
        />
        <div class="search-results" :ref="searchRef" v-if="isSearchOpen" @mousedown.stop>
            <div class="search-item" v-for="game in games" @click="closeSearch">
                <RouterLink :to="`/game/${game.id}`">
                    <div class="search-game">
                        <div>
                            <img
                                :src="
                                    game.cover
                                        ? game.cover.url.replace('t_thumb', 't_original')
                                        : '/src/assets/missing_cover.png'
                                "
                            />
                        </div>

                        <div class="search-description">
                            <p class="game-name">{{ game.name }}</p>
                            <p class="game-platform">
                                {{ game.platforms[0].name }}
                            </p>
                            <p class="search-price">{{ game.price.toFixed(2) }} €</p>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    position: relative;
    transition: width 0.2s ease-in-out;
    z-index: 30;
}

.search i {
    position: absolute;
    color: white;
    left: 7px;
}

.search input {
    background-color: #1b1b1b;
    border: #ff0055 solid 1px;
    outline: none;
    border-radius: 14px;
    height: 25px;
    color: white;
    padding-left: 30px;
    z-index: 5;
}

.search input:focus {
    background-color: #ff0055;
}

.search input:focus::placeholder {
    opacity: 0;
}

.search-icon {
    color: white;
    z-index: 10;
}

.search-item img {
    width: 60px;
}

.search-item {
    display: flex;
    padding: 15px;
    height: 100px;
}

.search-item a {
    text-decoration: none;
}

.search-item:hover {
    background-color: #ff0055;
    cursor: pointer;
}

.search-game {
    display: flex;
    color: white;
}

.search-results {
    display: flex;
    flex-direction: column;
    max-height: 500px;
    position: absolute;
    top: 15px;
    padding-top: 15px;
    background-color: #1b1b1b;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    z-index: 3;
    overflow-y: auto;
}

.search-results::-webkit-scrollbar {
    width: 10px;
    height: 8px;
}

.search-results::-webkit-scrollbar-thumb {
    background-color: #ff0055;
    border-radius: 5px;
}

.search-description {
    margin-left: 5px;
}

.search-description .game-platform {
    text-align: left;
}
</style>
