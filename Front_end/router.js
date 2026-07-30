// file dieu huong cua toan bo fron-end

/**
 * Dieu huong trang se phat trien sau tai day
 */
import {HomePage} from "./pages/home/home.js";
export function goToHome(){
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = HomePage();
}

export function initRouter(){
    const renderRoute = () => {
        const hash = window.location.hash || "#/home";

        switch (hash) {
            case "#/home":
            default:
                goToHome();
                break;    
        }
    };window.addEventListener("hashchange", renderRoute);
    renderRoute();
}
