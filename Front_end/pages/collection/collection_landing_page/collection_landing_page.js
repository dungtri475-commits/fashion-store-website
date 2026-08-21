import { Header } from '../../../components/layout/header/header.js';
import { Footer } from '../../../components/layout/footer/footer.js';

const LANDING_IMAGES = [
    'category/category_Grid_view_full/category1.png', 'category/category_Grid_view_full/category2.png', 'category/category_Grid_view_full/category3.png',
    'category/category_Grid_view_full/category4.png', 'category/category_Grid_view_full/category5.png', 'category/category_Grid_view_full/category6.png',
    'blogGridView/Blog1.png', 'blogGridView/Blog2.png', 'blogGridView/Blog3.png', 'blogGridView/Blog4.png', 'blogGridView/Blog5.png',
    'blogGridView/Blog6.png', 'blogGridView/Blog7.png', 'blogGridView/Blog8.png', 'blogGridView/Blog9.png'
];

function normaliseLandingId(id) {
    return Math.min(15, Math.max(1, Number(id) || 1));
}

/** Navigate to one of the 15 standalone Collection Landing screens. */
export function navigateToCollectionLanding(id) {
    const landingId = normaliseLandingId(id);
    const landingUrl = new URL(`./collection_landing_page_${landingId}.html`, import.meta.url);
    window.location.assign(landingUrl.href);
}

/** Navigate from a Landing card to its matching Collection Detail screen. */
export function navigateToCollectionDetail(id) {
    const detailId = normaliseLandingId(id);
    const detailUrl = new URL(`../collection_detail/collection_detail_${detailId}.html`, import.meta.url);
    window.location.assign(detailUrl.href);
}

function landingMarkup(id) {
    const cards = Array.from({ length: 3 }, (_, offset) => {
        const detailId = ((id - 1 + offset) % LANDING_IMAGES.length) + 1;
        const image = LANDING_IMAGES[detailId - 1];
        return `<a class="collection-item" data-collection-detail-id="${detailId}" href="../collection_detail/collection_detail_${detailId}.html"><div class="image-wrapper"><img src="../../../assets/images/${image}" alt="Collection ${detailId}"></div><div class="collection-footer-text"><span class="number">${String(detailId).padStart(2, '0')}</span><span class="collection-line" aria-hidden="true"></span><span class="label">COLLECTION ${String(detailId).padStart(2, '0')}</span></div></a>`;
    }).join('');

    return `<main class="main-content"><section class="collection-header-text"><h1 class="main-title">Collections</h1><p class="sub-title">CURATED EDITS</p></section>${cards}</main>`;
}


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

const landingRoot = document.getElementById('collection-landing-root');
const landingId = Number(document.body.dataset.collectionLanding);
if (landingRoot && Number.isInteger(landingId) && landingId >= 1 && landingId <= 15) {
    landingRoot.innerHTML = landingMarkup(landingId);
}

document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-collection-detail-id]');
    if (!target) return;

    event.preventDefault();
    navigateToCollectionDetail(target.dataset.collectionDetailId);
});


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
