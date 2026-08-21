import { icon, button } from "../../common/common.js";

export function Header() {
    const menuUrl = new URL("../../../pages/menu/menu.html", import.meta.url).href;
    const homeUrl = new URL("../../../fashion_store.html#/home", import.meta.url).href;
    const searchUrl = new URL("../../../fashion_store.html#/search", import.meta.url).href;
    
    return `
      <header class="header">
       <div class = "header_left">
          <a href="${menuUrl}" class="btn header_icon-btn header_menu-btn" aria-label="Open menu">
            ${icon("menu")}
          </a>
       </div>

       <div class = "header_center">
         <h1 class = "header_logo">
           <a href="${homeUrl}" aria-label="Open Fashion home">Open Fashion</a>
         </h1>

       </div>
       
       <div class = "header_right">
           <a href="${searchUrl}" class="btn header_icon-btn" aria-label="Search products">
             ${icon("search")}
           </a>
           ${button(icon("shopping-bag"), "header_icon-btn")}
       </div>

    </header>
    `;
}
