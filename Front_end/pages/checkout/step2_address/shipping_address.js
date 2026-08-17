document.addEventListener('DOMContentLoaded', () => {
  const shippingMethodBtn = document.querySelector('.px-4:nth-child(4) .bg-gray-50');
  const paymentMethodBtn = document.querySelector('.px-4:nth-child(5) a');

  if (shippingMethodBtn) {
    shippingMethodBtn.addEventListener('click', (e) => {
      console.log('Select shipping method clicked');
    });
  }

  const totalElement = document.querySelector('.text-orange-400');
  const savedTotal = localStorage.getItem('checkout_total');
  
  if (savedTotal && totalElement) {
    totalElement.textContent = savedTotal;
  }
});