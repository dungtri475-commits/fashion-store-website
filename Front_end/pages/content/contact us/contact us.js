import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        headerContainer.innerHTML = Header();
    }

    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        footerContainer.innerHTML = Footer();
    }

    const iconPath = "../../../assets/icons/";
    const iconFiles = {
        menu: "Menu.svg",
        search: "Search.svg",
        "shopping-bag": "shopping-bag.svg",
        twitter: "Twitter.svg",
        instagram: "Instagram.svg",
        youtube: "youtube.svg"
    };

    const icons = document.querySelectorAll(".icon");
    icons.forEach((img) => {
        const iconName = img.getAttribute("alt");
        if (iconFiles[iconName]) {
            img.src = iconPath + iconFiles[iconName];
        }
    });

    const chatButton = document.getElementById("chatButton");
    if (chatButton) {
        chatButton.addEventListener("click", () => {
            alert("Our chat support is available 24/7.");
        });
    }

    const textButton = document.getElementById("textButton");
    if (textButton) {
        textButton.addEventListener("click", () => {
            window.location.href = "sms:8003092622";
        });
    }
});