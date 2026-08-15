import { Header } from '../../../components/layout/header/header.js';
import { Footer } from '../../../components/layout/footer/footer.js';

document.getElementById('header-component').innerHTML = Header();
document.getElementById('footer-component').innerHTML = Footer();

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const filterTagsContainer = document.querySelector('.filter-tags');

    // Lấy thông tin category hoặc type từ URL (ví dụ: ?category=women&type=all-apparel)
    const category = params.get('category');
    const type = params.get('type');

    // Nếu không có tham số lọc trên URL (người dùng truy cập trực tiếp không qua menu), ẩn cụm tag đi
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
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}