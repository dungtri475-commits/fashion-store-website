const COLLECTIONS = {
    october: {
        title: "October",
        number: "10",
        hero: "collection/collection1.png",
        products: [
            ["collection/collection2.png", "Black Dress", "Dress", "$95"],
            ["collection/collection3.png", "Black Shoes", "Shoes", "$80"],
            ["collection/collection4.png", "Silver Earrings", "Accessories", "$45"],
            ["collection/collection5.png", "Silver Ring", "Accessories", "$55"],
            ["collection/collection6.png", "Gold Bracelet", "Accessories", "$65"],
            ["collection/collection7.png", "Gold Ring", "Accessories", "$60"]
        ]
    },
    autumn: {
        title: "Autumn",
        number: "09",
        hero: "homePage/collections/collection2.png",
        products: [
            ["category/category_Grid_view_full/category1.png", "Soft Tailored Coat", "Apparel", "$120"],
            ["category/category_Grid_view_full/category2.png", "Autumn Knit", "Apparel", "$95"],
            ["category/category_Grid_view_full/category3.png", "Pleated Dress", "Dress", "$110"],
            ["category/category_Grid_view_full/category4.png", "Leather Bag", "Bag", "$90"],
            ["productDetail/product5.png", "Everyday Blouse", "Apparel", "$75"],
            ["productDetail/product6.png", "Tailored Trousers", "Apparel", "$100"]
        ]
    }
};

const DETAIL_IMAGES = [
    "category/category_Grid_view_full/category1.png", "category/category_Grid_view_full/category2.png", "category/category_Grid_view_full/category3.png",
    "category/category_Grid_view_full/category4.png", "category/category_Grid_view_full/category5.png", "category/category_Grid_view_full/category6.png",
    "blogGridView/Blog1.png", "blogGridView/Blog2.png", "blogGridView/Blog3.png", "blogGridView/Blog4.png", "blogGridView/Blog5.png",
    "blogGridView/Blog6.png", "blogGridView/Blog7.png", "blogGridView/Blog8.png", "blogGridView/Blog9.png"
];
const DETAIL_TITLES = ["October", "Autumn", "Black Edit", "Tailored", "Soft Layers", "After Hours", "Studio", "Portrait", "Form", "Contrast", "Essentials", "Modern", "Archive", "Objects", "Notes"];

function productCard([image, name, category, price]) {
    const productUrl = `./pages/product/product.html?product=${encodeURIComponent(name)}&image=${encodeURIComponent(`assets/images/${image}`)}`;
    return `
        <a class="collection-product-card" href="${productUrl}">
            <img src="./assets/images/${image}" alt="${name}">
            <span>${name}</span>
            <small>${category}</small>
            <strong>${price}</strong>
        </a>
    `;
}

export function CollectionPage(slug = "october", heroImage, collectionTitle) {
    const detailMatch = /^detail-(\d+)$/.exec(slug);
    const detailId = detailMatch ? Number(detailMatch[1]) : 0;
    const collection = detailId ? {
        title: DETAIL_TITLES[detailId - 1],
        number: String(detailId).padStart(2, "0"),
        hero: DETAIL_IMAGES[detailId - 1],
        products: Array.from({ length: 6 }, (_, offset) => [DETAIL_IMAGES[(detailId + offset) % DETAIL_IMAGES.length], `${DETAIL_TITLES[detailId - 1]} edit ${offset + 1}`, "Featured", `$${80 + offset * 10}`])
    } : COLLECTIONS[slug] || {
        ...COLLECTIONS.october,
        title: collectionTitle || slug.replace(/-/g, " "),
        hero: heroImage || COLLECTIONS.october.hero
    };
    return `
        <main class="collection-page">
            <section class="collection-page__heading">
                <span aria-hidden="true">${collection.number}</span>
                <div><h1>${collection.title}</h1><p>COLLECTION</p></div>
            </section>
            <section class="collection-page__hero">
                <img src="./assets/images/${collection.hero}" alt="${collection.title} Collection">
            </section>
            <section class="collection-page__products" aria-label="${collection.title} products">
                ${collection.products.map(productCard).join("")}
            </section>
        </main>
    `;
}
