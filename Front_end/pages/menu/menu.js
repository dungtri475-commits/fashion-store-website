document.addEventListener('DOMContentLoaded', function() {
    // 1. Xử lý mở/đóng menu con (Apparel)
    const dropdowns = document.querySelectorAll('.menu-item-dropdown');

    dropdowns.forEach(function(item) {
        const header = item.querySelector('div');
        
        if (header) {
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                // Đóng/mở mục được click
                item.classList.toggle('active');
            });
        }
    });

    // 2. Bổ sung: Xử lý chuyển đổi active giữa các tab (WOMEN, MAN, KIDS)
    const tabs = document.querySelectorAll('.menu_tab');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Xóa class active ở tất cả các tab
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            // Thêm class active cho tab vừa được nhấn
            this.classList.add('active');
        });
    });
});