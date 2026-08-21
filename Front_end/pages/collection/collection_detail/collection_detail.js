import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";

const DETAIL_IMAGES = [
    "category/category_Grid_view_full/category1.png", "category/category_Grid_view_full/category2.png", "category/category_Grid_view_full/category3.png",
    "category/category_Grid_view_full/category4.png", "category/category_Grid_view_full/category5.png", "category/category_Grid_view_full/category6.png",
    "blogGridView/Blog1.png", "blogGridView/Blog2.png", "blogGridView/Blog3.png", "blogGridView/Blog4.png", "blogGridView/Blog5.png",
    "blogGridView/Blog6.png", "blogGridView/Blog7.png", "blogGridView/Blog8.png", "blogGridView/Blog9.png"
];
const DETAIL_TITLES = ["October", "Autumn", "Black Edit", "Tailored", "Soft Layers", "After Hours", "Studio", "Portrait", "Form", "Contrast", "Essentials", "Modern", "Archive", "Objects", "Notes"];

function normaliseDetailId(id) {
    return Math.min(15, Math.max(1, Number(id) || 1));
}

/** Navigate to one of the 15 standalone Collection Detail screens. */
export function navigateToCollectionDetail(id) {
    const detailId = normaliseDetailId(id);
    const detailUrl = new URL(`./collection_detail_${detailId}.html`, import.meta.url);
    window.location.assign(detailUrl.href);
}

/** Navigate from a Collection Detail screen to its matching Landing screen. */
export function navigateToCollectionLanding(id) {
    const landingId = normaliseDetailId(id);
    const landingUrl = new URL(`../collection_landing_page/collection_landing_page_${landingId}.html`, import.meta.url);
    window.location.assign(landingUrl.href);
}

function detailMarkup(id) {
    const image = DETAIL_IMAGES[(id - 1) % DETAIL_IMAGES.length];
    const title = DETAIL_TITLES[id - 1];
    const products = Array.from({ length: 6 }, (_, offset) => {
        const productImage = DETAIL_IMAGES[(id + offset) % DETAIL_IMAGES.length];
        return `<article class="product-card"><div class="product-image"><img src="../../../assets/images/${productImage}" alt="${title} product ${offset + 1}"></div><div class="product-info"><p class="product-name">${title} edit ${offset + 1}</p><p class="product-category">Featured</p><p class="product-price">$${80 + offset * 10}</p></div></article>`;
    }).join("");

    return `<main class="collection-detail"><section class="collection-heading"><div class="collection-heading-bg">${String(id).padStart(2, "0")}</div><div class="collection-heading-content"><h1 class="collection-title">${title}</h1><p class="collection-subtitle">COLLECTION</p></div></section><a class="collection-hero-link" data-collection-landing-id="${id}" href="../collection_landing_page/collection_landing_page_${id}.html" aria-label="Open ${title} collection"><section class="collection-hero"><img src="../../../assets/images/${image}" alt="${title}" class="hero-image"></section></a><div class="collection-detail-action"><a class="collection-landing-link" data-collection-landing-id="${id}" href="../collection_landing_page/collection_landing_page_${id}.html">VIEW COLLECTION</a></div><section class="product-grid">${products}</section></main>`;
}


// ==========================================
// RENDER HEADER
// ==========================================

const headerComponent = document.getElementById("header-component");

if (headerComponent) {
    headerComponent.innerHTML = Header();
}


// ==========================================
// RENDER FOOTER
// ==========================================

const footerComponent = document.getElementById("footer-component");

if (footerComponent) {
    footerComponent.innerHTML = Footer();
}

const detailRoot = document.getElementById("collection-detail-root");
const detailId = Number(document.body.dataset.collectionDetail);
if (detailRoot && Number.isInteger(detailId) && detailId >= 1 && detailId <= 15) {
    detailRoot.innerHTML = detailMarkup(detailId);
}

document.addEventListener("click", (event) => {
    const landingTarget = event.target.closest("[data-collection-landing-id]");
    if (landingTarget) {
        event.preventDefault();
        navigateToCollectionLanding(landingTarget.dataset.collectionLandingId);
        return;
    }

    const target = event.target.closest("[data-collection-detail-id]");
    if (!target) return;

    event.preventDefault();
    navigateToCollectionDetail(target.dataset.collectionDetailId);
});


// ==========================================
// FIX ICON PATH
// ==========================================

function fixComponentImagePaths() {

    const basePath = "../../../assets/";

    const images = document.querySelectorAll(
        "#header-component img, #footer-component img"
    );

    images.forEach((img) => {

        const src = img.getAttribute("src");

        if (!src) return;

        // Nếu đang là đường dẫn ./assets/...
        if (src.startsWith("./assets/")) {

            const newSrc = src.replace(
                "./assets/",
                basePath
            );

            img.setAttribute("src", newSrc);
        }

        // Nếu common.js đang trả về assets/...
        else if (src.startsWith("assets/")) {

            img.setAttribute(
                "src",
                "../../../" + src
            );
        }

    });
}


// Chạy sau khi Header/Footer được render
fixComponentImagePaths();


// ==========================================
// PRODUCT IMAGE ERROR HANDLING
// ==========================================

document.querySelectorAll(".product-image img").forEach((img) => {

    img.addEventListener("error", () => {

        img.style.display = "none";

        const parent = img.parentElement;

        if (parent) {
            parent.classList.add("image-not-found");
        }

    });

});


// ==========================================
// YMAL IMAGE ERROR HANDLING
// ==========================================

document.querySelectorAll(".ymal-card img").forEach((img) => {

    img.addEventListener("error", () => {

        img.style.display = "none";
    });

});
