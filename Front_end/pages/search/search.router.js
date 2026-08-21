const SEARCH_URL = new URL("./searching/search.html", import.meta.url).href;
const SEARCH_RESULT_URL = new URL("./search_result/search_result.html", import.meta.url);

export function navigateToSearch() {
    window.location.assign(SEARCH_URL);
}

export function navigateToSearchResult(query) {
    const url = new URL(SEARCH_RESULT_URL);
    const normalizedQuery = String(query || "").trim();

    if (normalizedQuery) {
        url.searchParams.set("query", normalizedQuery);
    }

    window.location.assign(url.href);
}

// Global router entry point for #/search and #/search/result?query=... routes.
export function handleSearchRoute(childRoutes = []) {
    const [screen = "search", query = ""] = childRoutes;

    if (screen === "result") {
        navigateToSearchResult(query);
        return;
    }

    navigateToSearch();
}
