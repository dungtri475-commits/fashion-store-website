import { icon, button } from "../../common/common.js";

export function Header() {
    
    return `
      <header class="header">
       <div class = "header_left">
          ${button(icon("menu"), "header_icon-btn")}
       </div>

       <div class = "header_center">
         <a href="#/home" class = "header_logo" aria-label="Open Fashion home">
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
