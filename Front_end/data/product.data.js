/**
 * Dữ liệu sản phẩm giả lập phía Frontend.
 *
 * Lưu ý:
 * - Mỗi sản phẩm phải có ID duy nhất.
 * - Đường dẫn ảnh được tính từ file HTML đang sử dụng.
 * - Khi kết nối Backend thật, dữ liệu này sẽ được thay bằng API.
 */
export const PRODUCTS = [
    // =====================================================
    // APPAREL PRODUCTS
    // =====================================================

    {
        id: "apparel-001",
        slug: "lamerei-recycled-boucle-jacket-grey",
        brand: "LAMEREI",
        name: "Recycled Bouclé Jacket Grey",
        description:
            "Lightweight grey jacket with a high collar and quilted construction.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "jacket",
        audience: "women",
        images: [
            "../../assets/images/category/category_Grid_view/category1.png"
        ],
        thumbnail: "../../assets/images/category/category_Grid_view/category1.png",
        rating: 4.8,
        reviewCount: 124,
        sizes: ["S", "M", "L"],
        colours: ["Grey"],
        stock: 20,
        isFavourite: false,
        isNew: true
    },

    {
        id: "apparel-002",
        slug: "lamerei-soft-beige-v-neck-cardigan",
        brand: "LAMEREI",
        name: "Soft Beige V-Neck Cardigan",
        description:
            "Relaxed beige cardigan with a soft-touch finish and V-neck design.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "cardigan",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product2.png"
        ],
        thumbnail: "../../assets/images/productDetail/product2.png",
        rating: 4.8,
        reviewCount: 98,
        sizes: ["S", "M", "L"],
        colours: ["Beige"],
        stock: 15,
        isFavourite: false,
        isNew: true
    },

    {
        id: "apparel-003",
        slug: "lamerei-black-hooded-winter-jacket",
        brand: "LAMEREI",
        name: "Black Hooded Winter Jacket",
        description:
            "Insulated black winter jacket featuring an adjustable hood.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "jacket",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product3.png"
        ],
        thumbnail: "../../assets/images/productDetail/product3.png",
        rating: 4.8,
        reviewCount: 156,
        sizes: ["S", "M", "L"],
        colours: ["Black"],
        stock: 18,
        isFavourite: false,
        isNew: false
    },

    {
        id: "apparel-004",
        slug: "lamerei-brown-turtleneck-knit-sweater",
        brand: "LAMEREI",
        name: "Brown Turtleneck Knit Sweater",
        description:
            "Warm brown knitted sweater with a comfortable turtleneck design.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "sweater",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product4.png"
        ],
        thumbnail: "../../assets/images/productDetail/product4.png",
        rating: 4.8,
        reviewCount: 87,
        sizes: ["S", "M", "L"],
        colours: ["Brown"],
        stock: 22,
        isFavourite: false,
        isNew: false
    },

    {
        id: "apparel-005",
        slug: "lamerei-beige-puffer-hooded-jacket",
        brand: "LAMEREI",
        name: "Beige Puffer Hooded Jacket",
        description:
            "Warm beige puffer jacket with a hood and spacious front pockets.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "jacket",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product5.png"
        ],
        thumbnail: "../../assets/images/productDetail/product5.png",
        rating: 4.8,
        reviewCount: 132,
        sizes: ["S", "M", "L"],
        colours: ["Beige"],
        stock: 16,
        isFavourite: false,
        isNew: true
    },

    {
        id: "apparel-006",
        slug: "lamerei-light-grey-quilted-jacket",
        brand: "LAMEREI",
        name: "Light Grey Quilted Jacket",
        description:
            "Minimal light-grey quilted jacket designed for everyday layering.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "jacket",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product6.png"
        ],
        thumbnail: "../../assets/images/productDetail/product6.png",
        rating: 4.8,
        reviewCount: 76,
        sizes: ["S", "M", "L"],
        colours: ["Light Grey"],
        stock: 19,
        isFavourite: false,
        isNew: false
    },

    {
        id: "apparel-007",
        slug: "lamerei-black-puffer-jacket",
        brand: "LAMEREI",
        name: "Black Puffer Jacket",
        description:
            "Classic black puffer jacket with a warm hooded construction.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "jacket",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product7.png"
        ],
        thumbnail: "../../assets/images/productDetail/product7.png",
        rating: 4.8,
        reviewCount: 143,
        sizes: ["S", "M", "L"],
        colours: ["Black"],
        stock: 14,
        isFavourite: false,
        isNew: false
    },

    {
        id: "apparel-008",
        slug: "lamerei-stone-grey-padded-jacket",
        brand: "LAMEREI",
        name: "Stone Grey Padded Jacket",
        description:
            "Stone-grey padded jacket with a clean and versatile silhouette.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "jacket",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product8.png"
        ],
        thumbnail: "../../assets/images/productDetail/product8.png",
        rating: 4.8,
        reviewCount: 91,
        sizes: ["S", "M", "L"],
        colours: ["Stone Grey"],
        stock: 17,
        isFavourite: false,
        isNew: false
    },

    {
        id: "apparel-009",
        slug: "lamerei-cream-hooded-puffer-jacket",
        brand: "LAMEREI",
        name: "Cream Hooded Puffer Jacket",
        description:
            "Cream puffer jacket with a soft hood lining and utility pockets.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "jacket",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product9.png"
        ],
        thumbnail: "../../assets/images/productDetail/product9.png",
        rating: 4.8,
        reviewCount: 109,
        sizes: ["S", "M", "L"],
        colours: ["Cream"],
        stock: 13,
        isFavourite: false,
        isNew: true
    },

    {
        id: "apparel-010",
        slug: "lamerei-chocolate-turtleneck-sweater",
        brand: "LAMEREI",
        name: "Chocolate Turtleneck Sweater",
        description:
            "Relaxed chocolate-brown sweater with a soft turtleneck collar.",
        price: 120,
        originalPrice: null,
        currency: "USD",
        category: "apparel",
        subCategory: "sweater",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product10.png"
        ],
        thumbnail: "../../assets/images/productDetail/product10.png",
        rating: 4.8,
        reviewCount: 84,
        sizes: ["S", "M", "L"],
        colours: ["Chocolate Brown"],
        stock: 21,
        isFavourite: false,
        isNew: false
    },

    // =====================================================
    // JEWELLERY PRODUCTS
    // Ảnh lấy từ product1.png đến product12.png
    // =====================================================

    {
        id: "jewellery-001",
        slug: "aurora-triple-gold-ring",
        brand: "OPEN FASHION",
        name: "Aurora Triple Gold Ring",
        description:
            "Elegant layered gold ring designed for everyday styling.",
        price: 95,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product1.png",
            "../../assets/images/productDetail/product2.png",
            "../../assets/images/productDetail/product5.png"
        ],
        thumbnail: "../../assets/images/productDetail/product1.png",
        rating: 4.9,
        reviewCount: 81,
        sizes: ["6", "7", "8"],
        colours: ["Gold"],
        stock: 12,
        isFavourite: false,
        isNew: true
    },

    {
        id: "jewellery-002",
        slug: "celeste-slim-gold-band",
        brand: "OPEN FASHION",
        name: "Celeste Slim Gold Band",
        description:
            "A delicate slim gold band with a polished minimalist finish.",
        price: 65,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product2.png"
        ],
        thumbnail: "../../assets/images/productDetail/product2.png",
        rating: 4.7,
        reviewCount: 64,
        sizes: ["6", "7", "8"],
        colours: ["Gold"],
        stock: 18,
        isFavourite: false,
        isNew: false
    },

    {
        id: "jewellery-003",
        slug: "luna-round-gold-ring",
        brand: "OPEN FASHION",
        name: "Luna Round Gold Ring",
        description:
            "Classic round gold ring with a clean and timeless silhouette.",
        price: 72,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product3.png"
        ],
        thumbnail: "../../assets/images/productDetail/product3.png",
        rating: 4.6,
        reviewCount: 42,
        sizes: ["6", "7", "8"],
        colours: ["Gold"],
        stock: 16,
        isFavourite: false,
        isNew: false
    },

    {
        id: "jewellery-004",
        slug: "serena-double-gold-earrings",
        brand: "OPEN FASHION",
        name: "Serena Double Gold Earrings",
        description:
            "Refined double-bar gold earrings with a lightweight design.",
        price: 80,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "earrings",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product4.png"
        ],
        thumbnail: "../../assets/images/productDetail/product4.png",
        rating: 4.8,
        reviewCount: 73,
        sizes: ["One Size"],
        colours: ["Gold"],
        stock: 25,
        isFavourite: false,
        isNew: false
    },

    {
        id: "jewellery-005",
        slug: "elara-textured-gold-ring",
        brand: "OPEN FASHION",
        name: "Elara Textured Gold Ring",
        description:
            "Textured gold ring with an elegant multi-band appearance.",
        price: 88,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product5.png"
        ],
        thumbnail: "../../assets/images/productDetail/product5.png",
        rating: 4.8,
        reviewCount: 57,
        sizes: ["6", "7", "8"],
        colours: ["Gold"],
        stock: 14,
        isFavourite: false,
        isNew: true
    },

    {
        id: "jewellery-006",
        slug: "muse-minimal-gold-ring",
        brand: "OPEN FASHION",
        name: "Muse Minimal Gold Ring",
        description:
            "Minimal gold ring presented with an elegant editorial aesthetic.",
        price: 78,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product6.png"
        ],
        thumbnail: "../../assets/images/productDetail/product6.png",
        rating: 4.7,
        reviewCount: 39,
        sizes: ["6", "7", "8"],
        colours: ["Gold"],
        stock: 11,
        isFavourite: false,
        isNew: false
    },

    {
        id: "jewellery-007",
        slug: "aria-stacked-gold-ring-set",
        brand: "OPEN FASHION",
        name: "Aria Stacked Gold Ring Set",
        description:
            "A coordinated set of delicate gold rings for stacked styling.",
        price: 110,
        originalPrice: 135,
        currency: "USD",
        category: "accessories",
        subCategory: "ring-set",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product7.png"
        ],
        thumbnail: "../../assets/images/productDetail/product7.png",
        rating: 4.9,
        reviewCount: 96,
        sizes: ["6", "7", "8"],
        colours: ["Gold"],
        stock: 9,
        isFavourite: false,
        isNew: true
    },

    {
        id: "jewellery-008",
        slug: "solitaire-diamond-stone",
        brand: "OPEN FASHION",
        name: "Solitaire Diamond Stone",
        description:
            "Brilliant round-cut stone designed as the centrepiece of a ring.",
        price: 320,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "diamond",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product8.png"
        ],
        thumbnail: "../../assets/images/productDetail/product8.png",
        rating: 5,
        reviewCount: 28,
        sizes: ["One Size"],
        colours: ["Clear"],
        stock: 6,
        isFavourite: false,
        isNew: true
    },

    {
        id: "jewellery-009",
        slug: "aurora-classic-wedding-band",
        brand: "OPEN FASHION",
        name: "Aurora Classic Wedding Band",
        description:
            "Polished gold wedding band with a balanced classic profile.",
        price: 145,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product9.png"
        ],
        thumbnail: "../../assets/images/productDetail/product9.png",
        rating: 4.9,
        reviewCount: 112,
        sizes: ["6", "7", "8"],
        colours: ["Gold"],
        stock: 10,
        isFavourite: false,
        isNew: false
    },

    {
        id: "jewellery-010",
        slug: "violet-gemstone-gold-ring",
        brand: "OPEN FASHION",
        name: "Violet Gemstone Gold Ring",
        description:
            "Statement gold ring featuring a brilliant violet centre stone.",
        price: 230,
        originalPrice: 260,
        currency: "USD",
        category: "accessories",
        subCategory: "gemstone-ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product10.png"
        ],
        thumbnail: "../../assets/images/productDetail/product10.png",
        rating: 4.9,
        reviewCount: 67,
        sizes: ["6", "7", "8"],
        colours: ["Gold", "Violet"],
        stock: 7,
        isFavourite: false,
        isNew: true
    },

    {
        id: "jewellery-011",
        slug: "elise-diamond-gold-band",
        brand: "OPEN FASHION",
        name: "Elise Diamond Gold Band",
        description:
            "Slim gold band finished with a subtle central diamond detail.",
        price: 185,
        originalPrice: null,
        currency: "USD",
        category: "accessories",
        subCategory: "diamond-ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product11.png"
        ],
        thumbnail: "../../assets/images/productDetail/product11.png",
        rating: 4.8,
        reviewCount: 54,
        sizes: ["6", "7", "8"],
        colours: ["Gold", "Clear"],
        stock: 8,
        isFavourite: false,
        isNew: false
    },

    {
        id: "jewellery-012",
        slug: "aqua-emerald-cut-gold-ring",
        brand: "OPEN FASHION",
        name: "Aqua Emerald-Cut Gold Ring",
        description:
            "Bold gold ring featuring an aqua emerald-cut centre stone.",
        price: 275,
        originalPrice: 310,
        currency: "USD",
        category: "accessories",
        subCategory: "gemstone-ring",
        audience: "women",
        images: [
            "../../assets/images/productDetail/product12.png"
        ],
        thumbnail: "../../assets/images/productDetail/product12.png",
        rating: 4.9,
        reviewCount: 46,
        sizes: ["6", "7", "8"],
        colours: ["Gold", "Aqua"],
        stock: 5,
        isFavourite: false,
        isNew: true
    }
];

