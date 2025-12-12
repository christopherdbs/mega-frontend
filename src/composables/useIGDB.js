// useIGDB.js
import { ref, watch, readonly } from "vue";
import { platforms } from "../utils/platforms";
import axios from "axios";

const API_BASE_URL = "/api/v4/games";

export function useIGDB() {
    const data = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const CLIENT_ID = import.meta.env.VITE_IGDB_CLIENT_ID;
    const ACCESS_TOKEN = import.meta.env.VITE_IGDB_ACCESS_TOKEN;
    const games = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const totalPages = ref(1);
    const filter = ref("popularity");
    const filtersList = {
        popularity: "Most Popular",
        rating: "Best Rated",
        first_release_date: "New Releases (Date)",
        hypes: "Most Anticipated",
        total_rating: "Best Critic Score",
        name: "Name (A-Z)",
    };
    const getFamilyStr = () => {
        const platform_ids = platforms.map((objet) => objet.id);
        let str = "(";
        for (let i = 0; i < platform_ids.length; i++) {
            str += i != platform_ids.length - 1 ? platform_ids[i] + ", " : platform_ids[i];
        }
        str += ")";
        return str;
    };

    const executeQuery = async (endpoint, queryBody) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: "POST",
                body: queryBody,
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const result = await response.json();
            isLoading.value = false;
            return result;
        } catch (err) {
            error.value = err.message || "Erreur de récupération";
            isLoading.value = false;
            return null;
        }
    };

    const fetchPopularGames = (limit = 5) => {
        const query = `fields name, cover.url; sort popularity desc; limit ${limit};`;
        return executeQuery("games", query);
    };

    const fetchGames = async () => {
        const currentOffset = (currentPage.value - 1) * itemsPerPage;
        const requestBody =
            "fields *, cover.url, cover.width, cover.height, platforms.name, platforms.platform_family.name, videos.name, videos.video_id; where videos != null & platforms = " +
            getFamilyStr() +
            " & total_rating_count > 75 ; sort " +
            filter.value +
            " desc; limit " +
            itemsPerPage +
            "; offset " +
            currentOffset +
            ";";
        const response = await axios({
            method: "POST",
            url: "/api/v4/games",
            data: requestBody,
            headers: {
                "Client-ID": CLIENT_ID,
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "X-Total-Count": "1",
            },
        });
        games.value = response.data;
        return response;
    };
    watch(
        [currentPage, filter],
        async () => {
            console.log(
                `Dépendance changée : Nouvelle page: ${currentPage.value}, Nouveau filtre: ${filter.value}`
            );
            try {
                const response = await fetchGames();
                console.log(response.headers);
                const totalCount = parseInt(response.headers["x-count"]) || 0;
                totalPages.value = Math.ceil(totalCount / itemsPerPage);
            } catch (err) {
                console.error("Error while fetching games:", err);
            } finally {
            }
        },
        { immediate: true }
    );

    function setCurrentPage(value) {
        currentPage.value = value;
    }

    function setTotalPages(value) {
        totalPages.value = value;
    }

    function setFilter(value) {
        filter.value = value;
    }

    function setGames(value) {
        games.value = value;
    }

    return {
        isLoading: readonly(isLoading),
        error: readonly(error),
        games: readonly(games),
        currentPage: readonly(currentPage),
        itemsPerPage: readonly(itemsPerPage),
        totalPages: readonly(totalPages),
        filter: readonly(filter),
        filtersList: readonly(filtersList),
        platforms,
        setCurrentPage,
        setTotalPages,
        setGames,
        setFilter,
        fetchGames,
    };
}
