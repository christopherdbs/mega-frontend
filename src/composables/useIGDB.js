// useIGDB.js
import { ref, watch, readonly, computed } from "vue";
import { platforms } from "../utils/platforms";
import { platform_families } from "../utils/platform_families";

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
    const family = ref(0);
    const search = ref("");
    const sortDirection = ref(true);
    const MIN_PRICE = 20;
    const MAX_PRICE = 80;
    const MAX_AGE_DEPRECIATION_YEARS = 5;
    const DEPRECIATION_RATE_PER_YEAR = 0.16;

    const platformsFiltered = computed(() => {
        if (family.value != 0) {
            return platforms
                .filter((platform) => platform.family == family.value)
                .map((platform) => platform.id);
        } else {
            return platforms.map((objet) => objet.id);
        }
    });
    const filtersList = {
        popularity: "Most Popular",
        rating: "Best Rated",
        first_release_date: "New Releases (Date)",
        hypes: "Most Anticipated",
        total_rating: "Best Critic Score",
        name: "Name (A-Z)",
    };
    const getFamilyStr = (platform_ids) => {
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

    const filterPlatformsInGames = () => {
        if (!games.value) {
            return games.value;
        }
        games.value = games.value.map((game) => {
            const filteredGamePlatforms = game.platforms.filter((p) =>
                platformsFiltered.value.includes(p.id)
            );
            let familyInfo = { id: null, logo: null };
            if (family.value != 0) {
                familyInfo.id = family.value;
                familyInfo.logo = platform_families.find((f) => f.id == family.value).logo;
            } else {
                const primaryPlatformId = filteredGamePlatforms[0].id;
                const platformRef = platforms.find((p) => p.id === primaryPlatformId);
                familyInfo.id = platformRef.family;
                familyInfo.logo = platform_families.find((f) => f.id == platformRef.family).logo;
            }
            return {
                ...game,
                platforms: filteredGamePlatforms,
                family: familyInfo,
            };
        });
    };

    function addPrice() {
        if (!games.value) {
            return games.value;
        }
        games.value = games.value.map((game) => {
            return {
                ...game,
                price: calculatePrice(game),
            };
        });
    }

    function calculatePrice(game) {
        if (
            !game ||
            typeof game.rating !== "number" ||
            typeof game.first_release_date !== "number"
        ) {
            return (MIN_PRICE + MAX_PRICE) / 2 - 0.01;
        }

        const rating = Math.max(0, Math.min(100, game.rating));
        const priceRange = MAX_PRICE - MIN_PRICE;
        const basePrice = (rating / 100) * priceRange + MIN_PRICE;
        const releaseDate = new Date(game.first_release_date * 1000);
        const today = new Date();
        const diffTime = Math.abs(today - releaseDate);
        const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
        const ageForDepreciation = Math.min(diffYears, MAX_AGE_DEPRECIATION_YEARS);
        const totalDepreciationRate = ageForDepreciation * DEPRECIATION_RATE_PER_YEAR;
        const depreciationAmount = basePrice * totalDepreciationRate;
        let finalPrice = basePrice - depreciationAmount;
        finalPrice = Math.max(3.99, finalPrice);

        return parseFloat(finalPrice.toFixed(2));
    }
    const fetchGames = async () => {
        const currentOffset = (currentPage.value - 1) * itemsPerPage;

        const requestBody =
            (search.value != "" ? 'search "' + search.value + '";' : "") +
            " fields *, cover.url, cover.width, cover.height, platforms.name, platforms.platform_family.name, videos.name, videos.video_id; where videos != null & platforms = " +
            getFamilyStr(platformsFiltered.value) +
            " & total_rating_count > 75 ; " +
            (search.value != ""
                ? ""
                : "sort " + filter.value + " " + (sortDirection.value ? "asc" : "desc") + "; ") +
            "limit " +
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
        filterPlatformsInGames();
        addPrice();
        return response;
    };
    watch(
        [currentPage, filter, family, search, sortDirection],
        async () => {
            try {
                const response = await fetchGames();
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

    function setSortDirection(value) {
        sortDirection.value = value;
    }

    function setFamily(value) {
        family.value = value;
    }

    function setGames(value) {
        games.value = value;
    }

    function setSearch(value) {
        search.value = value;
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
        platforms: readonly(platforms),
        family: readonly(family),
        sortDirection: readonly(sortDirection),
        search,
        setFamily,
        setCurrentPage,
        setTotalPages,
        setGames,
        setFilter,
        setSearch,
        setSortDirection,
        fetchGames,
        fetchPopularGames,
        calculatePrice,
    };
}
