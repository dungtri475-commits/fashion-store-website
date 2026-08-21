const CART_PAYMENT_URL = new URL("./cart_payment/cart_payment.html", import.meta.url).href;

export function navigateToCartPayment() {
    window.location.assign(CART_PAYMENT_URL);
}

export function handleCartRoute(childRoutes = []) {
    const [screen = "payment"] = childRoutes;

    if (screen === "payment") {
        navigateToCartPayment();
    }
}
