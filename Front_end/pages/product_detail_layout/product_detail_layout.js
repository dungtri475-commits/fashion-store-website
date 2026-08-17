document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('main-ring-image');
  const thumbnails = document.querySelectorAll('.grid button');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const imgInThumb = thumb.querySelector('img');
      if (imgInThumb && mainImage) {
        mainImage.src = imgInThumb.src;
      }
    });
  });

  const sizeButtons = document.querySelectorAll('section button.rounded-full');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => {
        b.classList.remove('bg-gray-800', 'text-white');
        b.classList.add('border', 'border-gray-300', 'text-gray-600');
      });
      btn.classList.remove('border', 'border-gray-300', 'text-gray-600');
      btn.classList.add('bg-gray-800', 'text-white');
    });
  });
});