import { Header } from '../../../components/layout/header/header.js';
import { Footer } from '../../../components/layout/footer/footer.js';

// Gọi và render Header, Footer vào các container tương ứng
document.getElementById('header-component').innerHTML = Header();
document.getElementById('footer-component').innerHTML = Footer();

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const filterTagsContainer = document.querySelector('.filter-tags');

    // Lấy thông tin category hoặc type từ URL (ví dụ: ?category=women&type=all-apparel)
    const category = params.get('category');
    const type = params.get('type');

    // Nếu không có tham số lọc trên URL, ẩn cụm tag đi
    if (!category && !type) {
        if (filterTagsContainer) {
            filterTagsContainer.style.display = 'none';
        }
        return;
    }

    // Nếu có lọc, hiển thị và điền nội dung linh hoạt
    if (filterTagsContainer) {
        filterTagsContainer.style.display = 'flex';
        filterTagsContainer.innerHTML = `
            ${category ? `<span class="tag">${capitalizeFirstLetter(category)} <button class="remove-tag" type="button">×</button></span>` : ''}
            ${type ? `<span class="tag">${type} <button class="remove-tag" type="button">×</button></span>` : ''}
        `;

        // Thêm sự kiện bấm nút '×' để xóa tag bộ lọc
        const removeButtons = filterTagsContainer.querySelectorAll('.remove-tag');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tagElement = e.target.closest('.tag');
                if (tagElement) {
                    tagElement.remove();
                }
                
                // Kiểm tra nếu không còn tag nào thì ẩn luôn khung chứa tag
                if (filterTagsContainer.children.length === 0) {
                    filterTagsContainer.style.display = 'none';
                }
            });
        });
    }
});

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}