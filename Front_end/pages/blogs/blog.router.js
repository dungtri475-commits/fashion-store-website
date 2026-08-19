import { navigateToBlogPost } from "./blog_post/blog_post_router.js";

// dieu huong giua cac man hinh trong modules

// dieu huong thanh nav fashion, promo, ...
const blogRoutes = {
    fashion: new URL(
        "./blog_grid_view/blog_grid_view.html",
        import.meta.url
    ).href,

    promo: new URL(
        "./blog_list_view/blog_list_view.html",
        import.meta.url
    ).href,
};

const appEntryUrl = new URL("../../fashion_store.html", import.meta.url).href;

function getCategoryName(button) {
    return (button.dataset.blogPage || button.textContent || "")
       .trim()
       .toLowerCase();
}

export function navigateToBlog(pageName) {
    const route = blogRoutes[String(pageName).toLowerCase()];

    if (!route) {
         console.warn("Không có static page cho Blog category:", pageName);
        return;
    }

    window.location.assign(route);
}

// ham xu lay nav
export function initBlogNavigator(selector = ".category-btn", activePage) {
    const categoryButtons = document.querySelectorAll(selector);

    categoryButtons.forEach((button) => {
        const pageName = getCategoryName(button);

        if (activePage) {
            button.classList.toggle("active", pageName === activePage);
        }

        button.addEventListener("click", () => {
            const selectedPage = getCategoryName(button);

            if (blogRoutes[selectedPage]) {
                categoryButtons.forEach((categoryButton) => {
                    categoryButton.classList.toggle(
                        "active",
                        getCategoryName(categoryButton) === selectedPage
                    );
                });

                navigateToBlog(selectedPage);
            }
        });
    });
}

export function navigateToAppRoute(route) {
    const normalizedRoute = String(route).replace(/^#?\/?/, "");

    window.location.assign(`${appEntryUrl}#/${normalizedRoute}`);
}

export function initBlogLayoutNavigator() {
    document.querySelectorAll(".header_logo").forEach((logo) => {
        const navigateHome = (event) => {
            event.preventDefault();
            navigateToAppRoute("home");
        };

        logo.addEventListener("click", navigateHome);

        if (logo.tagName !== "A") {
            logo.setAttribute("role", "link");
            logo.tabIndex = 0;

            logo.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    navigateHome(event);
                }
            });
        }
    });

    document.querySelectorAll(".footer_nav a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const label = link.textContent.trim().toLowerCase();

            event.preventDefault();
            navigateToAppRoute(label === "blog" ? "blog" : "home");
        });
    });
}

// ham duy nhat router tong goi
export function handleBlogRoute(routeParts =[]) {
    const [pageName = "fashion", postId] = routeParts;

    switch (pageName.toLowerCase()) {
        case "fashion":
           navigateToBlog("fashion"); // -> GridView
           break;

        case "promo":
            navigateToBlog("promo"); // -> ListView
            break;

        case "latest":
        case "popular":
            navigateToBlog("promo"); // -> ListView
            break;
         
        case "post":
            navigateToBlogPost(postId); // Blog_post pages
            break;
            
        default:
             console.warn("Không tìm thấy mục sản phẩm", routeParts);
             navigateToBlog("fashion");
             break;    
    }
}
