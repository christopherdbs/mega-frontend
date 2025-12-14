<script setup>
import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    nextTick,
    watch,
    defineEmits,
    defineProps,
} from "vue";
import CarouselItem from "./CarouselItem.vue";
import { useIGDB } from "../composables/useIGDB";
const props = defineProps(["data", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const activeGame = computed(() => {
    if (props.data && Array.isArray(props.data) && props.data.length > 0) {
        const index = props.modelValue;

        if (index >= 0 && index < props.data.length) {
            return props.data[index];
        }
    }

    return null;
});

watch(
    () => props.data, // 1. Source à observer
    async (newId, oldId) => {
        // 2. Fonction de rappel
        console.log(newId);
    } // Optionnel : exécute le watch immédiatement au montage
);

const changeIndex = (index) => {
    if (index >= 0 && index < 5) emit("update:modelValue", index);
    else if (index < 0) emit("update:modelValue", 4);
    else if (index > 5) emit("update:modelValue", 0);
};
</script>

<template>
    <div class="carousel">
        <div class="carousel-buttons">
            <button class="carousel-button" @click="changeIndex(props.modelValue - 1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button class="carousel-button" @click="changeIndex(props.modelValue + 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
        <div class="game-row">
            <template v-for="game in props.data" :key="game.id">
                <RouterLink :to="`/game/${game.id}`"
                    ><CarouselItem
                        :data="game"
                        :active="activeGame.id === game.id"
                        v-if="game.cover"
                /></RouterLink>
            </template>
        </div>
    </div>
</template>

<style>
.carousel-buttons {
    display: flex;
    gap: 20px;
    margin-left: 30px;
}

.carousel-button {
    border: white solid 1px;
    background: none;
    color: white;
    font-size: 25px;
    border-radius: 12px;
}

.carousel {
    display: flex;
    flex-direction: column;
    width: 60%;
    max-height: 350px;
    border-radius: 12px;
    position: absolute;
    right: 0;
    bottom: 0;
    gap: 15px;
}

.card:hover {
    width: 540px;
    height: 304px;
    transition: width 0.2s ease-in-out;
    cursor: pointer;
}
.card-img {
    height: 100%;
    display: inline-block;
    line-height: 0;
    opacity: 1;
    overflow: hidden;
}

.platform-logo {
    position: absolute;
    z-index: 5;
    margin: 5px;
    padding: 0px;
    border-radius: 100%;
    width: 40px;
    height: 40px;
}

.card-description {
    background-color: #29273b;
    font-size: 14px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: rgb(230, 230, 230);
}

.card-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70%;
    color: rgb(230, 230, 230);
}
</style>
