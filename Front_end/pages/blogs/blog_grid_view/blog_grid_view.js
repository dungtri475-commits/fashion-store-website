import { Header } from "../../../components/layout/header/header.js";
import { Footer } from "../../../components/layout/footer/footer.js";
import { initBlogLayoutNavigator, initBlogNavigator } from "../blog.router.js";
import { navigateToBlogPost } from "../blog_post/blog_post_router.js";

// su dung recursion cho load more goi lai ham de load them san pham khi user muon xem them san pham

// Cau hinh Load more
// so luong blog dang hien thi san trong HTML 
// Blog grid view dang co 4 Blog -> value ban dau = 4

let currentBlogCount = 4; // khoi tao gia tri co 4 blog ban dau

/**
 * Logic : moi lan user nhan load more -> He thong se them 4 Blog moi
 */
const BLOGS_PER_LOAD = 4; 

/**
 * DATA TINH CUA BLOG
 * - vi website hien tai chua phat trien hoan toan backend va database -> ko lay du lieu tu backend
 * - tu tao du lieu tinh truc tiep tai front-end va parse truc tiep data tai front-end
 */
const blogPosts = [
    {
        id: 1,
        image: "Blog1.png",
        title: "2021 STYLE GUIDE: THE BIGGEST FALL TRENDS",
        alt: "Fall fashion style guide and seasonal outfit trends"
    },

    {
        id: 2,
        image: "Blog2.png",
        title: "THE BEST STREET STYLE LOOKS FOR FALL",
        alt: "Women's street style outfit for the fall season"
    },

    {
        id: 3,
        image: "Blog3.png",
        title: "HOW TO STYLE YOUR FAVORITE FALL BASICS",
        alt: "Woman wearing stylish fall fashion basics"
    },

    {
        id: 4,
        image: "Blog4.png",
        title: "THE FALL WARDROBE ESSENTIALS YOU NEED",
        alt: "Essential women's clothing for a fall wardrobe"
    },

    {
        id: 5,
        image: "Blog5.png",
        title: "EASY OUTFIT IDEAS FOR THE NEW SEASON",
        alt: "Casual women's outfit ideas for the new season"
    },

    {
        id: 6,
        image: "Blog6.png",
        title: "3 PAIRS OF DENIM YOU WON'T BELIEVE",
        alt: "Women's denim jeans styled for casual fashion"
    },

    {
        id: 7,
        image: "Blog7.png",
        title: "5 FALL LOOKS I'M LOVING",
        alt: "Five stylish women's outfit ideas for fall"
    },

    {
        id: 8,
        image: "Blog8.png",
        title: "5 FALL BOOT TRENDS YOU NEED TO TRY",
        alt: "Women's fall boots and seasonal footwear trends"
    },

    {
        id: 9,
        image: "Blog9.png",
        title: "HOW TO LAYER YOUR OUTFITS THIS FALL",
        alt: "Layered women's outfit for cool fall weather"
    },

];

const TOTAL_BLOGS = blogPosts.length;

/**
 * KHOI TAO TRANG BLOG GRID
 * - Cho toan bo HTML duoc browser doc xong
 *  - tiep theo se khoi tao cac business logic va navigator logic cua javascript
 * 
 *  base case
 * + neu goi cac ham truoc khi HTML ton tai
 * - > querySelector/ getElementById se tra ve Null
 */

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-component");
  const footerContainer = document.getElementById("footer-component");

  // Render Header & Footer
  if (headerContainer) headerContainer.innerHTML = Header();
  if (footerContainer) footerContainer.innerHTML = Footer();

  // sau khi Header/footer duoc render -> sua duong dan cho phu hop voi vi tri
  fixIconPaths(headerContainer);
  fixIconPaths(footerContainer);

  initBlogNavigator(".category-btn", "fashion"); // khoi tao nav category
  initBlogLayoutNavigator(); 
  initBlogPostNavigation(); // Khoi tao click vao Blog Card -> de mo Blog post tuong ung

  initLoadMore(); // Khoi tao chuc nang nut Load More
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

/* =========================================================
   BLOG POST NAVIGATION
   ========================================================= */

/**
 * initBlogPostNavigation()
 *
 * Chức năng:
 * Cho phép người dùng click vào một Blog Item
 * để chuyển đến Blog Post tương ứng.
 * --> sử dụng EVENT DELEGATION.
 *
 * Không gắn event cho từng .blog-item riêng biệt.
 *
 * Lý do:
 *
 * Blog 1-4 tồn tại từ đầu.
 *
 * Nhưng Blog 5-8 được tạo SAU khi nhấn
 * LOAD MORE.
 *
 * Nếu dùng:
 *
 * document.querySelectorAll(".blog-item")
 *
 * thì chỉ lấy được Blog 1-4 tại thời điểm
 * function chạy.
 *
 * Event Delegation Logic:
 *
 * .blog-grid
 *     ↓
 * lắng nghe click
 *     ↓
 * tìm .blog-item gần nhất
 *
 * -> Blog được thêm sau vẫn click được.
 */
function initBlogPostNavigation() {
  const blogGrid = document.querySelector(".blog-grid");

  // base case: ko tim thay Blog-grid -> dung (return)
  if (!blogGrid) {
    return;
  }

  // dung event listener cho toan bo blog-grid
  blogGrid.addEventListener("click", (event) => {
    const blogItem = event.target.closest(".blog-item"); // dung closets(".blog-item") -> tim phan tu co ten cha gan nhat co class .blog-item

    // base case: neu khong nam trong Blog-Item -> khong xu ly logic
    if (!blogItem) {
      return;
    }

    // neu nguoi dung click Bookmark -> thi khong chuyen Blog Post
    if (event.target.closest(".bookmark-btn")){
      return;
    }

    // lay data blog
    const postId = Number(blogItem.dataset.blogId);

    // base case: neu id ko hop le -> khong dieu huong
    if (!postId) {
      console.warn("Blog item chưa có data-blog-id hợp lệ");
      return;
    }

    // Goi Blog Post Router
    navigateToBlogPost(postId);
  }
 );
}

/** Khoi tao Load More
 * initLoadMore()
 * 
 * gan su kien click cho nut load more -> khi user nhan 
 * 1. Xac dinh Blog tiep theo
 * 2. Goi ham recursion renderBlogsRecursive()
 * 3. Them blog moi vao cuoi danh sach
 * 4. cap nhap so Blog da hien thi
 * 5. An nut neu da hien thi het blog (hide)
 */

function initLoadMore() {
  const loadMoreButton = document.querySelector(".load-more-btn");

  // base case: neu trang khong co nut load more thi dung
  if (!loadMoreButton) {
    return;
  }

  loadMoreButton.addEventListener("click", () => {
    // lay blog tiep theo bien currentBlogCount + 1
    const nextBlogId = currentBlogCount + 1;

    // tinh so blog con lai
    const remainingBlogs = TOTAL_BLOGS - currentBlogCount;

    // moi lan chi load toi da BLOG_PER_LOAD , neu con 1 hoac 2 thi load phan con lai , thay vi se load 4
    const numberOfBlogsToLoad = Math.min(BLOGS_PER_LOAD, remainingBlogs);

    // khong con blog nao thi dung
    if (numberOfBlogsToLoad <= 0) {
      loadMoreButton.style.display = "none";
      return;
    }

    // goi va su dung ham de quy
    renderBlogsRecursive(nextBlogId, numberOfBlogsToLoad);

    // cap nhap so luong blog  -> dang hien thi
    currentBlogCount += numberOfBlogsToLoad;

    // neu da hien thi tat ca blog, -> An nut load more
    if (currentBlogCount >= TOTAL_BLOGS) {
      loadMoreButton.style.display = "none";
    }
  }
 );
}

// recurtion Blog
/**
 * Tao lan luot cac Blog moi voi recursion structure 
 */
function renderBlogsRecursive(blogId, remaining){
  // Base case 1
  // remaining <= 0 -> nghia la da tao du so Blog
  if (remaining <= 0) {
    return;
  }

  // base case 2
  // neu blogId vuot qua tong so Blog -> thi cung se phai dung
  if (blogId > TOTAL_BLOGS) {
    return;
  }

  // RECURSIVE PROCESS
  /** tao blog hien tai */
  createBlogItem(blogId);

  // function tu goi lai khi base case = 0 -> return = 0
  renderBlogsRecursive(blogId + 1, remaining - 1);
}

/** Tao Blog Item (createBlogItem(blogId))
 * 
 * 1.search Blog Item mau dang ton tai
 * 2.clone toan bo HTML cua Blog Item
 * 3.Thay data-blog-id
 * 4.Apprend Blog moi vao cuoi .blog-grid
 */
function createBlogItem(blogId) {
  const blogGrid = document.querySelector(".blog-grid");

  // dung Blog dau tien lam template
  const template = document.querySelector(".blog-item");

  // Base case
  // neu khong co container hoac khong co template thi dung
  if (!blogGrid || !template) {
    return;
  }

  // Blog _Data la array nen index bat dau tu 0
  const blogData = blogPosts[blogId - 1];

  // neu khong tim thay du lieu Blog -> thi khong tao
  if (!blogData) {
    console.warn (`Không tìm thấy dữ liệu Blog ${blogId}`);
    return;
  }

  // cloneNode (true)
  /**
   * true = clone toan bo element con
   */
  const newBlogItem = template.cloneNode(true);

  // thay blog ID
  newBlogItem.dataset.blogId =  blogData.id;

  // thay image
  const image = newBlogItem.querySelector(".blog-img");

  if (image) {
    image.src = `../../../assets/images/blogGridView/${blogData.image}`;

    // gan alt hop ly cho tung blog
    image.alt = blogData.alt;
  }

  // thay title
  const title = newBlogItem.querySelector(".blog-item-title");

  if (title) {
    title.textContent = blogData.title;
  }

  // appendChild()
  // khong xoa Blog cu, chi them Blog moi
  blogGrid.appendChild(newBlogItem);
}

function initBlogGridView() {
  const blogItems = document.querySelectorAll(".blog-item");

  blogItems.forEach((blogItem) => {
    blogItem.addEventListener("click", () => {
      const postId = Number(blogItem.dataset.blogId);

      navigateToBlogPost(postId);
    });
  });
}
