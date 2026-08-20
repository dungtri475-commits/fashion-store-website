const appEntryUrl = new URL("../../fashion_store.html", import.meta.url).href;

/** Chuyển từ menu tĩnh về Home của ứng dụng chính. */
export function navigateToHome() {
    window.location.assign(`${appEntryUrl}#/home`);
}

/** Điểm kết nối với router chính khi truy cập route #/menu. */
export function handleMenuRoute(routeParts = []) {
    const [destination = "home"] = routeParts;

    if (destination.toLowerCase() !== "home") {
        console.warn("Menu route không tồn tại:", routeParts);
    }

    navigateToHome();
}
