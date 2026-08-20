document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('input[placeholder="Search items"]');
  const clearInputBtn = document.querySelector('.relative button'); 
  const recentTags = document.querySelectorAll('.rounded-full button'); 

  if (clearInputBtn && searchInput) {
    clearInputBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
    });
  }

  recentTags.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tag = e.target.closest("span");
      if (tag) tag.remove();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && searchInput.value.trim() !== "") {
        window.location.href = `search_result.html?query=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
});