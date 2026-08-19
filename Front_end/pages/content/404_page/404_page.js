import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";

// Render Header
const headerComponent = document.getElementById("header-component");
if (headerComponent && typeof Header === "function") {
    headerComponent.innerHTML = Header();
}

// Render Footer
const footerComponent = document.getElementById("footer-component");
if (footerComponent && typeof Footer === "function") {
    footerComponent.innerHTML = Footer();
}

// Sửa đường dẫn hình ảnh/icon trong Header và Footer
function fixComponentImagePaths() {
    const basePath = "../../../assets/";

    const images = document.querySelectorAll(
        "#header-component img, #footer-component img"
    );

    images.forEach((img) => {
        const src = img.getAttribute("src");
        if (!src) return;

        if (src.startsWith("./assets/")) {
            img.setAttribute("src", src.replace("./assets/", basePath));
        } else if (src.startsWith("assets/")) {
            img.setAttribute("src", "../../../" + src);
        }
    });
}

fixComponentImagePaths();