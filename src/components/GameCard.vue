<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
const props = defineProps(["data"]);
const price = props;
const isHovering = ref(null);
const playerRef = ref(null);
const iframeReady = ref(false);
const hasPlayedOnce = ref(false);
const isBuffering = ref(true);
const getEmbedUrl = (videoId) => {
    const baseId = videoId || "dQw4w9WgXcQ";
    const currentOrigin = window.location.origin;
    return `https://www.youtube-nocookie.com/embed/${baseId}?autoplay=1&enablejsapi=1&controls=0&rel=0&showinfo=0&mute=1&loop=1&modestbranding=1&playlist=${baseId}&origin=${currentOrigin}`;
};
onMounted(() => {
    if (typeof YT === "undefined") {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    if (props.data.videos && props.data.videos.length > 0) {
        initializePlayer();
    }
});

onUnmounted(() => {
    if (playerRef.value) {
        playerRef.value.destroy();
    }
});

function initializePlayer() {
    if (playerRef.value) {
        return;
    }

    if (typeof YT === "undefined") {
        return setTimeout(initializePlayer, 1000);
    }

    const iframeId = `player-${props.data.id}`;
    const videoId = props.data.videos[0].video_id;
    nextTick(() => {
        playerRef.value = new YT.Player(iframeId, {
            events: {
                onReady: () => {
                    iframeReady.value = true;
                    const playerState = playerRef.value.getPlayerState();
                    playerRef.value.addEventListener("onStateChange", onPlayerStateChange);
                    if (playerState === YT.PlayerState.PLAYING) {
                        changeHasPlayed(iframeId);
                    }
                },
            },
        });
    });
}

const pauseVideo = () => {
    if (iframeReady.value && playerRef.value) {
        playerRef.value.pauseVideo();
    }
};

const playVideo = () => {
    if (iframeReady.value && playerRef.value) {
        playerRef.value.playVideo();
    }
};

const onPlayerStateChange = (event) => {
    const playerState = playerRef.value.getPlayerState();
    console.log(event, playerState);
    if (event.data === YT.PlayerState.PLAYING) {
        changeHasPlayed(event.target.g.id);
    }
};

const changeHasPlayed = (iframeId) => {
    if (!hasPlayedOnce.value) {
        isBuffering.value = false;
        hasPlayedOnce.value = true;
        if (!isHovering.value) pauseVideo();
    }
};

const handleMouseEnter = () => {
    isHovering.value = props.data.id;

    if (iframeReady.value && playerRef.value) {
        const videoId = props.data.videos[0].video_id;
        const playerState = playerRef.value.getPlayerState();
        console.log(playerState);
        if (playerState === YT.PlayerState.PAUSED || playerState === YT.PlayerState.CUED) {
            playVideo();
        }
    }
};

const handleMouseLeave = () => {
    pauseVideo();
    isHovering.value = null;
};

import { useRouter } from "vue-router";
const router = useRouter();
const goToDetail = () => {
    router.push(`/game/${props.data.id}`);
};
console.log(props.data.name, props.data.family);
</script>

<template>
    <div class="relative">
        <div
            class="card"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            @click="goToDetail"
        >
            <div class="card-img">
                <iframe
                    :id="`player-${props.data.id}`"
                    :src="getEmbedUrl(props.data.videos[0].video_id)"
                    :class="{ 'visible-fade': isHovering === props.data.id }"
                    frameborder="0"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    width="100%"
                    height="120%"
                    class="iframe-embed video-element"
                >
                </iframe>
                <img
                    :src="
                        data.cover
                            ? data.cover.url.replace('t_thumb', 't_original')
                            : '/src/assets/missing_cover.png'
                    "
                    width="200px"
                    :class="{ 'hidden-fade': isHovering === props.data.id }"
                />
                <div
                    class="video-overlay"
                    :class="{
                        'visible-overlay': isHovering === props.data.id && isBuffering,
                    }"
                ></div>
            </div>
            <div class="platform-logo" v-if="!isHovering">
                <img
                    v-if="props.data.family?.logo"
                    :src="'/src/assets/logos/' + props.data.family.logo"
                    height="40px"
                />
            </div>
            <div class="card-description" v-if="!isHovering">
                <div class="card-name">{{ props.data.name }}</div>
                <div class="card-price">{{ props.data.price }} €</div>
            </div>
        </div>
    </div>
</template>

<style>
.visible-overlay {
    opacity: 1 !important;
    background-color: #000;
    z-index: 10;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}

.card {
    display: flex;
    flex-direction: column;
    width: 200px;
    max-height: 304px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    transition: width 0.2s ease-in-out;
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
