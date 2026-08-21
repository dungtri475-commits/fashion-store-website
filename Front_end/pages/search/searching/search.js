import { navigateToSearchResult } from "../search.router.js";

const form = document.querySelector(".search-form");
const input = document.querySelector("#search-input");
const clearButton = document.querySelector(".clear-button");
const backButton = document.querySelector(".back-button");

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim();
    if (query) {
        navigateToSearchResult(query);
    }
});

clearButton?.addEventListener("click", () => {
    input.value = "";
    input.focus();
});

backButton?.addEventListener("click", () => {
    window.location.assign(new URL("../../../fashion_store.html#/home", import.meta.url).href);
});
