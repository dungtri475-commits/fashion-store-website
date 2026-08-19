// file dieu huong cua toan bo fron-end

/**
 * Dieu huong trang se phat trien sau tai day 
 */
import {HomePage} from "./pages/home/home.js";
import { handleBlogRoute } from "./pages/blogs/blog.router.js";

const moduleRouters = {
    blog: handleBlogRoute
    // menu
    // collection
};

function getAppContainer() {
    return document.getElementById("app");
}

export function goToHome(){
    const app = getAppContainer();

    if (!app) return;

    app.innerHTML = HomePage();
}

// ham dinh nghia Router
function parseRoute() {
    const hash = window.location.hash || "#/home";

    return hash
         .replace(/^#\//, "")
         .split("/")
         .filter(Boolean);
}

// ham renderRoute
function renderRoute() {
    const [moduleName, ...moduleRoute] = parseRoute();

    if (!moduleName || moduleName === "home") {
        goToHome();
        return;
    }

    const moduleRouter = moduleRouters[moduleName];

    if (!moduleRouter) {
        console.warn (`Không tìm thấy module router: ${moduleName}`);
        goToHome();
        return;
    }

    // Router cap toan cuc khong xu ly logic ben trong Blog
    moduleRouter(moduleRoute);
}

export function navigateTo(route) {
    const hash = route.startsWith("#")
         ? route
         : `#/${route.replace(/^\//, "")}`;

    if (window.location.hash !== hash) {
        window.location.hash = hash;
    }   
}

export function initRouter() {
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
}
