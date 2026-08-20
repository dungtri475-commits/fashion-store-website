document.addEventListener('DOMContentLoaded', () => {
  const reviewTotal = document.getElementById('review-total-price');
  const savedTotal = localStorage.getItem('checkout_total');

  if (savedTotal && reviewTotal) {
    reviewTotal.textContent = savedTotal;
  }

  const btnPlaceOrder = document.getElementById('btn-place-order');
  if (btnPlaceOrder) {
    btnPlaceOrder.addEventListener('click', () => {
      alert('Order placed successfully! Thank you for your purchase.');
      localStorage.removeItem('checkout_total');
      window.location.href = '../../home/home.html';
    });
  }
});