const CATEGORY_VIEWS = {
    grid: new URL("./categori_grid_view/categori_grid_view.html", import.meta.url).href,
    full: new URL("./categori_grid_view_full/categori_grid_view_full.html", import.meta.url).href,
    list: new URL("./categori_listview/categori_listview.html", import.meta.url).href
};

const FRONTEND_ENTRY_URL = new URL("../../fashion_store.html", import.meta.url).href;
const PRODUCT_DETAIL_URL = new URL("../product/product.html", import.meta.url).href;

export function navigateToCategoryHome() {
    window.location.assign(`${FRONTEND_ENTRY_URL}#/home`);
}

export function handleCategoryRoute(routeParts = []) {
    const [requestedView = "grid"] = routeParts;
    const viewMap = {
        grid: "grid",
        list: "list",
        full: "full",
        "grid-full": "full"
    };
    navigateToCategoryView(viewMap[requestedView] || "grid");
}

const IMAGE_PATHS = [
    "assets/images/category/category_Grid_view/category1.png",
    "assets/images/category/category_Grid_view/category2.png",
    "assets/images/category/category_Grid_view/category3.png",
    "assets/images/category/category_Grid_view/category4.png"
];

const PRODUCT_CATALOG = [
    { name: "Reversible Angora Cardigan", brand: "21WN", audience: "women", category: "all-apparel", image: IMAGE_PATHS[0] },
    { name: "Cashmere Blend Jacket", brand: "LAMEREI", audience: "women", category: "all-apparel", image: IMAGE_PATHS[1] },
    { name: "Soft Knit Cardigan", brand: "MOHAN", audience: "women", category: "all-apparel", image: IMAGE_PATHS[2] },
    { name: "Oblong Leather Bag", brand: "21WN", audience: "women", category: "bag", image: IMAGE_PATHS[3] },
    { name: "Tailored Outer Layer", brand: "LAMEREI", audience: "man", category: "outer", image: IMAGE_PATHS[1] },
    { name: "Everyday Knitwear", brand: "MOHAN", audience: "kids", category: "knitwear", image: IMAGE_PATHS[2] },
    { name: "Classic Shirt", brand: "21WN", audience: "women", category: "blouse-shirt", image: IMAGE_PATHS[0] },
    { name: "New Season Dress", brand: "LAMEREI", audience: "women", category: "dress", image: IMAGE_PATHS[3] }
];

function titleCase(value) {
    return String(value || "").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getCategoryState(search = window.location.search) {
    const params = new URLSearchParams(search);
    return {
        audience: params.get("audience") || "",
        category: params.get("category") || "",
        type: params.get("type") || "",
        page: Math.min(5, Math.max(1, Number.parseInt(params.get("page"), 10) || 1)),
        filterBy: params.get("filter") || ""
    };
}

export function navigateToCategoryView(view, state = getCategoryState()) {
    const url = new URL(CATEGORY_VIEWS[view] || CATEGORY_VIEWS.grid);
    const params = new URLSearchParams();
    ["audience", "category", "type"].forEach((key) => { if (state[key]) params.set(key, state[key]); });
    if (state.filterBy) params.set("filter", state.filterBy);
    if (state.page && state.page !== 1) params.set("page", String(state.page));
    url.search = params.toString();
    window.location.assign(url.href);
}

function updateState(nextState) {
    const params = new URLSearchParams();
    ["audience", "category", "type"].forEach((key) => { if (nextState[key]) params.set(key, nextState[key]); });
    if (nextState.filterBy) params.set("filter", nextState.filterBy);
    if (nextState.page > 1) params.set("page", String(nextState.page));
    history.pushState(null, "", `${window.location.pathname}${params.toString() ? `?${params}` : ""}`);
}

function productsForPage(state, layout) {
    const selectedCategory = state.type || state.category;
    let matched = !selectedCategory || selectedCategory === "new" || selectedCategory === "all-apparel"
        ? PRODUCT_CATALOG.filter((product) => product.category === "all-apparel")
        : PRODUCT_CATALOG.filter((product) => product.category === selectedCategory);
    if (state.filterBy === "audience" && state.audience) {
        matched = PRODUCT_CATALOG.filter((product) => product.audience === state.audience).slice(0, 3);
    }
    if (state.filterBy === "type" && state.type) {
        matched = state.type === "all-apparel"
            ? PRODUCT_CATALOG.filter((product) => product.audience === (state.audience || "women")).slice(0, 3)
            : PRODUCT_CATALOG.filter((product) => product.category === state.type).slice(0, 3);
    }
    const products = matched.length ? matched : PRODUCT_CATALOG.filter((product) => product.category === "all-apparel");
    const amount = state.filterBy ? Math.min(3, products.length) : (layout === "full" ? 5 : 10);
    return Array.from({ length: amount }, (_, index) => products[(index + (state.page - 1) * 2) % products.length]);
}

function productMarkup(product, layout, index) {
    const name = `${product.name} ${index + 1}`;
    const data = `data-product-name="${product.name}" data-product-image="${product.image}"`;
    if (layout === "list") return `<article class="product-card-list" ${data} tabindex="0"><div class="product-img-wrap"><img src="${product.image}" alt="${name}"></div><div class="product-info"><div class="product-meta"><span class="product-brand">${product.brand}</span><h4 class="product-name">${name}</h4><p class="product-price">$120</p><span class="product-rating">★ 4.8 Ratings</span></div><div class="product-sizes"><span class="size-label">Size</span><div class="size-options"><button type="button" class="size-btn">S</button><button type="button" class="size-btn">M</button><button type="button" class="size-btn">L</button></div></div></div><button class="wishlist-btn" type="button" aria-label="Add ${name} to wishlist">♡</button></article>`;
    return `<article class="product-card" ${data} tabindex="0"><div class="product-img-wrap"><img src="${product.image}" alt="${name}"><button class="wishlist-btn" type="button" aria-label="Add ${name} to wishlist">♡</button></div><div class="product-info"><span class="product-brand">${product.brand}</span><h4 class="product-name">${name}</h4><p class="product-price">$120</p></div></article>`;
}

function openFullScreenImage(source, alt) {
    const viewer = document.createElement("div");
    viewer.className = "category-image-viewer";
    viewer.innerHTML = `<button class="image-viewer-close" type="button" aria-label="Close full screen image">&times;</button><img src="${source}" alt="${alt}">`;
    const close = () => viewer.remove();
    viewer.addEventListener("click", (event) => { if (event.target === viewer) close(); });
    viewer.querySelector(".image-viewer-close").addEventListener("click", close);
    document.addEventListener("keydown", function onKeyDown(event) {
        if (event.key !== "Escape") return;
        close();
        document.removeEventListener("keydown", onKeyDown);
    });
    document.body.append(viewer);
    viewer.querySelector(".image-viewer-close").focus();
}

function openProductDetail(card) {
    const url = new URL(PRODUCT_DETAIL_URL);
    url.searchParams.set("product", card.dataset.productName);
    url.searchParams.set("image", card.dataset.productImage);
    window.location.assign(url.href);
}

function renderTagsLegacy(container, state, rerender) {
    const tags = [["audience", state.audience], ["category", state.category], ["type", state.type]].filter(([, value]) => value);
    container.style.display = tags.length ? "flex" : "none";
    container.innerHTML = tags.map(([key, value]) => `<span class="tag"><button class="tag-filter" type="button" data-filter-key="${key}">${titleCase(value)}</button><button class="remove-tag" type="button" data-filter-key="${key}" aria-label="Remove ${titleCase(value)} filter">×</button></span>`).join("");
    container.querySelectorAll(".tag-filter").forEach((button) => button.addEventListener("click", () => {
        updateState({ ...state, filterBy: button.dataset.filterKey, page: 1 });
        rerender();
    }));
    container.querySelectorAll(".remove-tag").forEach((button) => button.addEventListener("click", () => {
        updateState({ ...state, [button.dataset.filterKey]: "", filterBy: state.filterBy === button.dataset.filterKey ? "" : state.filterBy, page: 1 });
        rerender();
    }));
}

function renderTags(container, state, rerender) {
    const tags = [["audience", state.audience], ["category", state.category], ["type", state.type]]
        .filter(([, value]) => value);

    container.style.display = tags.length ? "flex" : "none";
    container.innerHTML = tags.map(([key, value]) => {
        const label = titleCase(value);
        const isSelected = state.filterBy === key;
        return `<span class="tag${isSelected ? " is-selected" : ""}"><button class="tag-filter" type="button" data-filter-key="${key}" aria-pressed="${isSelected}">${label}</button><button class="remove-tag" type="button" data-filter-key="${key}" aria-label="Remove ${label} filter">&times;</button></span>`;
    }).join("");

    container.querySelectorAll(".tag-filter").forEach((button) => button.addEventListener("click", () => {
        updateState({ ...state, filterBy: button.dataset.filterKey, page: 1 });
        rerender();
    }));
    container.querySelectorAll(".remove-tag").forEach((button) => button.addEventListener("click", () => {
        const key = button.dataset.filterKey;
        updateState({ ...state, [key]: "", filterBy: state.filterBy === key ? "" : state.filterBy, page: 1 });
        rerender();
    }));
}

export function initCategoryPage({ layout, productSelector }) {
    const rerender = () => {
        const state = getCategoryState();
        const productContainer = document.querySelector(productSelector);
        if (productContainer) {
            productContainer.innerHTML = productsForPage(state, layout).map((product, index) => productMarkup(product, layout, index)).join("");
            productContainer.querySelectorAll(".product-card, .product-card-list").forEach((card) => {
                const openCard = (event) => {
                    if (event.target.closest("button")) return;
                    if (layout === "full") openFullScreenImage(card.dataset.productImage, card.dataset.productName);
                    else openProductDetail(card);
                };
                card.addEventListener("click", openCard);
                card.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openCard(event);
                    }
                });
            });
        }
        const tagContainer = document.querySelector(".filter-tags");
        if (tagContainer) renderTags(tagContainer, state, rerender);
        document.querySelectorAll(".page-item").forEach((button) => button.classList.toggle("active", Number(button.textContent) === state.page));
    };

    document.querySelector(".btn-dropdown")?.addEventListener("click", () => {
        updateState({ audience: "women", category: "", type: "all-apparel", filterBy: "", page: 1 });
        rerender();
    });
    const viewButton = document.querySelector("[data-category-view]");
    const filterButton = document.querySelector("[data-category-filter]");
    viewButton?.addEventListener("click", () => navigateToCategoryView(viewButton.dataset.categoryView));
    filterButton?.addEventListener("click", () => navigateToCategoryView(filterButton.dataset.categoryFilter));
    document.querySelectorAll(".page-item").forEach((button) => button.addEventListener("click", () => {
        const state = getCategoryState();
        const page = button.classList.contains("next") ? (state.page % 5) + 1 : Number(button.textContent);
        if (!page) return;
        updateState({ ...state, page }); rerender();
        document.querySelector(productSelector)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    window.addEventListener("popstate", rerender);
    rerender();
}
