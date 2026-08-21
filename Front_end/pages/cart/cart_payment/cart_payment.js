import { getCart, saveCart, updateCartItemQuantity } from "../../../services/cart.service.js";
import { getProductById } from "../../../services/product.service.js";

const EMPTY_CART_URL = new URL("../cart_empty/cart_empty.html", import.meta.url).href;
const HOME_URL = new URL("../../../fashion_store.html", import.meta.url).href;
const DEFAULT_IMAGE = new URL("../../../assets/images/category/category_Grid_view/category1.png", import.meta.url).href;
const PRODUCT_PAGE_URL = new URL("../../product/product.html", import.meta.url).href;

function formatPrice(price) {
    return `$${Number(price || 0).toFixed(2).replace(".00", "")}`;
}

function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        "\"": "&quot;"
    }[character]));
}

// Product image paths in product.data.js are relative to the Product page.
// Resolve them from that page so Cart Payment always reads the same files in assets/images.
function getItemImageUrl(item) {
    const catalogProduct = getProductById(item.productId);
    const imagePath = catalogProduct?.thumbnail
        || catalogProduct?.images?.[0]
        || item.image
        || DEFAULT_IMAGE;

    return new URL(imagePath, PRODUCT_PAGE_URL).href;
}

function itemMarkup(item, index) {
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const price = Number(item.price) || 0;
    const productName = escapeHtml(item.name || "Open Fashion product");
    const brand = escapeHtml(item.brand || "OPEN FASHION");
    const size = escapeHtml(item.size || "One size");
    const imageUrl = getItemImageUrl(item);

    return `
        <article class="cart-item" data-cart-index="${index}">
            <img
                class="item-image"
                src="${imageUrl}"
                alt="${productName}"
                onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}';"
            >
            <div class="item-details">
                <div class="item-info">
                    <h2 class="item-brand">${brand}</h2>
                    <p class="item-desc">${productName} — Size ${size}</p>
                </div>
                <div class="quantity-control" aria-label="Quantity for ${productName}">
                    <button type="button" class="qty-btn decrease-btn" aria-label="Decrease quantity">−</button>
                    <span class="qty-text">${quantity}</span>
                    <button type="button" class="qty-btn increase-btn" aria-label="Increase quantity">+</button>
                </div>
                <span class="item-price">${formatPrice(price * quantity)}</span>
            </div>
        </article>
    `;
}

const cartItemsElement = document.querySelector(".cart-items");
const subtotalPrice = document.querySelector(".subtotal-price");
const closeButton = document.querySelector(".close-btn");

// Close the cart and return the customer to the page they visited immediately before it.
closeButton?.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
        return;
    }

    // A direct visit has no previous page in this tab, so use Home as a safe fallback.
    window.location.assign(HOME_URL);
});

function renderCart() {
    const savedCart = getCart();

    // Cart Payment is a single-product purchase screen. Keep only the latest
    // product so items left by older cart sessions cannot appear here.
    const cart = savedCart.length > 0 ? [savedCart.at(-1)] : [];

    if (savedCart.length > 1) {
        saveCart(cart);
    }

    if (cart.length === 0) {
        window.location.assign(EMPTY_CART_URL);
        return;
    }

    cartItemsElement.innerHTML = cart.map(itemMarkup).join("");

    const subtotal = cart.reduce((total, item) => (
        total + (Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1)
    ), 0);

    subtotalPrice.textContent = formatPrice(subtotal);
}

cartItemsElement.addEventListener("click", (event) => {
    const button = event.target.closest(".qty-btn");
    if (!button) return;

    const itemIndex = Number(button.closest(".cart-item")?.dataset.cartIndex);
    const cartItem = getCart()[itemIndex];
    if (!cartItem) return;

    const quantity = Math.max(1, Number(cartItem.quantity) || 1);
    const nextQuantity = button.classList.contains("increase-btn")
        ? quantity + 1
        : quantity - 1;

    updateCartItemQuantity(itemIndex, nextQuantity);
    renderCart();
});

renderCart();
