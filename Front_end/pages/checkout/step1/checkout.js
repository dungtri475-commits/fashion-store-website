import { formatCurrency, getCheckout, getTotal, saveCheckout } from "../checkout-data.js";

const container = document.getElementById("cart-items-container");
const totalElement = document.getElementById("total-price");

function render() {
  const checkout = getCheckout();
  if (!checkout.items.length) {
    container.innerHTML = '<p class="text-xs text-gray-500">Your cart is empty.</p>';
    totalElement.textContent = formatCurrency(0);
    return;
  }
  container.innerHTML = checkout.items.map((item, index) => `
    <div class="flex items-start space-x-3 cart-item">
      <div class="w-24 h-32 bg-gray-100 flex-shrink-0"><img src="${item.image || "../../../assets/images/category/category_Grid_view/category1.png"}" alt="${item.name}" class="w-full h-full object-cover"></div>
      <div class="flex-1 pt-1"><h3 class="text-xs font-bold uppercase tracking-widest text-gray-800">${item.brand || "OPEN FASHION"}</h3><p class="text-[11px] text-gray-500 mt-1">${item.name || "Product"}${item.size ? ` — Size ${item.size}` : ""}</p>
      <div class="flex items-center space-x-3 mt-3"><button type="button" data-action="decrease" data-index="${index}" class="w-5 h-5 rounded-full border border-gray-300">-</button><span class="text-xs text-gray-800">${item.quantity}</span><button type="button" data-action="increase" data-index="${index}" class="w-5 h-5 rounded-full border border-gray-300">+</button></div><p class="text-xs text-orange-400 font-medium mt-3">${formatCurrency(item.price * item.quantity)}</p></div>
    </div>`).join("");
  totalElement.textContent = formatCurrency(getTotal(checkout));
}

container.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const checkout = getCheckout();
  const item = checkout.items[Number(button.dataset.index)];
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + (button.dataset.action === "increase" ? 1 : -1));
  saveCheckout(checkout);
  render();
});

document.getElementById("btn-checkout").addEventListener("click", () => {
  if (!getCheckout().items.length) return;
  window.location.assign(new URL("../step2_address/shipping_address.html", import.meta.url).href);
});
render();
