import { ref } from "vue";

const isDrawerOpen = ref(false);

export function useReviewDrawerState() {
    const openDrawer = () => {
        isDrawerOpen.value = true;
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
    };

    return {
        isDrawerOpen,
        openDrawer,
        closeDrawer,
    };
}
