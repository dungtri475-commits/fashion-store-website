const blogPostRoutes = {
    1: new URL("./blog_post_1.html", import.meta.url).href,
    2: new URL("./blog_post_2.html", import.meta.url).href,
    3: new URL("./blog_post_3.html", import.meta.url).href,
    4: new URL("./blog_post_4.html", import.meta.url).href,
    5: new URL("./blog_post_5.html", import.meta.url).href,
    6: new URL("./blog_post_6.html", import.meta.url).href,
    7: new URL("./blog_post_7.html", import.meta.url).href,
    8: new URL("./blog_post_8.html", import.meta.url).href,
    9: new URL("./blog_post_9.html", import.meta.url).href
};

export function navigateToBlogPost(postId) {
    const route = blogPostRoutes[Number(postId)];

    if (!route) {
        console.warn("Không tồn tại static Blog Post:", postId);
        return;
    }

    window.location.assign(route);
}
