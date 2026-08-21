import { getCheckout, saveCheckout } from "../checkout-data.js";

const form = document.getElementById("add-address-form");
const checkout = getCheckout();
if (checkout.address) Object.entries(checkout.address).forEach(([name, value]) => {
  if (form.elements[name]) form.elements[name].value = value;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveCheckout({ ...getCheckout(), address: Object.fromEntries(new FormData(form).entries()) });
  window.location.assign(new URL("../step2_address/shipping_address.html", import.meta.url).href);
});
