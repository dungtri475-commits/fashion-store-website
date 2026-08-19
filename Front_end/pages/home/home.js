export function HomePage() {
    return `
        <div class="home-figma-page w-full bg-white">
            <!-- Hero Banner Section -->
            <section class="relative w-full aspect-[3/5] bg-gray-100 flex items-center justify-center text-center overflow-hidden">
                <img src="./assets/images/homePage/heros/hero-banner.png" alt="Luxury fashion collection" class="absolute inset-0 w-full h-full object-cover object-top">
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="relative z-10 flex flex-col items-center px-4 mt-12">
                    <h1 class="text-[32px] leading-[40px] font-serif-title italic tracking-[2px] uppercase text-gray-800 font-normal">LUXURY<br><span class="not-italic tracking-[3px]">FASHION</span><br>& ACCESSORIES</h1>
                    <a href="#/blog" class="mt-28 bg-black/50 backdrop-blur-md text-white text-[11px] tracking-[2px] uppercase px-6 py-3 rounded-full hover:bg-black transition">EXPLORE COLLECTION</a>
                    <!-- Slider Pagination Dots -->
                    <div class="flex space-x-1.5 mt-6 items-center" aria-hidden="true"><span class="w-1.5 h-1.5 bg-white rotate-45 transform"></span><span class="w-1.5 h-1.5 border border-white/70 rotate-45 transform"></span><span class="w-1.5 h-1.5 border border-white/70 rotate-45 transform"></span></div>
                </div>
            </section>

            <!-- New Arrivals Section -->
            <section class="px-4 py-8 text-center">
                <h2 class="text-base tracking-[4px] uppercase font-serif-title text-black">NEW ARRIVAL</h2>
                <div class="divider-diamond"><span></span></div>
                <!-- Category Filter Tabs -->
                <div class="flex justify-center space-x-4 text-xs text-gray-400 mb-6"><div class="flex flex-col items-center"><span class="text-black font-medium cursor-pointer">All</span><span class="w-1 h-1 bg-amber-700 rotate-45 transform mt-1"></span></div><span>Apparel</span><span>Dress</span><span>Tshirt</span><span>Bag</span></div>
                <!-- Product Grid -->
                <div class="grid grid-cols-2 gap-x-3 gap-y-6 text-left">
                    ${productCard("new-arrival-1.png", "21WN reversible angora cardigan")}
                    ${productCard("new-arrival-2.png", "21WN reversible angora cardigan")}
                    ${productCard("new-arrival-3.png", "21WN reversible angora cardigan")}
                    ${productCard("new-arrival-4.png", "Oblong bag")}
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
                <!-- Collection Item 1 -->
                <div class="relative w-full aspect-[16/9] bg-gray-200 overflow-hidden mb-6"><img src="./assets/images/homePage/collections/collection1.png" alt="October Collection" class="w-full h-full object-cover"><div class="absolute top-1/2 right-6 -translate-y-1/2 text-right"><span class="text-6xl font-serif-title italic opacity-30 text-gray-900 block leading-none">10</span><h3 class="text-lg font-serif-title uppercase tracking-wider text-black -mt-4">October</h3><p class="text-[10px] tracking-[3px] uppercase text-gray-600">COLLECTION</p></div></div>
                <!-- Collection Item 2 -->
                <div class="px-8 my-8"><div class="relative aspect-square bg-gray-100 overflow-hidden"><img src="./assets/images/homePage/collections/collection2.png" alt="Autumn Collection" class="w-full h-full object-cover"><div class="absolute top-6 left-1/2 -translate-x-1/2 text-center w-full"><h3 class="text-2xl font-serif-title italic text-gray-800">Autumn</h3><p class="text-[10px] tracking-[4px] uppercase text-gray-600">COLLECTION</p></div></div></div>
                <!-- Video Banner -->
                <div class="relative w-full aspect-[16/9] bg-gray-300 overflow-hidden flex items-center justify-center"><img src="./assets/images/homePage/videos/Video.png" alt="Collection video preview" class="w-full h-full object-cover"><button type="button" class="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white absolute" aria-label="Play collection video"><svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg></button></div>
            </section>

            <!-- Just For You / Recommendations Section -->
            <section class="py-8 text-center">
                <h2 class="text-base tracking-[4px] uppercase font-serif-title text-black">JUST FOR YOU</h2>
                <div class="divider-diamond"><span></span></div>
                <!-- Horizontal Scrollable Product List -->
                <div class="flex overflow-x-auto space-x-4 px-4 pb-4 no-scrollbar scroll-smooth">
                    ${recommendationCard("recommendation1.png", "Harris Tweed Three button Jacket")}
                    ${recommendationCard("recommendation2.png", "Cashmere Blend Cropped Jacket")}
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

function productCard(image, name) {
    return `
        <div>
            <div class="aspect-[3/4] bg-gray-100 overflow-hidden mb-2"><img src="./assets/images/homePage/newArrivals/${image}" alt="${name}" class="w-full h-full object-cover"></div>
            <p class="text-[11px] text-gray-700 line-clamp-2 leading-tight">${name}</p>
            <p class="text-xs text-amber-700 mt-1 font-semibold">$120</p>
        </div>
    `;
}

function recommendationCard(image, name) {
    return `
        <div class="flex-none w-[200px] text-left">
            <div class="aspect-[3/4] bg-gray-100 mb-2"><img src="./assets/images/homePage/justForYou/${image}" alt="${name}" class="w-full h-full object-cover"></div>
            <p class="text-xs text-gray-800 line-clamp-2">${name}</p>
            <p class="text-xs text-amber-700 font-semibold mt-1">$120</p>
        </div>
    `;
}
