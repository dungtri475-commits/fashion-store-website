import { icon, button } from "../../common/common.js";

export function Header() {
    
    return `
      <header class="header">
       <div class = "header_left">
          ${button(icon("menu"), "header_icon-btn")}
       </div>

       <div class = "header_center">
         <h1 class = "header_logo">
              Open Fashion
         </h1>

       </div>
       
       <div class = "header_right">
           ${button(icon("search"), "header_icon-btn")}
           ${button(icon("shopping-bag"), "header_icon-btn")}
       </div>

    </header>
    `;
}