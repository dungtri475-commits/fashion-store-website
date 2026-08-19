import { Header } from '../../../components/layout/header/header.js';
import { Footer } from '../../../components/layout/footer/footer.js';

// Chèn Header và Footer vào DOM
document.getElementById('header-component').innerHTML = Header();
document.getElementById('footer-component').innerHTML = Footer();

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const filterTagsContainer = document.querySelector('.filter-tags');

    // Lấy thông tin category hoặc type từ URL (ví dụ: ?category=women&type=All apparel)
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
            ${category ? `<span class="tag">${capitalizeFirstLetter(category)} <button class="remove-tag" type="button" data-type="category">×</button></span>` : ''}
            ${type ? `<span class="tag">${type} <button class="remove-tag" type="button" data-type="type">×</button></span>` : ''}
        `;

        // Lắng nghe sự kiện click nút "×" để xóa bộ lọc tương ứng trên URL
        filterTagsContainer.querySelectorAll('.remove-tag').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetType = e.target.getAttribute('data-type');
                const currentParams = new URLSearchParams(window.location.search);
                
                // Xóa param tương ứng
                currentParams.delete(targetType);

                // Cập nhật lại URL mà không cần load lại trang hoàn toàn
                const newRelativePathQuery = window.location.pathname + (currentParams.toString() ? '?' + currentParams.toString() : '');
                history.pushState(null, '', newRelativePathQuery);

                // Reload lại dữ liệu sản phẩm hoặc ẩn hẳn cụm tag nếu hết tham số
                if (!currentParams.has('category') && !currentParams.has('type')) {
                    filterTagsContainer.style.display = 'none';
                } else {
                    e.target.closest('.tag').remove();
                }

                // TODO: Gọi hàm fetch/render lại danh sách sản phẩm ở đây nếu có
                // loadProducts(currentParams);
            });
        });
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}