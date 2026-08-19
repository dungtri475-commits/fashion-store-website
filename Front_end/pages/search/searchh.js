document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('.search-input-border input');
  const clearBtn = document.querySelector('.search-input-border button:first-of-type');
  const searchIconBtn = document.querySelector('.search-input-border button:last-of-type');
  const resultTitle = document.querySelector('.uppercase.tracking-widest');
  const heartBtns = document.querySelectorAll('.product-card button');

  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get("query");

  if (queryParam) {
    const decodedQuery = decodeURIComponent(queryParam);
    if (searchInput) searchInput.value = decodedQuery;
    if (resultTitle) {
      resultTitle.textContent = `8 RESULT OF ${decodedQuery.toUpperCase()}`;
    }
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
    });
  }

  const handleSearch = () => {
    const keyword = searchInput.value.trim();
    if (keyword) {
      window.location.href = `search_result.html?query=${encodeURIComponent(keyword)}`;
    }
  };

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  }

  if (searchIconBtn) {
    searchIconBtn.addEventListener("click", handleSearch);
  }

  heartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const svg = btn.querySelector("svg");
      if (svg) {
        const isFilled = svg.getAttribute("fill") === "currentColor";
        if (isFilled) {
          svg.setAttribute("fill", "none");
          btn.classList.remove("text-red-500");
          btn.classList.add("text-gray-400");
        } else {
          svg.setAttribute("fill", "currentColor");
          btn.classList.remove("text-gray-400");
          btn.classList.add("text-red-500");
        }
      }
    });
  });

  // 5. Chuyển trang (Pagination)
  const pageBtns = document.querySelectorAll(".my-8 button");
  pageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      pageBtns.forEach((b) => {
        b.classList.remove("bg-gray-800", "text-white");
        b.classList.add("bg-gray-100", "text-gray-600");
      });
      btn.classList.remove("bg-gray-100", "text-gray-600");
      btn.classList.add("bg-gray-800", "text-white");
    });
  });
});