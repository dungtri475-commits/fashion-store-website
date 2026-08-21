// file dieu huong cua toan bo fron-end

/**
 * Dieu huong trang se phat trien sau tai day
 */
import {HomePage} from "./pages/home/home.js";
import { handleBlogRoute } from "./pages/blogs/blog.router.js";
import { handleMenuRoute } from "./pages/menu/menu.router.js";
import { handleCategoryRoute } from "./pages/categori/categori.router.js";
import { handleProductRoute } from "./pages/product/product.router.js";
import { handleCollectionRoute } from "./pages/collection/collection.router.js";
import { handleCartRoute } from "./pages/cart/cart.router.js";

function getAppContainer() {
    return document.getElementById("app");
}

export function renderHome(){
    const app = getAppContainer();
    if (!app) return;

    app.innerHTML = HomePage();
}

export function initRouter(){
    const renderRoute = () => {
        const app = getAppContainer();

        if (!app) {
            return;
        }

        const hash = window.location.hash || "#/home";
        const routeParts = hash
            .replace(/^#?\//, "")
            .split("/")
            .filter(Boolean);
        const [moduleName = "home", ...childRoutes] = routeParts;

        switch (moduleName) {
            case "home":
                renderHome();
                break;    
            case "blog":
                handleBlogRoute(childRoutes);
                break;
            case "menu":
                handleMenuRoute(childRoutes);
                break;
            case "category":
            case "categori":
                handleCategoryRoute(childRoutes);
                break;
            case "product":
                handleProductRoute(childRoutes);
                break;
            case "collection":
                handleCollectionRoute(childRoutes);
                break;
            case "cart":
                handleCartRoute(childRoutes);
                break;
            default:
                console.warn("Route không tồn tại:", hash);
                window.location.hash = "#/home";
                break;
        }
    };

    window.addEventListener("hashchange", () => {
        renderRoute();
    });

    renderRoute();
}
