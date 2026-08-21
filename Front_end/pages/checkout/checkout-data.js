const CHECKOUT_KEY = "open-fashion:checkout";

export function formatCurrency(value) {
  return `$${(Number(value) || 0).toFixed(2).replace(".00", "")}`;
}

export function getCheckout() {
  try {
    return JSON.parse(localStorage.getItem(CHECKOUT_KEY)) || { items: [], address: null, payment: null };
  } catch {
    return { items: [], address: null, payment: null };
  }
}

export function saveCheckout(checkout) {
  localStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkout));
  return checkout;
}

export function startCheckout(items) {
  const checkout = {
    items: (items || []).map((item) => ({ ...item, quantity: Math.max(1, Number(item.quantity) || 1) })),
    address: null,
    payment: null
  };
  return saveCheckout(checkout);
}

export function getTotal(checkout = getCheckout()) {
  return checkout.items.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
}

export function maskCard(cardNumber = "") {
  const digits = String(cardNumber).replace(/\D/g, "");
  return digits ? `•••• •••• •••• ${digits.slice(-4)}` : "No card selected";
}
