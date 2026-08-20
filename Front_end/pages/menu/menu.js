import { navigateToHome } from "./menu.router.js";

document.addEventListener('DOMContentLoaded', function() {

    const closeButton = document.querySelector('.menu_close-btn');
    const tabs = document.querySelectorAll('.menu_tab');
    // 1. Xử lý mở/đóng menu con (Apparel)
    const dropdowns = document.querySelectorAll('.menu-item-dropdown');

    const categoryLinks = document.querySelectorAll('.menu-link, .submenu-link');

    const pendingFeatureButtons = document.querySelectorAll('[data-feature]');

    const toast = document.querySelector('.menu_toast');

    // luu nhom khach hanh dang duoc chon de chuyen sang trang san pham
    // khach hang chon muc san pham nao se chuyen sang trang san pham do
    let selectedAudience = document.querySelector('.menu_tab.active')?.dataset.audience || 'women';
    let toastTimer;

    /** chuyen den man hinh thong bao khi danh muc chua co san pham */
    function navigateToUnavailableProduct(category) {
        const params = new URLSearchParams({
            audience: selectedAudience,
            category: category
        });
        window.location.href = `../categori/categori_grid_view/categori_grid_view.html?${params.toString()}`;
    }

    // cho phep phan tu role="link" hoat dong bang chuot va ban phim
    function bindCategoryNavigation(element) {
        const openCategory = function () {
            navigateToUnavailableProduct(element.dataset.category);
        };
        element.addEventListener('click', openCategory);
        element.addEventListener('keydown', function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCategory();
            }
        });
    }

    // hien thong bao cho chuc nang chua co duong dan thuc te
    function showToast(message) {
        if (!toast) return;

        window.clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add('show');

        toastTimer = window.setTimeout(function () {
            toast.classList.remove('show');
        }, 2200);
    }

    // Dong menu: quay về Home của ứng dụng chính.
    closeButton?.addEventListener('click', function () {
        navigateToHome();
    });

    // click vao Escape cung se dong Menu
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeButton?.click();
    });

    // chuyen nhom women/ men/ kid va cap nhap trang thai truy cap
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (item) {
                item.classList.remove('active');
                item.setAttribute('aria-pressed', 'false');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-pressed', 'true');
            selectedAudience = tab.dataset.audience;
        });
    });

    // dong va mo cac menu con
    dropdowns.forEach(function (item) {
        const toggleButton = item.querySelector('.dropdown-toggle');

        toggleButton?.addEventListener('click', function () {
            const isOpen = item.classList.toggle('active');
            toggleButton.setAttribute('aria-expanded', String(isOpen));
        });
    });

    // dieu huong toan bo danh muc chinh va danh muc con
    categoryLinks.forEach(bindCategoryNavigation);

    // Store locator va social chua co URL -> hien thong bao
    pendingFeatureButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            showToast(`${button.dataset.feature} đang được cập nhật.`);
        });
    });
});
