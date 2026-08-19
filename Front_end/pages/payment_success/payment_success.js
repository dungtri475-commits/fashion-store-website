/* PAYMENT SUCCESS */
const closeButton = document.getElementById("close-payment-success");
const submitButton = document.getElementById("submit-rating");
const backHomeButton = document.getElementById("back-to-home");

const ratingButtons = document.querySelectorAll(".rating-button");

let selectedRating = null;

/* RATING */
ratingButtons.forEach((button) => {
    button.addEventListener("click", () => {
        ratingButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedRating = button.dataset.rating;

        console.log("Selected rating:", selectedRating);
    });
});

/* SUBMIT */
submitButton.addEventListener("click", () => {
    if (!selectedRating) {
        alert("Please rate your purchase.");
        return;
    }

    console.log("Rating submitted:", selectedRating);
    alert("Thank you for your feedback!");
});

/* CLOSE */
closeButton.addEventListener("click", () => {
    window.history.back();
});

/* BACK TO HOME */
backHomeButton.addEventListener("click", () => {
    window.location.href = "../../index.html";
});