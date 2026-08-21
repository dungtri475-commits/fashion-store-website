export function HomePage() {
    return `
        <div class="home-figma-page w-full bg-white">
            <!-- Hero Banner Section -->
            <section class="hero-carousel-wrap relative w-full aspect-[3/5] bg-gray-100 text-center overflow-hidden">
                <div class="hero-carousel product-carousel flex w-full h-full overflow-x-auto no-scrollbar scroll-smooth" aria-label="Featured products">
                    ${heroBannerSlide("homePage/heros/hero-banner.png", "Luxury fashion collection", "LUXURY", "FASHION & ACCESSORIES")}
                    ${heroBannerSlide("homePage/newArrivals/new-arrival-1.png", "New knitwear collection", "NEW", "KNITWEAR")}
                    ${heroBannerSlide("homePage/newArrivals/new-arrival-4.png", "New bags collection", "SIGNATURE", "BAGS")}
                </div>
                <button class="carousel-control carousel-control--previous" type="button" data-carousel-control="previous" aria-label="Show previous featured collection"><span aria-hidden="true">&#8592;</span></button>
                <button class="carousel-control carousel-control--next" type="button" data-carousel-control="next" aria-label="Show next featured collection"><span aria-hidden="true">&#8594;</span></button>
            </section>

            <!-- New Arrivals Section -->
            <section class="px-4 py-8 text-center">
                <h2 class="text-base tracking-[4px] uppercase font-serif-title text-black">NEW ARRIVAL</h2>
                <div class="divider-diamond"><span></span></div>
                <!-- Category Filter Tabs -->
                <div class="new-arrival-filters" role="tablist" aria-label="Filter new arrivals">
                    <button type="button" class="is-active" data-new-arrival-filter="all" role="tab" aria-selected="true">All</button>
                    <button type="button" data-new-arrival-filter="apparel" role="tab" aria-selected="false">Apparel</button>
                    <button type="button" data-new-arrival-filter="dress" role="tab" aria-selected="false">Dress</button>
                    <button type="button" data-new-arrival-filter="tshirt" role="tab" aria-selected="false">Tshirt</button>
                    <button type="button" data-new-arrival-filter="bag" role="tab" aria-selected="false">Bag</button>
                </div>
                <!-- Product Grid -->
                <div class="product-carousel-wrap">
                    <button class="carousel-control carousel-control--previous" type="button" data-carousel-control="previous" aria-label="Show previous new arrivals"><span aria-hidden="true">&#8592;</span></button>
                    <div class="new-arrival-carousel product-carousel flex overflow-x-auto space-x-3 px-4 pb-4 no-scrollbar scroll-smooth" aria-label="New arrival products">
                        ${productCard("homePage/newArrivals/new-arrival-1.png", "21WN reversible angora cardigan", "apparel")}
                        ${productCard("homePage/newArrivals/new-arrival-2.png", "Cashmere blend jacket", "apparel")}
                        ${productCard("homePage/newArrivals/new-arrival-3.png", "Soft knit cardigan", "tshirt")}
                        ${productCard("homePage/newArrivals/new-arrival-4.png", "Oblong bag", "bag")}
                        ${productCard("productDetail/product1.png", "Classic cotton shirt", "tshirt")}
                        ${productCard("productDetail/product2.png", "Relaxed tailored blazer", "apparel")}
                        ${productCard("productDetail/product3.png", "Pleated midi skirt", "dress")}
                        ${productCard("productDetail/product4.png", "Leather mini bag", "bag")}
                    </div>
                    <button class="carousel-control carousel-control--next" type="button" data-carousel-control="next" aria-label="Show next new arrivals"><span aria-hidden="true">&#8594;</span></button>
                </div>
                <a href="#/blog" class="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-black mt-8"><span>Explore More</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg></a>
                <div class="divider-diamond mt-8"><span></span></div>
                <!-- Partner Brands -->
                <div class="my-6"><img src="./assets/images/homePage/brands/all-brands.png" alt="Prada, Burberry, Boss, Cartier, Gucci and Tiffany & Co." class="w-full h-auto object-contain opacity-80"></div>
                <div class="divider-diamond"><span></span></div>
            </section>

            <!-- Collections Section -->
            <section class="text-center py-4">
                <h2 class="text-base tracking-[4px] uppercase font-serif-title text-black mb-6">COLLECTIONS</h2>
                <div class="collection-carousel-wrap">
                    <button class="carousel-control carousel-control--previous" type="button" data-carousel-control="previous" aria-label="Show previous collection"><span aria-hidden="true">&#8592;</span></button>
                    <div class="collection-carousel product-carousel" aria-label="Collections">
                        ${collectionCard("homePage/collections/collection1.png", "October Collection", "October")}
                        ${collectionCard("homePage/collections/collection2.png", "Autumn Collection", "Autumn")}
                        ${collectionCard("homePage/videos/Video.png", "Seasonal Collection", "Seasonal")}
                    </div>
                    <button class="carousel-control carousel-control--next" type="button" data-carousel-control="next" aria-label="Show next collection"><span aria-hidden="true">&#8594;</span></button>
                </div>
            </section>

            <!-- Just For You / Recommendations Section -->
            <section class="py-8 text-center">
                <h2 class="text-base tracking-[4px] uppercase font-serif-title text-black">JUST FOR YOU</h2>
                <div class="divider-diamond"><span></span></div>
                <!-- Horizontal Scrollable Product List -->
                <div class="just-for-you-carousel-wrap">
                    <button class="carousel-control carousel-control--previous" type="button" data-carousel-control="previous" aria-label="Show previous products">
                        <span aria-hidden="true">&#8592;</span>
                    </button>
                    <div id="just-for-you-carousel" class="just-for-you-carousel product-carousel flex overflow-x-auto space-x-4 px-4 pb-4 no-scrollbar scroll-smooth" aria-label="Recommended products">
                        ${recommendationCard("homePage/justForYou/recommendation1.png", "Harris Tweed Three button Jacket")}
                        ${recommendationCard("homePage/justForYou/recommendation2.png", "Cashmere Blend Cropped Jacket")}
                        ${recommendationCard("homePage/newArrivals/new-arrival-3.png", "Soft knit cardigan")}
                        ${recommendationCard("homePage/newArrivals/new-arrival-4.png", "Classic leather bag")}
                        ${recommendationCard("productDetail/product5.png", "Essential cotton blouse")}
                        ${recommendationCard("productDetail/product6.png", "Tailored everyday trousers")}
                        ${recommendationCard("productDetail/product7.png", "Minimal shoulder bag")}
                        ${recommendationCard("productDetail/product8.png", "Signature evening dress")}
                    </div>
                    <button class="carousel-control carousel-control--next" type="button" data-carousel-control="next" aria-label="Show next products">
                        <span aria-hidden="true">&#8594;</span>
                    </button>
                </div>
                <div class="flex justify-center space-x-1.5 my-4" aria-hidden="true"><span class="w-1.5 h-1.5 bg-gray-500 rotate-45 transform"></span><span class="w-1.5 h-1.5 border border-gray-400 rotate-45 transform"></span><span class="w-1.5 h-1.5 border border-gray-400 rotate-45 transform"></span></div>
                <!-- Trending Hashtags -->
                <div class="mt-8 px-4"><h3 class="text-sm tracking-[3px] uppercase font-serif-title text-black mb-4">@TRENDING</h3><div class="flex flex-wrap justify-center gap-2 text-[11px] text-gray-600"><span class="bg-gray-100 px-3 py-1.5 rounded-full">#2021</span><span class="bg-gray-100 px-3 py-1.5 rounded-full">#spring</span><span class="bg-gray-100 px-3 py-1.5 rounded-full">#collection</span><span class="bg-gray-100 px-3 py-1.5 rounded-full">#fall</span><span class="bg-gray-100 px-3 py-1.5 rounded-full">#dress</span><span class="bg-gray-100 px-3 py-1.5 rounded-full">#autumncollection</span><span class="bg-gray-100 px-3 py-1.5 rounded-full">#openfashion</span></div></div>
            </section>

            <!-- About & Features Section -->
            <section class="bg-gray-50 px-6 py-10 text-center"><div class="text-center flex flex-col items-center mb-3"><span class="text-xl font-serif-title tracking-[3px] uppercase text-black leading-none">Open</span><span class="text-[9px] font-normal tracking-[5px] uppercase text-gray-700 leading-none mt-0.5">Fashion</span></div><p class="text-xs text-gray-500 leading-relaxed max-w-[260px] mx-auto mb-4">Making a luxurious lifestyle accessible for a generous group of women is our daily drive.</p><div class="divider-diamond"><span></span></div><!-- Feature Grid --><div class="grid grid-cols-2 gap-6 text-center mt-6 text-[11px] text-gray-600"><div class="flex flex-col items-center"><svg class="w-8 h-8 text-gray-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10l-8 4m0-10L4 7m8 4v10"></path></svg><p>Fast shipping. Free on orders over $25.</p></div><div class="flex flex-col items-center"><svg class="w-8 h-8 text-gray-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg><p>Sustainable process from start to finish.</p></div><div class="flex flex-col items-center"><svg class="w-8 h-8 text-gray-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg><p>Unique designs and high-quality materials.</p></div><div class="flex flex-col items-center"><svg class="w-8 h-8 text-gray-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg><p>Fast shipping. Free on orders over $25.</p></div></div></section>

            <!-- Social / Follow Us Section -->
            <section class="py-8 text-center"><h2 class="text-base tracking-[4px] uppercase font-serif-title text-black">FOLLOW US</h2><div class="grid grid-cols-2 gap-3 px-4 mt-8"><img src="./assets/images/homePage/followUs/instagram1.png" alt="Open Fashion Instagram post" class="w-full aspect-square object-cover"><img src="./assets/images/homePage/followUs/instagram2.png" alt="Open Fashion Instagram post" class="w-full aspect-square object-cover"><img src="./assets/images/homePage/followUs/instagram3.png" alt="Open Fashion Instagram post" class="w-full aspect-square object-cover"><img src="./assets/images/homePage/followUs/instagram4.png" alt="Open Fashion Instagram post" class="w-full aspect-square object-cover"></div></section>
        </div>
    `;
}

function heroBannerSlide(image, alt, title, subtitle) {
    return `
        <article class="hero-feature-slide relative h-full overflow-hidden">
            <img src="./assets/images/${image}" alt="${alt}" class="absolute inset-0 w-full h-full object-cover object-top">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-12">
                <h1 class="text-[32px] leading-[40px] font-serif-title italic tracking-[2px] uppercase text-gray-800 font-normal">${title}<br><span class="not-italic tracking-[3px]">${subtitle}</span></h1>
                <a href="./pages/collection/collection_detail/collection_detail.html" class="mt-28 bg-black/50 backdrop-blur-md text-white text-[11px] tracking-[2px] uppercase px-6 py-3 rounded-full hover:bg-black transition">EXPLORE COLLECTION</a>
                <div class="flex space-x-1.5 mt-6 items-center" aria-hidden="true"><span class="w-1.5 h-1.5 bg-white rotate-45 transform"></span><span class="w-1.5 h-1.5 border border-white/70 rotate-45 transform"></span><span class="w-1.5 h-1.5 border border-white/70 rotate-45 transform"></span></div>
            </div>
        </article>
    `;
}

function productCard(image, name, category) {
    const productUrl = `./pages/product/product.html?product=${encodeURIComponent(name)}&image=${encodeURIComponent(`assets/images/${image}`)}`;
    return `
        <a class="new-arrival-card" data-product-category="${category}" href="${productUrl}">
            <div class="aspect-[3/4] bg-gray-100 overflow-hidden mb-2"><img src="./assets/images/${image}" alt="${name}" class="w-full h-full object-cover"></div>
            <p class="text-[11px] text-gray-700 line-clamp-2 leading-tight">${name}</p>
            <p class="text-xs text-amber-700 mt-1 font-semibold">$120</p>
        </a>
    `;
}

function collectionCard(image, alt, title) {
    return `
        <a class="collection-card" href="./pages/collection/collection_detail/collection_detail.html">
            <img src="./assets/images/${image}" alt="${alt}">
            <span>${title}</span><small>COLLECTION</small>
        </a>
    `;
}

function recommendationCard(image, name) {
    return `
        <div class="flex-none w-[200px] text-left">
            <div class="aspect-[3/4] bg-gray-100 mb-2"><img src="./assets/images/${image}" alt="${name}" class="w-full h-full object-cover"></div>
            <p class="text-xs text-gray-800 line-clamp-2">${name}</p>
            <p class="text-xs text-amber-700 font-semibold mt-1">$120</p>
        </div>
    `;
}

let activeCarouselDrag = null;

document.addEventListener("click", (event) => {
    const filter = event.target.closest("[data-new-arrival-filter]");
    if (filter) {
        const category = filter.dataset.newArrivalFilter;
        const carousel = document.querySelector(".new-arrival-carousel");

        document.querySelectorAll("[data-new-arrival-filter]").forEach((tab) => {
            const isActive = tab === filter;
            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
        });
        document.querySelectorAll(".new-arrival-card").forEach((card) => {
            card.hidden = category !== "all" && card.dataset.productCategory !== category;
        });
        carousel?.scrollTo({ left: 0, behavior: "smooth" });
        return;
    }

    const control = event.target.closest("[data-carousel-control]");
    if (!control) return;

    const carousel = control.parentElement?.querySelector(".product-carousel");
    if (!carousel) return;

    const direction = control.dataset.carouselControl === "next" ? 1 : -1;
    carousel.scrollBy({ left: direction * carousel.clientWidth * 0.8, behavior: "smooth" });
});

document.addEventListener("pointerdown", (event) => {
    const carousel = event.target.closest(".product-carousel");
    if (!carousel || event.button !== 0) return;

    activeCarouselDrag = { carousel, pointerId: event.pointerId, startX: event.clientX, startScrollLeft: carousel.scrollLeft };
    carousel.setPointerCapture(event.pointerId);
    carousel.classList.add("is-dragging");
});

document.addEventListener("pointermove", (event) => {
    if (!activeCarouselDrag || activeCarouselDrag.pointerId !== event.pointerId) return;

    activeCarouselDrag.carousel.scrollLeft = activeCarouselDrag.startScrollLeft - (event.clientX - activeCarouselDrag.startX);
});

function stopCarouselDrag(event) {
    if (!activeCarouselDrag || activeCarouselDrag.pointerId !== event.pointerId) return;

    activeCarouselDrag.carousel.classList.remove("is-dragging");
    activeCarouselDrag = null;
}

document.addEventListener("pointerup", stopCarouselDrag);
document.addEventListener("pointercancel", stopCarouselDrag);
