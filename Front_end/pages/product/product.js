import { Header } from "../../components/layout/header/header.js";
import { Footer } from "../../components/layout/footer/footer.js";
import { navigateBackFromProduct } from "./product.router.js";

function setActiveOption(selector, target) {
  document.querySelectorAll(selector).forEach((item) => item.classList.toggle("active", item === target));
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function openImageViewer(image, alt) {
  const viewer = document.createElement("div");
  viewer.className = "product-image-viewer";
  viewer.innerHTML = `<button type="button" aria-label="Close full screen image">&times;</button><img src="${image}" alt="${alt}">`;
  const close = () => viewer.remove();
  viewer.addEventListener("click", (event) => { if (event.target === viewer) close(); });
  viewer.querySelector("button").addEventListener("click", close);
  document.body.append(viewer);
  viewer.querySelector("button").focus();
}

function initialiseProduct() {
  document.getElementById("header-component").innerHTML = Header();
  document.getElementById("footer-component").innerHTML = Footer();

  const params = new URLSearchParams(window.location.search);
  const productName = params.get("product");
  const productImage = params.get("image");
  const mainImage = document.getElementById("main-product-image");
  if (productName) document.getElementById("product-title").textContent = productName;
  if (productImage) {
    mainImage.src = productImage;
    mainImage.alt = productName || "Selected product";
  }

  document.querySelector(".product-back").addEventListener("click", navigateBackFromProduct);
  document.querySelectorAll(".thumb").forEach((thumbnail) => thumbnail.addEventListener("click", () => {
    mainImage.src = thumbnail.dataset.image;
    setActiveOption(".thumb", thumbnail);
  }));
  document.querySelectorAll(".swatch").forEach((swatch) => swatch.addEventListener("click", () => setActiveOption(".swatch", swatch)));
  document.querySelectorAll(".size").forEach((size) => size.addEventListener("click", () => setActiveOption(".size", size)));
  document.querySelector(".zoom").addEventListener("click", () => openImageViewer(mainImage.src, mainImage.alt));
  document.querySelector(".wishlist").addEventListener("click", (event) => {
    const active = event.currentTarget.getAttribute("aria-pressed") === "true";
    event.currentTarget.setAttribute("aria-pressed", String(!active));
    event.currentTarget.textContent = active ? "♡ Add to wishlist" : "♥ Saved to wishlist";
  });
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("open-fashion:cart") || "[]");
    cart.push({ name: document.getElementById("product-title").textContent, size: document.querySelector(".size.active").textContent, quantity: 1 });
    localStorage.setItem("open-fashion:cart", JSON.stringify(cart));
    showToast("Added to cart");
  });
}

initialiseProduct();
