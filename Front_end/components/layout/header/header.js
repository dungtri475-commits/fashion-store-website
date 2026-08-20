import { icon, button } from "../../common/common.js";

export function Header() {
    const menuUrl = new URL("../../../pages/menu/menu.html", import.meta.url).href;
    const homeUrl = new URL("../../../fashion_store.html#/home", import.meta.url).href;
    
    return `
      <header class="header">
       <div class = "header_left">
          <a href="${menuUrl}" class="btn header_icon-btn header_menu-btn" aria-label="Open menu">
            ${icon("menu")}
          </a>
       </div>

       <div class = "header_center">
         <h1 class = "header_logo">
              Open Fashion
         </a>

       </div>
       
       <div class = "header_right">
           ${button(icon("search"), "header_icon-btn")}
           ${button(icon("shopping-bag"), "header_icon-btn")}
       </div>

    </header>
    `;
}
