import { Header } from "../../components/layout/header/header.js";
import { Footer } from "../../components/layout/footer/footer.js";
import { navigateBackFromProduct } from "./product.router.js";
import { navigateToCartPayment } from "../cart/cart.router.js";
import { getProductById } from "../../services/product.service.js";
import { buySingleProduct } from "../../services/cart.service.js";

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
  viewer.innerHTML = 
    `<button type="button" aria-label="Close full screen image">&times;</button><img src="${image}" alt="${alt}">`;
  const close = () => viewer.remove();
  viewer.addEventListener("click", (event) => { 
    if (event.target === viewer) close(); 
  });
  viewer.querySelector("button").addEventListener("click", close);
  document.body.append(viewer);
  viewer.querySelector("button").focus();
}

function createCartProduct() {
  const productId = new URLSearchParams(window.location.search).get("id");
  const catalogProduct = productId ? getProductById(productId) : null;
  const selectedSize = document.querySelector(".size.active")?.textContent.trim() || "One size";
  const selectedColor = document.querySelector(".swatch.active")?.getAttribute("aria-label") || "Default";

  if (catalogProduct) {
    const catalogImage = catalogProduct.thumbnail || catalogProduct.images?.[0] || "";

    return {
      ...catalogProduct,
      image: new URL(catalogImage, window.location.href).href,
      size: selectedSize,
      color: selectedColor
    };
  }

  const title = document.getElementById("product-title").textContent.trim();
  const brand = document.getElementById("product-brand")?.textContent.trim() || "OPEN FASHION";
  const imageElement = document.getElementById("main-product-image");
  const imagePath = imageElement.src;
  const priceText = document.querySelector(".price")?.textContent || "$0";
  const price = Number(priceText.replace(/[^0-9.]/g, "")) || 0;

  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name: title,
    brand,
    price,
    image: new URL(imagePath, window.location.href).href,
    size: selectedSize,
    color: selectedColor,
    quantity: 1
  };
}

function renderCatalogProduct(product, mainImage) {
  const imagePath = product.thumbnail || product.images?.[0] || "";

  document.getElementById("product-title").textContent = product.name;
  document.getElementById("product-brand").textContent = product.brand;
  document.querySelectorAll(".price").forEach((element) => {
    element.textContent = `$${product.price}`;
  });

  if (imagePath) {
    mainImage.src = new URL(imagePath, window.location.href).href;
    mainImage.alt = product.name;
  }
}

function initialiseProduct() {
  document.getElementById("header-component").innerHTML = Header();
  document.getElementById("footer-component").innerHTML = Footer();

  const params = new URLSearchParams(window.location.search);
  const catalogProduct = getProductById(params.get("id"));
  const productName = params.get("product");
  const productImage = params.get("image");
  const mainImage = document.getElementById("main-product-image");
  if (catalogProduct) {
    renderCatalogProduct(catalogProduct, mainImage);
  } else if (productName) {
    document.getElementById("product-title").textContent = productName;
  }
  if (!catalogProduct && productImage) {
    mainImage.src = productImage;
    mainImage.alt = productName || "Selected product";
  }

  document.querySelector(".product-back")
          .addEventListener("click", navigateBackFromProduct);

  document.querySelectorAll(".thumb")
          .forEach((thumbnail) => thumbnail
          .addEventListener("click", () => {
    mainImage.src = thumbnail.dataset.image;
    setActiveOption(".thumb", thumbnail);
  }));
  
  document.querySelectorAll(".swatch").forEach((swatch) => 
    swatch.addEventListener("click", () => setActiveOption(".swatch", swatch)));

  document.querySelectorAll(".size").forEach((size) => 
    size.addEventListener("click", () => setActiveOption(".size", size)));

  document.querySelector(".zoom").addEventListener("click", () => 
    openImageViewer(mainImage.src, mainImage.alt));
  
  document.querySelector(".wishlist").addEventListener("click", (event) => {
    const active = event.currentTarget.getAttribute("aria-pressed") === "true";
    event.currentTarget.setAttribute("aria-pressed", String(!active));
    event.currentTarget.textContent = active ? "♡ Add to wishlist" : "♥ Saved to wishlist";
  });
  
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    const product = createCartProduct();
    buySingleProduct(product, product.size, 1, product.color);
    navigateToCartPayment();
  });
}

initialiseProduct(); // 
