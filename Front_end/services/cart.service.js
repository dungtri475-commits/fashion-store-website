const CART_STORAGE_KEY = "open-fashion:cart";

export function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

export function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product, selectedSize, quantity = 1, selectedColor = "Default") {
    const cart = getCart();
    const existingItem = cart.find((item) =>
        item.productId === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            brand: product.brand,
            price: Number(product.price) || 0,
            image: product.image || product.thumbnail || product.images?.[0] || "",
            size: selectedSize,
            color: selectedColor,
            quantity
        });
    }

    saveCart(cart);
    return cart;
}

export function buySingleProduct(product, selectedSize, quantity = 1, selectedColor = "Default") {
    const cart = [{
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: Number(product.price) || 0,
        image: product.image || product.thumbnail || product.images?.[0] || "",
        size: selectedSize,
        color: selectedColor,
        quantity: Math.max(1, Number(quantity) || 1)
    }];

    saveCart(cart);
    return cart;
}

export function updateCartItemQuantity(index, quantity) {
    const cart = getCart();

    if (!cart[index]) return cart;

    cart[index].quantity = Math.max(1, Number(quantity) || 1);
    saveCart(cart);
    return cart;
}
