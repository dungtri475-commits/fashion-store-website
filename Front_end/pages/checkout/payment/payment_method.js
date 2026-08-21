import { getCheckout, maskCard } from "../checkout-data.js";
const payment = getCheckout().payment;
const preview = document.getElementById("card-preview");
const confirm = document.getElementById("confirm-payment");
if (!payment) {
  preview.innerHTML = '<p class="text-xs text-gray-500">Add a payment method to continue.</p>';
  confirm.textContent = "ADD PAYMENT METHOD";
  confirm.href = "./add_card.html";
} else {
  preview.querySelector(".text-lg").textContent = maskCard(payment.cardNumber);
  preview.querySelector(".font-medium").textContent = payment.cardHolder;
  preview.querySelectorAll(".font-medium")[1].textContent = `${payment.expMonth}/${String(payment.expYear).slice(-2)}`;
}
