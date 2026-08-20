import { initBlogLayoutNavigator, initBlogNavigator } from "../blog.router.js";
import { navigateToBlogPost } from "../blog_post/blog_post_router.js";

const LIST_POST_IDS = [5, 6, 7, 8, 4, 9, 1, 2];

const moreListPosts = [
    {
        postId: 1,
        image: "Blog1.png",
        alt: "2021 Style Guide",
        title: "2021 STYLE GUIDE: THE BIGGEST FALL TRENDS",
        description:
            "The excitement of fall fashion is here and I'm already loving some of the trend forecasts.",
        date: "08/10/2021"
    },
    {
        postId: 2,
        image: "Blog2.png",
        alt: "Street style looks",
        title: "THE BEST STREET STYLE LOOKS FOR FALL",
        description:
            "The excitement of fall fashion is here and I'm already loving some of the trend forecasts.",
        date: "05/10/2021"
    },
    {
        postId: 3,
        image: "Blog3.png",
        alt: "Fall basics",
        title: "HOW TO STYLE YOUR FAVORITE FALL BASICS",
        description:
            "The excitement of fall fashion is here and I'm already loving some of the trend forecasts.",
        date: "02/10/2021"
    }
];

let currentListPostIndex = 0;
const LIST_POSTS_PER_LOAD = 3;

document.addEventListener("DOMContentLoaded", () => {
    // Nạp Header component nếu có thẻ chứa
    const headerContainer = document.getElementById("header-component");
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="header">
                <div class="header_left">
                    <button class="header_icon-btn">
                        <img src="../../../assets/icons/Menu.svg" alt="Menu">
                    </button>
                </div>
                <div class="header_center">
                    <a href="#" class="header_logo">
                        <span class="logo-top">Open</span>
                        <span class="logo-mid">✦</span>
                        <span class="logo-bottom">Fashion</span>
                    </a>
                </div>
                <div class="header_right">
                    <button class="header_icon-btn">
                        <img src="../../../assets/icons/Search.svg" alt="Search">
                    </button>
                    <button class="header_icon-btn">
                        <img src="../../../assets/icons/shopping-bag.svg" alt="Cart">
                    </button>
                </div>
            </header>
        `;
    }

    // Nạp Footer component nếu có thẻ chứa
    const footerContainer = document.getElementById("footer-component");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="footer_social">
                    <img src="../../../assets/icons/Twitter.svg" alt="Twitter">
                    <img src="../../../assets/icons/Instagram.svg" alt="Instagram">
                    <img src="../../../assets/icons/youtube.svg" alt="Youtube">
                </div>
                <div class="footer_contact">
                    <p>support@openui.design</p>
                    <p>+60 825 876</p>
                    <p>08:00 - 22:00 - Everyday</p>
                </div>
                <nav class="footer_nav">
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                    <a href="#">Blog</a>
                </nav>
            </footer>
        `;
    }

    initBlogNavigator(".tag-item", "promo");
    initBlogLayoutNavigator();
    initBlogPostNavigation();
    initListLoadMore();
});

function initBlogPostNavigation() {
    document.querySelectorAll(".blog-card").forEach((card, index) => {
        card.addEventListener("click", () => {
            const postId = LIST_POST_IDS[index];

            if (!postId) {
                console.warn("Card chưa có static post tương ứng.");
                return;
            }

            navigateToBlogPost(postId);
        });
    });
}

function initListLoadMore() {
    const loadMoreButton = document.querySelector(".btn-load-more");

    if (!loadMoreButton) {
        return;
    }

    loadMoreButton.addEventListener("click", () => {
        const nextPosts = moreListPosts.slice(
            currentListPostIndex,
            currentListPostIndex + LIST_POSTS_PER_LOAD
        );

        nextPosts.forEach((post) => {
            appendBlogCard(post);
        });

        currentListPostIndex += nextPosts.length;

        if (currentListPostIndex >= moreListPosts.length) {
            loadMoreButton.style.display = "none";
        }
    });
}

function appendBlogCard(post) {
    const blogList = document.querySelector(".blog-list");

    if (!blogList) {
        return;
    }

    const card = document.createElement("article");

    card.className = "blog-card";
    card.innerHTML = `
        <div class="blog-image">
            <img src="../../../assets/images/blogGridView/${post.image}" alt="${post.alt}">
        </div>
        <div class="blog-content">
            <h2 class="blog-card-title">${post.title}</h2>
            <p class="blog-card-desc">${post.description}</p>
            <span class="blog-card-date">${post.date}</span>
        </div>
    `;

    card.addEventListener("click", () => {
        navigateToBlogPost(post.postId);
    });

    blogList.appendChild(card);
}

