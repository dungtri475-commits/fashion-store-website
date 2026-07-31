import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-component");
  const footerContainer = document.getElementById("footer-component");

  // Đổ nội dung Header và Footer vào các container tương ứng
  if (headerContainer && typeof Header === "function") {
    headerContainer.innerHTML = Header();
    fixIconPaths(headerContainer);
  }

  if (footerContainer && typeof Footer === "function") {
    footerContainer.innerHTML = Footer();
    fixIconPaths(footerContainer);
  }
});

// Hàm tự động chuẩn hóa đường dẫn icon trong Header/Footer
function fixIconPaths(container) {
  if (!container) return;
  const images = container.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http") && !src.startsWith("/")) {
      const fileName = src.split("/").pop();
      img.src = `../../../assets/icons/${fileName}`;
    }
  });
}