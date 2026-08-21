import { formatCurrency, getCheckout, getTotal, maskCard } from "../checkout-data.js";

const checkout = getCheckout();
const address = checkout.address;
document.getElementById("shipping-total").textContent = formatCurrency(getTotal(checkout));
document.getElementById("shipping-address-display").innerHTML = address ? `
  <div class="space-y-1"><h4 class="text-sm font-bold text-gray-800">${address.firstName} ${address.lastName}</h4><p class="text-xs text-gray-500 leading-relaxed">${address.addressLine}<br>${address.city}, ${address.state} ${address.zipCode}</p><p class="text-xs text-gray-500">${address.phone}</p></div>
  <a href="../add_address/add_address.html" class="text-gray-400" aria-label="Edit shipping address">›</a>` :
  '<p class="text-xs text-gray-500">No shipping address added yet.</p><a href="../add_address/add_address.html" class="text-gray-400">›</a>';
if (checkout.payment) document.getElementById("payment-method-label").textContent = `Card ${maskCard(checkout.payment.cardNumber)}`;

document.getElementById("btn-place-order").addEventListener("click", () => {
  if (!address) return window.location.assign(new URL("../add_address/add_address.html", import.meta.url).href);
  if (!checkout.payment) return window.location.assign(new URL("../payment/payment_method.html", import.meta.url).href);
  window.location.assign(new URL("../review/checkout_review.html", import.meta.url).href);
});
