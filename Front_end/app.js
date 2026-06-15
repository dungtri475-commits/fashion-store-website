// File dieu khien chinh cua toan bo front-end
import {initRouter} from "./router.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Fashion Store Started");

    // await loadNavbar(); // tai Navbar len giao dien

    // await loadFooter(); // tai Footer len giao dien

    initRouter(); // khoi tao he thong Router
});

