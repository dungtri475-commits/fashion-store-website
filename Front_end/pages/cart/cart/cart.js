document.addEventListener("DOMContentLoaded", () => {

    const cartItems = document.querySelectorAll(".cart-item");
    const subtotalPrice = document.querySelector(".subtotal-price");

    // Cập nhật giá từng sản phẩm + SUB TOTAL
    function updateCart() {

        let subtotal = 0;

        cartItems.forEach((item) => {

            const quantityText = item.querySelector(".qty-text");
            const priceElement = item.querySelector(".item-price");

            // Lấy số lượng
            const quantity = Number(
                quantityText.textContent.trim()
            );

            // Giá gốc của sản phẩm
            const unitPrice = Number(
                priceElement.dataset.price
            );

            // Tính giá theo số lượng
            const totalPrice = unitPrice * quantity;

            // Cập nhật giá dưới sản phẩm
            priceElement.textContent = `$${totalPrice}`;

            // Cộng vào SUB TOTAL
            subtotal += totalPrice;
        });

        // Cập nhật SUB TOTAL
        subtotalPrice.textContent = `$${subtotal}`;
    }


    cartItems.forEach((item) => {

        const decreaseBtn =
            item.querySelector(".decrease-btn");

        const increaseBtn =
            item.querySelector(".increase-btn");

        const quantityText =
            item.querySelector(".qty-text");


        // Nút +
        increaseBtn.addEventListener("click", () => {

            let quantity =
                Number(quantityText.textContent.trim());

            quantity++;

            quantityText.textContent = quantity;

            updateCart();
        });


        // Nút -
        decreaseBtn.addEventListener("click", () => {

            let quantity =
                Number(quantityText.textContent.trim());

            if (quantity > 1) {

                quantity--;

                quantityText.textContent = quantity;

                updateCart();
            }
        });

    });


    // Tính giá ban đầu
    updateCart();

});