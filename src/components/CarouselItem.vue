<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
const props = defineProps(["data", "active"]);
const isHovering = ref(false);

watch(
    () => props.active,
    async (newId, oldId) => {
        console.log(newId);
    }
);
</script>

<template>
    <div class="carousel-card" :class="{ active: props.active }">
        <div class="carousel-card-img">
            <img
                :src="
                    data.cover
                        ? data.cover.url.replace('t_thumb', 't_original')
                        : '/src/assets/missing_cover.png'
                "
                width="200px"
                @mouseenter="isHovering = true"
                @mouseleave="isHovering = false"
                :class="{ 'hidden-fade': isHovering === props.data.id }"
            />
        </div>
        <div class="carousel-card-description">
            <div class="carousel-card-name">{{ props.data.name }}</div>
        </div>
    </div>
</template>

<style>
.carousel-card {
    display: flex;
    flex-direction: column;
    width: 200px;
    max-height: 304px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
}

.active {
    border: #ff0055 solid 2px;
}

.carousel-card:hover {
    transform: scale(1.05);
}

.carousel-card-img {
    height: 100%;
    line-height: 0;
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

.carousel-card-description {
    background: linear-gradient(to top, #29273b, #29273bc2 80%);
    font-size: 14px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: rgb(230, 230, 230);
    position: absolute;
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
    height: 50px;
    bottom: 0;
    width: 100%;
}

.carousel-card:hover .carousel-card-description {
    transform: translateY(0);
}

.carousel-card-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    color: rgb(230, 230, 230);
}

.iframe-embed {
    z-index: 2;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 200%;

    top: -50%;
}

.hidden-fade {
    opacity: 0 !important;
}

.visible-fade {
    opacity: 1 !important;
}
</style>
