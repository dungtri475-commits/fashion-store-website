/D:/fashion_store_website/database/scripts/normalize-fashion-data.mjs
# script dùng để chuẩn hóa lại dữ liệu seed cho dự án fashion store.
- Đọc dữ liệu gốc từ [products.json (line 1)](/D:/fashion_store_website/database/json/products.json:1)
 và [carts.json (line 1)](/D:/fashion_store_website/database/json/carts.json:1).
- Lọc bỏ các sản phẩm không liên quan đến thời trang, giữ lại hoặc bổ sung các nhóm phù hợp như áo quần, giày, túi, ví, đồng hồ, kính, trang sức, thắt lưng, mũ, khăn, tất.
- Chuẩn hóa mỗi product sang cấu trúc dễ dùng hơn cho MongoDB/Mongoose: thêm slug, department, variants, stock, chuẩn lại tags, ảnh, category...
- Chuẩn hóa lại cart để mỗi item có dạng:
productId, variantId, quantity, price
và đảm bảo mọi cart chỉ tham chiếu đến product/variant còn tồn tại.