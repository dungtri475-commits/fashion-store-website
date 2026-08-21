const PRODUCT_ENTRY_URL = new URL("./product.html", import.meta.url).href;
const HOME_URL = new URL("../../fashion_store.html#/home", import.meta.url).href;
const CATEGORY_GRID_URL = new URL("../categori/categori_grid_view/categori_grid_view.html", import.meta.url).href;

export function navigateToProduct(product = {}) {
    const url = new URL(PRODUCT_ENTRY_URL);
    if (product.name) url.searchParams.set("product", product.name);
    if (product.image) url.searchParams.set("image", product.image);
    window.location.assign(url.href);
}

export function navigateBackFromProduct() {
    const previousCategoryUrl = sessionStorage.getItem("open-fashion:category-return-url");
    window.location.assign(previousCategoryUrl || CATEGORY_GRID_URL);
}

export function navigateProductHome() {
    window.location.assign(HOME_URL);
}

export function handleProductRoute() {
    navigateToProduct();
}
