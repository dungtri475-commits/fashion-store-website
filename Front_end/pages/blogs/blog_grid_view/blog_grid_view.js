import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-component");
  const footerContainer = document.getElementById("footer-component");

  // Render Header & Footer
  if (headerContainer) headerContainer.innerHTML = Header();
  if (footerContainer) footerContainer.innerHTML = Footer();

  fixIconPaths(headerContainer);
  fixIconPaths(footerContainer);
});

// Hàm tự động điều chỉnh đường dẫn icon tương đối
function fixIconPaths(container) {
  if (!container) return;
  
  const images = container.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.getAttribute("src");
    // Nếu đường dẫn icon chưa có ../../../ thì tự bổ sung vào
    if (src && !src.startsWith("http") && !src.startsWith("/")) {
      // Lấy tên file ảnh (VD: Menu.svg, Search.svg)
      const fileName = src.split("/").pop();
      // Gán lại đường dẫn chính xác tới folder assets
      img.src = `../../../assets/icons/${fileName}`; 
    }
  });
}