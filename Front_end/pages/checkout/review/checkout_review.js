import { formatCurrency, getCheckout, getTotal, maskCard } from "../checkout-data.js";
import { saveCart } from "../../../services/cart.service.js";

const checkout = getCheckout();
if (!checkout.items.length || !checkout.address || !checkout.payment) {
  window.location.assign(new URL("../step2_address/shipping_address.html", import.meta.url).href);
} else {
  const { address, payment } = checkout;
  document.getElementById("review-address").innerHTML = `<div class="flex items-center justify-between border-b border-gray-200 pb-3"><div><p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Shipping Address</p><p class="text-xs font-bold text-gray-800 mt-1">${address.firstName} ${address.lastName}</p><p class="text-[11px] text-gray-500">${address.addressLine}, ${address.city}, ${address.state} ${address.zipCode}</p><p class="text-[11px] text-gray-500">${address.phone}</p></div><a href="../step2_address/shipping_address.html" class="text-gray-400">›</a></div>`;
  document.getElementById("review-payment").innerHTML = `<div class="flex items-center justify-between border-b border-gray-200 pb-3"><div><p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Payment Method</p><p class="text-xs font-medium text-gray-700 mt-1">${payment.cardHolder}</p><p class="text-[11px] text-gray-500">${maskCard(payment.cardNumber)}</p></div><a href="../payment/payment_method.html" class="text-gray-400">›</a></div>`;
  document.getElementById("review-items").innerHTML = `<p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Items</p>${checkout.items.map(item => `<div class="flex items-center space-x-3"><div class="w-16 h-20 bg-gray-100 flex-shrink-0"><img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover"></div><div class="flex-1"><h3 class="text-xs font-bold uppercase tracking-widest text-gray-800">${item.brand || "OPEN FASHION"}</h3><p class="text-[10px] text-gray-500 mt-0.5">${item.name}</p><div class="flex items-center justify-between mt-2"><span class="text-xs text-gray-500">Qty: ${item.quantity}</span><span class="text-xs text-orange-400 font-medium">${formatCurrency(item.price * item.quantity)}</span></div></div></div>`).join("")}`;
  document.getElementById("review-total-price").textContent = formatCurrency(getTotal(checkout));
  document.getElementById("btn-place-order").addEventListener("click", () => {
    localStorage.setItem("open-fashion:last-order-id", String(Date.now()).slice(-8));
    saveCart([]);
    window.location.assign(new URL("../../payment_success/payment_success.html", import.meta.url).href);
  });
}
