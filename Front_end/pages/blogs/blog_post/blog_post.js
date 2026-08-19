import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";
import { navigateToBlogPost } from "./blog_post_router.js";
import { initBlogLayoutNavigator } from "../blog.router.js";

document.addEventListener("DOMContentLoaded", () => {
    renderLayoutSection("header-component", Header);
    renderLayoutSection("footer-component", Footer);
    initBlogLayoutNavigator();
    initCarousel();
});

function renderLayoutSection(containerId, template) {
    const container = document.getElementById(containerId);

    if (!container || typeof template !== "function") {
        return;
    }

    container.innerHTML = template();
    fixIconPaths(container);
}

function fixIconPaths(container) {
    if (!container) {
        return;
    }

    const images = container.querySelectorAll("img");

    images.forEach((image) => {
        const src = image.getAttribute("src");

        if (src && !src.startsWith("http") && !src.startsWith("/")) {
            const fileName = src.split("/").pop();
            image.src = `../../../assets/icons/${fileName}`;
        }
    });
}

function initCarousel() {
    const track = document.querySelector(".carousel-track");

    if (!track) {
        return;
    }

    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const dots = Array.from(document.querySelectorAll(".carousel-dots .dot"));

    if (!slides.length) {
        return;
    }

    let currentIndex = 0;
    let startX = 0;
    let isPointerActive = false;
    const lastIndex = slides.length - 1;
    const minimumSwipeDistance = 50;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    };

    const handleSwipe = (endX) => {
        const swipeDistance = startX - endX;

        if (swipeDistance > minimumSwipeDistance && currentIndex < lastIndex) {
            currentIndex += 1;
            updateCarousel();
            return;
        }

        if (swipeDistance < -minimumSwipeDistance && currentIndex > 0) {
            currentIndex -= 1;
            updateCarousel();
        }
    };

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = Math.min(index, lastIndex);
            updateCarousel();
        });
    });

    slides.forEach((slide) => {
        const image = slide.querySelector("img");

        if (image) {
            image.draggable = false;
        }
    });

    if (window.PointerEvent) {
        track.addEventListener("pointerdown", (event) => {
            if (event.pointerType === "mouse" && event.button !== 0) {
                return;
            }

            isPointerActive = true;
            startX = event.clientX;
            track.style.cursor = "grabbing";
        });

        track.addEventListener("pointerup", (event) => {
            if (!isPointerActive) {
                return;
            }

            isPointerActive = false;
            track.style.cursor = "";
            handleSwipe(event.clientX);
        });

        track.addEventListener("pointercancel", () => {
            isPointerActive = false;
            track.style.cursor = "";
        });

        track.addEventListener("pointerleave", (event) => {
            if (!isPointerActive) {
                return;
            }

            isPointerActive = false;
            track.style.cursor = "";
            handleSwipe(event.clientX);
        });
    } else {
        track.addEventListener(
            "touchstart",
            (event) => {
                startX = event.touches[0].clientX;
            },
            { passive: true }
        );

        track.addEventListener(
            "touchend",
            (event) => {
                handleSwipe(event.changedTouches[0].clientX);
            },
            { passive: true }
        );
    }

    updateCarousel();
}
