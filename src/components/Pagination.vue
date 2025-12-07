<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["update:page"]);
const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
});

const nextPage = () => {
    if (props.currentPage < props.totalPages) {
        emit("update:page", props.currentPage + 1);
    }
};

const prevPage = () => {
    if (props.currentPage > 1) {
        emit("update:page", props.currentPage - 1);
    }
};

function getEndPagination(totalPages, number) {
    let array = [];
    for (let i = totalPages - number; i < totalPages; i++) {
        array.push(i + 1);
    }
    return array;
}

function goToPage(pageNumber) {
    if (pageNumber <= props.totalPages && pageNumber >= 1) {
        emit("update:page", pageNumber);
    }
}
</script>

<template>
    <div v-if="props.totalPages > 10" class="pagination">
        <div class="page-button" @click="prevPage"><</div>
        <div
            v-if="props.currentPage > 2"
            v-for="(page, i) in props.currentPage == 3 ? 1 : 2"
            :key="page"
            class="page-button"
            @click="goToPage(page)"
        >
            {{ page }}
        </div>
        <span class="dots" v-if="props.currentPage > 4">...</span>
        <template
            v-for="(page, i) in [props.currentPage - 1, props.currentPage, props.currentPage + 1]"
        >
            <div
                :key="page"
                :class="{ 'current-page': page === props.currentPage }"
                class="page-button"
                v-if="page >= 1 && page <= props.totalPages"
                @click="goToPage(page)"
            >
                {{ page }}
            </div>
        </template>

        <span class="dots" v-if="props.currentPage < props.totalPages - 3">...</span>

        <div
            v-if="props.currentPage < props.totalPages - 1"
            v-for="(page, i) in props.currentPage == props.totalPages - 2
                ? getEndPagination(props.totalPages, 1)
                : getEndPagination(props.totalPages, 2)"
            :key="i"
            class="page-button"
            @click="goToPage(page)"
        >
            {{ page }}
        </div>
        <div class="page-button" @click="nextPage">></div>
    </div>
    <div v-else class="pagination">
        <div v-for="(page, i) in props.totalPages" :key="i" class="page-button">
            {{ page }}
        </div>
    </div>
</template>
