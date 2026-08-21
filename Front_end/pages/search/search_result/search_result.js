import { getAllProducts } from "../../../services/product.service.js";
import { navigateToProduct } from "../../product/product.router.js";
import { navigateToSearchResult } from "../search.router.js";

const PRODUCT_PAGE_URL = new URL("../../product/product.html", import.meta.url).href;
const input = document.querySelector("#result-search-input");
const form = document.querySelector(".search-form");
const summary = document.querySelector(".result-summary");
const productGrid = document.querySelector(".product-grid");
const query = new URLSearchParams(window.location.search).get("query")?.trim() || "";

// Bubble Sort: su dung de sap xep san pham voi complexity o(n)
export function bubbleSortProducts(products) {
    const sortedProducts = [...products];

    for (let last = sortedProducts.length - 1; last > 0; last -= 1) {
        let swapped = false;

        for (let index = 0; index < last; index += 1) {
            const currentName = sortedProducts[index].name.toLocaleLowerCase();
            const nextName = sortedProducts[index + 1].name.toLocaleLowerCase();

            if (currentName > nextName) {
                [sortedProducts[index], sortedProducts[index + 1]] = [
                    sortedProducts[index + 1],
                    sortedProducts[index]
                ];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return sortedProducts;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        "\"": "&quot;"
    }[character]));
}

// loc san pham co cung name/ brand/ category/ subCategory/ colors
function findProducts(keyword) {
    const normalizedKeyword = keyword.toLocaleLowerCase();

    // ket qua loc dua qua bubbleSortProduct() de sap xep
    return bubbleSortProducts(getAllProducts().filter((product) => {
        const searchableText = [
            product.name,
            product.brand,
            product.category,
            product.subCategory,
            product.colours?.join(" ")
        ].join(" ").toLocaleLowerCase();

        return searchableText.includes(normalizedKeyword); // kiem tra tu khoa co khop khong
    }));
}

function productCard(product) {
    const imagePath = product.thumbnail || product.images?.[0] || "";
    const imageUrl = new URL(imagePath, PRODUCT_PAGE_URL).href;

    return `
        <article class="product-card">
            <button type="button" class="product-link" data-product-id="${escapeHtml(product.id)}">
                <img src="${imageUrl}" alt="${escapeHtml(product.name)}">
                <span class="product-brand">${escapeHtml(product.brand)}</span>
                <span class="product-name">${escapeHtml(product.name)}</span>
                <strong>$${Number(product.price).toFixed(0)}</strong>
            </button>
        </article>
    `;
}

function renderResults(keyword) {
    const matches = keyword ? findProducts(keyword) : [];
    input.value = keyword;
    summary.textContent = keyword
        ? `${matches.length} RESULT${matches.length === 1 ? "" : "S"} FOR “${keyword.toUpperCase()}”`
        : "NHẬP TỪ KHÓA ĐỂ TÌM SẢN PHẨM.";
    productGrid.innerHTML = matches.length
        ? matches.map(productCard).join("")
        : "<p class=\"empty-state\">Không tìm thấy sản phẩm phù hợp.</p>";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    navigateToSearchResult(input.value.trim());
});

productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".product-link");
    if (!button) return;

    const product = getAllProducts().find(({ id }) => id === button.dataset.productId);
    if (product) navigateToProduct(product);
});

renderResults(query);
