import { ref } from "vue";

const isDrawerOpen = ref(false);

export function useDrawerState() {
    const openDrawer = () => {
        isDrawerOpen.value = true;
        console.log(isDrawerOpen);
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
        console.log(isDrawerOpen);
    };

    return {
        isDrawerOpen,
        openDrawer,
        closeDrawer,
    };
}
