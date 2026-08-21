const homeUrl = new URL("../../../fashion_store.html#/home", import.meta.url).href;
const productUrl = new URL("../../product/product.html", import.meta.url).href;

document.querySelector(".cart-close")?.addEventListener("click", () => {
  if (window.history.length > 1) window.history.back();
  else window.location.assign(homeUrl);
});

document.querySelector(".continue-shopping")?.addEventListener("click", () => {
  window.location.assign(productUrl);
});
