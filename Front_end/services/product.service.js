import { PRODUCTS } from "../data/product.data.js";

/**
 * Lấy toàn bộ sản phẩm.
 */
export function getAllProducts() {
    return PRODUCTS;
}

/**
 * Tìm một sản phẩm theo ID.
 *
 * @param {number|string} productId
 * @returns {object|null}
 */
export function getProductById(productId) {
    return PRODUCTS.find((product) => product.id === String(productId)) ?? null;
}
