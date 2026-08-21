import { getCheckout, saveCheckout } from "../checkout-data.js";
const form = document.getElementById("add-card-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const payment = Object.fromEntries(new FormData(form).entries());
  const digits = payment.cardNumber.replace(/\D/g, "");
  if (digits.length < 12 || !/^\d{3,4}$/.test(payment.cvv)) return alert("Please enter a valid card number and CVV.");
  payment.cardNumber = digits;
  delete payment.cvv;
  saveCheckout({ ...getCheckout(), payment });
  window.location.assign(new URL("./payment_method.html", import.meta.url).href);
});
