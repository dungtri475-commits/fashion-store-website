import {
    icon,
    divider,
    link
} from "../../common/common.js";

export function Footer() {
    return `
      <footer class="footer"> 
           <div class = "footer_social">
               ${icon("twitter")}
               ${icon("instagram")}
               ${icon("youtube")}
            </div>

            ${divider()}
            <div class = "footer_contact"> 

               <p>support@openui.design</p>

               <p>+60 825 876</p>

               <p>08:00 - 22:00 - Everyday</p>

            </div>
            ${divider()}
            <nav class = "footer_nav">
               ${link("About","/about")}
               ${link("Contact","/contact")}
               ${link("Blog","/blog")}
            </nav>
            
        </footer>
    `;
}