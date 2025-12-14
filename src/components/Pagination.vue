<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

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

const pageInput = ref(props.currentPage.toString());

watch(
    () => props.currentPage,
    (newValue) => {
        pageInput.value = newValue.toString();
    }
);

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

const clampQuantity = () => {
    let pageNumber = parseInt(pageInput.value);
    if (pageNumber === null || pageNumber === undefined || isNaN(pageNumber)) {
        return;
    }
    pageNumber = Math.max(1, Math.min(pageNumber, props.totalPages));
    if (pageNumber !== props.currentPage) {
        goToPage(pageNumber);
    }
    pageInput.value = pageNumber.toString();
};
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
    <div id="pagination-input">
        <span>Go to</span>
        <input
            type="number"
            min="1"
            :max="props.totalPages"
            v-model="pageInput"
            id="page-input"
            @keyup.enter="clampQuantity"
            @blur="clampQuantity"
            :placeholder="props.currentPage"
            :aria-label="`Page actuelle: ${props.currentPage} sur ${props.totalPages}`"
        />
        / {{ props.totalPages }}
    </div>
</template>

<style>
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

#pagination-input {
    height: 30px;
    color: white;
    text-align: center;
    margin-top: 10px;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    margin: auto;
    font-size: 20px;
    align-items: center;
}

#page-input {
    border: none;
    outline: none;
    background-color: #29273b;
    text-align: center;
    font-size: 20px;
    color: white;
}
</style>
