const colorDots = document.querySelectorAll('.color-dot');
colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    document.querySelector('.color-dot.active').classList.remove('active');
    dot.classList.add('active');
  });
});

const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.size-btn.active').classList.remove('active');
    btn.classList.add('active');
  });
});

const thumbnails = document.querySelectorAll('.thumbnail-dot'); 
thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const mainImg = document.getElementById('main-product-image');
    mainImg.src = thumb.dataset.imgSrc; 
  });
});