<script setup>
import { defineProps, defineEmits, ref , onMounted, onUnmounted } from "vue";

const emit = defineEmits(["update:filter"]);
const props = defineProps({
    filters: {
        type: Object,
        required: true,
    },
    selected: {
        type: String,
        required: true,
    },
});

const open = ref(false);

const filterBy = (filter) => {
    toggleMenu();
    emit("update:filter", filter);
};

const toggleMenu = () => {
    open.value = !open.value;
};
const sortRef = ref(null);
const handleOutsideClick = (event) => {
    console.log(event);
    if (!open.value) {
        return;
    }
    if (sortRef.value && sortRef.value.contains(event.target)) {
        return; 
    }
    open.value = false;
};
onMounted(() => {
    document.addEventListener("mousedown", handleOutsideClick);
});
onUnmounted(() => {
    document.removeEventListener("mousedown", handleOutsideClick);
});
</script>

<template>
    <div class="filter" ref="sortRef">
        <div @click="toggleMenu" class="selected" :class="{closed: !open}"><span>{{ props.filters[props.selected] }}</span><span>{{open ? "&#9650" : "&#9660"}}</span> </div>
        <ul v-if="open" >
            <li
                v-for="(label, elt) in props.filters"
                :key="elt"
                :value="elt"
                @click="filterBy(elt)"
                class="filter-elt"
            >
                {{ label }}
            </li>
        </ul>
    </div>
</template>

<style>
.filter {
    width: 200px;
    background-color: #29273b;
    color: white;
    text-align: center;
    border-top-left-radius:12px;
    border-top-right-radius:12px;
    position: relative;
}

.closed {
    border-bottom-left-radius:12px!important;
    border-bottom-right-radius:12px!important;
}

.selected {
    display: flex;
    justify-content: space-between;
    margin: auto;
    height: 20px;
    line-height: 20px;
    padding: 10px;
}

.filter-elt {
    background-color: #29273b;
    width: 180px;
    height: 50px;
    color: white;
    text-align: center;
     display: flex;
    margin: auto;
    height: 20px;
    line-height: 20px;
    padding: 10px;
}

.filter-elt:hover {
    background-color: #3a3853;
}

.filter ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 20;
    z-index: 15;
    border-bottom-left-radius:12px;
    border-bottom-right-radius:12px;
    overflow: hidden;

}
</style>
