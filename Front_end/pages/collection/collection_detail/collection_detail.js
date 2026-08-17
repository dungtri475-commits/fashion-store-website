import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";


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