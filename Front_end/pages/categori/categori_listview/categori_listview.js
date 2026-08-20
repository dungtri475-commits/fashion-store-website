import { Header } from '../../../components/layout/header/header.js';
import { Footer } from '../../../components/layout/footer/footer.js';
import { initCategoryPage } from '../categori.router.js';

document.getElementById('header-component').innerHTML = Header();
document.getElementById('footer-component').innerHTML = Footer();
document.addEventListener('DOMContentLoaded', () => initCategoryPage({ layout: 'list', productSelector: '.product-listview' }));
