<script setup>
</script>

<template>
    <div class="loading-container">
        <img src="../assets/logos/logo.png" alt="Loading..." class="loading-logo" />
    </div>
</template>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    /* Default height, can be overridden or adjusted */
    width: 100%;
}

.loading-logo {
    width: 100px;
    height: auto;
    animation: pulseLogo 2s infinite ease-in-out;
    filter: drop-shadow(0 0 15px rgba(255, 0, 85, 0.4));
}

@keyframes pulseLogo {
    0% {
        transform: scale(0.95);
        opacity: 0.6;
    }

    50% {
        transform: scale(1.05);
        opacity: 1;
        filter: drop-shadow(0 0 25px rgba(255, 0, 85, 0.7));
    }

    100% {
        transform: scale(0.95);
        opacity: 0.6;
    }
}
</style>
