import { ref } from "vue";

const cartItems = ref(JSON.parse(localStorage.getItem("cart") || "[]"));

export function useStorage() {
    const saveItems = (items) => {
        localStorage.setItem("cart", JSON.stringify(items));
        cartItems.value = items;
    };
    const add = (game) => {
        console.log(game);
        if (!cartItems.value.find((item) => item.id == game.id)) {
            game.quantity = 1;
            cartItems.value.push(game);
        }
        saveItems(cartItems.value);
    };

    const remove = (gameId) => {
        const newItems = cartItems.value.filter((item) => item.id !== gameId);
        saveItems(newItems);
    };

    const getItems = () => {
        return cartItems;
    };

    const updateQuantity = (gameId, newQuantity) => {
        const index = cartItems.value.findIndex((item) => item.id === gameId);

        if (index !== -1) {
            const newItems = cartItems.value.map((item) => {
                if (item.id === gameId) {
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }

                return item;
            });
            console.log(newItems);
            saveItems(newItems);
        }
    };

    return {
        add,
        getItems,
        remove,
        updateQuantity,
    };
}
