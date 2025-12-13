<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { platform_families } from "../utils/platform_families";

const isMounted = ref(false);
const props = defineProps({
    family: {
        type: Number,
        required: true,
    },
});
const emit = defineEmits(["update:platformFamily"]);

onMounted(() => {
    setTimeout(() => {
        isMounted.value = true;
    }, 100);
});

function changeFamily(family) {
    emit("update:platformFamily", family);
}
</script>

<template>
    <div class="relative-nav">
        <div class="platform-nav" :class="{ isMounted: isMounted }">
            <ul class="platform-navbar-links">
                <li
                    class="platform-item"
                    :class="{ currentPlatform: family.id == props.family }"
                    v-for="family in platform_families"
                    @click="changeFamily(family.id)"
                >
                    <span class="platform-icon"
                        ><img :src="`/src/assets/icons/${family.icon}`" alt="icon" /></span
                    >{{ family.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.relative-nav {
    height: 75px;
}

.platform-nav.isMounted {
    top: 75px;
    opacity: 1;
}

.platform-nav {
    display: flex;
    justify-content: center;
    width: 65vw;
    height: 75px;
    background-color: #29273b;
    margin: auto;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    position: absolute;
    align-items: center;
    top: 0px;
    opacity: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    transition: top 0.15s ease-out, opacity 0.35s ease-out;
    z-index: 0;
}

.platform-navbar {
    display: flex;
    align-items: center;
    width: 95%;
    justify-content: space-between;
    margin: 0px;
    padding: 0px;
    color: white;
}

.platform-navbar-links {
    display: flex;
    gap: 100px;
    list-style: none;
}

.platform-navbar-links li {
    color: white;
    font-weight: bold;
    text-decoration: none;
    padding: 10px;
    cursor: pointer;
}

.platform-navbar-links li:hover {
    background-color: #3a3853;
    border-radius: 12px;
}

.platform-navbar-right {
    display: flex;
    gap: 25px;
}

.platform-navbar-right button {
    color: white;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.platform-navbar-right button:hover {
    color: #da1061;
}

.platform-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.platform-icon img {
    width: 25px;
    display: flex;
    align-items: center;
}

.currentPlatform {
    background-color: #3a3853;
    border-radius: 12px;
}
</style>
