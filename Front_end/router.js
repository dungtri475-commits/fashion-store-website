// file dieu huong cua toan bo fron-end

/**
 * Dieu huong trang se phat trien sau tai day
 */
import {HomePage} from "./pages/home/home.js";
import {
    renderBlogDetailPage,
    renderBlogListPage
} from "./pages/blog/blog.js";

function getAppContainer() {
    return document.getElementById("app");
}

export function goToHome(){
    const app = getAppContainer();
    if (!app) return;

    app.innerHTML = HomePage();
}

export function initRouter(){
    const renderRoute = async () => {
        const app = getAppContainer();

        if (!app) {
            return;
        }

        const hash = window.location.hash || "#/home";
        const blogDetailMatch = hash.match(/^#\/blog\/([^/?#]+)$/);

        switch (hash) {
            case "#/home":
                goToHome();
                break;    
            case "#/blog":
                await renderBlogListPage(app, "all");
                break;
            case "#/blog/latest":
                await renderBlogListPage(app, "latest");
                break;
            case "#/blog/popular":
                await renderBlogListPage(app, "popular");
                break;
            default:
                if (blogDetailMatch) {
                    await renderBlogDetailPage(app, decodeURIComponent(blogDetailMatch[1]));
                    break;
                }

                goToHome();
                break;
        }
    };

    window.addEventListener("hashchange", () => {
        renderRoute().catch((error) => {
            console.error(error);
        });
    });

    renderRoute().catch((error) => {
        console.error(error);
    });
}
