// Xử lý click chọn Color
const colorDots = document.querySelectorAll('.color-dot');
colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    // Xóa active cũ
    document.querySelector('.color-dot.active').classList.remove('active');
    // Thêm active mới
    dot.classList.add('active');
    // Có thể cập nhật ảnh chính dựa theo màu nếu ní muốn xịn hơn
  });
});

// Xử lý click chọn Size
const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Xóa active cũ
    document.querySelector('.size-btn.active').classList.remove('active');
    // Thêm active mới
    btn.classList.add('active');
  });
});

// Click Thumbnails (Task Gallery) để đổi ảnh chính
const thumbnails = document.querySelectorAll('.thumbnail-dot'); // Cần thêm thumbnail thật thay cho dot demo
thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const mainImg = document.getElementById('main-product-image');
    mainImg.src = thumb.dataset.imgSrc; // Cần data attribute chứa link ảnh lớn
  });
});