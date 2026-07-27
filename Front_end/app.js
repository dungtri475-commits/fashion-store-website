// File dieu khien chinh cua toan bo front-end
import {initRouter} from "./router.js";
import { Header } from "./components/layout/header/header.js";
import { Footer } from "./components/layout/footer/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Fashion Store Started");

    // await loadNavbar(); // tai Navbar len giao dien

    // await loadFooter(); // tai Footer len giao dien

    document.getElementById("navbar").innerHTML = Header();
    document.getElementById("footer").innerHTML = Footer();
    initRouter(); // khoi tao he thong Router
});

