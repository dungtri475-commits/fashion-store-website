import { Header } from "../../components/layout/header/header.js";
import { Footer } from "../../components/layout/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  // Render Header va Footer chung
  const headerContainer = document.getElementById("header");
  const footerContainer = document.getElementById("footer");

  if (headerContainer) headerContainer.innerHTML = Header();
  if (footerContainer) footerContainer.innerHTML = Footer();

  // Xu ly lai duong dan anh neu can
  document.querySelectorAll('img[src^="./assets/"]').forEach(img => {
    const currentSrc = img.getAttribute('src');
    img.setAttribute('src', currentSrc.replace('./assets/', '../../assets/'));
  });
});