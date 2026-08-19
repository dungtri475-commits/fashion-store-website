import { Header } from '../../../components/layout/header/header.js';
import { Footer } from '../../../components/layout/footer/footer.js';


// ==========================================================
// RENDER HEADER
// ==========================================================

const headerComponent = document.getElementById('header-component');

if (headerComponent) {
    headerComponent.innerHTML = Header();
}


// ==========================================================
// RENDER FOOTER
// ==========================================================

const footerComponent = document.getElementById('footer-component');

if (footerComponent) {
    footerComponent.innerHTML = Footer();
}


// ==========================================================
// FIX ICON PATH
// ==========================================================
// Header/Footer dùng chung đang có đường dẫn:
// ./assets/icons/...
//
// Nhưng Collection nằm sâu hơn nên cần:
// ../../../assets/icons/...

document
    .querySelectorAll('#header-component img, #footer-component img')
    .forEach((img) => {

        const currentSrc = img.getAttribute('src');

        if (
            currentSrc &&
            currentSrc.startsWith('./assets/')
        ) {
            img.src = currentSrc.replace(
                './assets/',
                '../../../assets/'
            );
        }
    });