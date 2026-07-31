document.addEventListener("DOMContentLoaded", () => {
    // Nạp Header component nếu có thẻ chứa
    const headerContainer = document.getElementById("header-component");
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="header">
                <div class="header_left">
                    <button class="header_icon-btn">
                        <img src="../../../assets/icons/Menu.svg" alt="Menu">
                    </button>
                </div>
                <div class="header_center">
                    <a href="#" class="header_logo">
                        <span class="logo-top">Open</span>
                        <span class="logo-mid">✦</span>
                        <span class="logo-bottom">Fashion</span>
                    </a>
                </div>
                <div class="header_right">
                    <button class="header_icon-btn">
                        <img src="../../../assets/icons/Search.svg" alt="Search">
                    </button>
                    <button class="header_icon-btn">
                        <img src="../../../assets/icons/shopping-bag.svg" alt="Cart">
                    </button>
                </div>
            </header>
        `;
    }

    // Nạp Footer component nếu có thẻ chứa
    const footerContainer = document.getElementById("footer-component");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="footer_social">
                    <img src="../../../assets/icons/Twitter.svg" alt="Twitter">
                    <img src="../../../assets/icons/Instagram.svg" alt="Instagram">
                    <img src="../../../assets/icons/youtube.svg" alt="Youtube">
                </div>
                <div class="footer_contact">
                    <p>support@openui.design</p>
                    <p>+60 825 876</p>
                    <p>08:00 - 22:00 - Everyday</p>
                </div>
                <nav class="footer_nav">
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                    <a href="#">Blog</a>
                </nav>
            </footer>
        `;
    }
});