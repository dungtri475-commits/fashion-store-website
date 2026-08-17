document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.querySelectorAll('.cart-item');
  const totalPriceElement = document.getElementById('total-price');

  function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
      const unitPrice = parseFloat(item.getAttribute('data-price')) || 0;
      const quantity = parseInt(item.querySelector('.item-quantity').textContent) || 0;
      total += unitPrice * quantity;
    });

    if (totalPriceElement) {
      totalPriceElement.textContent = total;
    }
    localStorage.setItem('checkout_total', '$' + total);
  }

  cartItems.forEach(item => {
    const btnDecrease = item.querySelector('.btn-decrease');
    const btnIncrease = item.querySelector('.btn-increase');
    const quantityElement = item.querySelector('.item-quantity');

    if (btnDecrease && btnIncrease && quantityElement) {
      btnDecrease.addEventListener('click', () => {
        let qty = parseInt(quantityElement.textContent) || 1;
        if (qty > 1) {
          qty--;
          quantityElement.textContent = qty;
          calculateTotal();
        }
      });

      btnIncrease.addEventListener('click', () => {
        let qty = parseInt(quantityElement.textContent) || 1;
        qty++;
        quantityElement.textContent = qty;
        calculateTotal();
      });
    }
  });

  calculateTotal();
});