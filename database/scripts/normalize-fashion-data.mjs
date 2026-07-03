import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");

const productsPath = path.join(rootDir, "database", "json", "products.json");
const cartsPath = path.join(rootDir, "database", "json", "carts.json");

const originalProducts = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const originalCarts = JSON.parse(fs.readFileSync(cartsPath, "utf8"));

const keptProductIds = new Set([
  83, 84, 85, 86, 87,
  88, 89, 90, 91, 92,
  93, 94, 95, 96, 97, 98,
  154, 155, 156, 157, 158,
  162, 163, 164, 165, 166,
  172, 173, 174, 175, 176,
  177, 178, 179, 180, 181,
  182, 183, 184,
  185, 186, 187, 188, 189,
  190, 191, 192, 193, 194
]);

const existingOverrides = {
  84: {
    title: "Urban Essential Crew T-Shirt",
    description: "A clean everyday crew-neck T-shirt with a soft cotton feel and a relaxed streetwear silhouette.",
    brand: "Street Core",
    category: "mens-tshirts",
    department: "men",
    tags: ["men", "t-shirt", "casual", "streetwear"]
  },
  83: { category: "mens-shirts", department: "men", tags: ["men", "shirt", "checked", "casual"] },
  85: { category: "mens-shirts", department: "men", tags: ["men", "shirt", "plaid", "smart-casual"] },
  86: { category: "mens-shirts", department: "men", tags: ["men", "shirt", "short-sleeve", "summer"] },
  87: { category: "mens-shirts", department: "men", tags: ["men", "shirt", "checked", "classic"] },
  88: { category: "mens-shoes", department: "men", tags: ["men", "shoes", "sneakers", "streetwear"] },
  89: { category: "mens-shoes", department: "men", tags: ["men", "shoes", "cleats", "sport"] },
  90: { category: "mens-shoes", department: "men", tags: ["men", "shoes", "trainers", "casual"] },
  91: { category: "mens-shoes", department: "men", tags: ["men", "shoes", "sneakers", "fashion"] },
  92: { category: "mens-shoes", department: "men", tags: ["men", "shoes", "sneakers", "fashion"] },
  93: { category: "mens-watches", department: "men", tags: ["men", "watch", "leather-strap", "classic"] },
  94: { category: "mens-watches", department: "men", tags: ["men", "watch", "luxury", "formal"] },
  95: { category: "mens-watches", department: "men", tags: ["men", "watch", "luxury", "dress-watch"] },
  96: { category: "mens-watches", department: "men", tags: ["men", "watch", "luxury", "moonphase"] },
  97: { category: "mens-watches", department: "men", tags: ["men", "watch", "luxury", "datejust"] },
  98: { category: "mens-watches", department: "men", tags: ["men", "watch", "diver", "luxury"] },
  154: { category: "sunglasses", department: "accessories", tags: ["sunglasses", "black", "unisex", "fashion"] },
  155: { category: "sunglasses", department: "accessories", tags: ["sunglasses", "classic", "unisex", "fashion"] },
  156: { category: "sunglasses", department: "accessories", tags: ["sunglasses", "green", "statement", "fashion"] },
  157: { category: "sunglasses", department: "accessories", tags: ["sunglasses", "party", "festival", "fashion"] },
  158: { category: "sunglasses", department: "accessories", tags: ["sunglasses", "daily", "unisex", "fashion"] },
  162: { category: "womens-dresses", department: "women", tags: ["women", "dress", "blue", "casual"] },
  163: { category: "womens-dresses", department: "women", tags: ["women", "dress", "summer", "casual"] },
  164: { category: "womens-dresses", department: "women", tags: ["women", "dress", "gray", "minimal"] },
  165: { category: "womens-dresses", department: "women", tags: ["women", "dress", "short", "party"] },
  166: { category: "womens-dresses", department: "women", tags: ["women", "dress", "tartan", "classic"] },
  172: { category: "bags", department: "women", tags: ["women", "bag", "handbag", "blue"] },
  173: { category: "bags", department: "women", tags: ["women", "bag", "leather", "everyday"] },
  174: { category: "bags", department: "women", tags: ["women", "bag", "designer", "luxury"] },
  175: { category: "bags", department: "women", tags: ["women", "bag", "backpack", "faux-leather"] },
  176: { category: "bags", department: "women", tags: ["women", "bag", "handbag", "black"] },
  177: { category: "womens-dresses", department: "women", tags: ["women", "dress", "gown", "formal"] },
  178: { category: "womens-dresses", department: "women", tags: ["women", "dress", "corset", "party"] },
  179: { category: "womens-dresses", department: "women", tags: ["women", "dress", "corset", "evening"] },
  180: { category: "womens-dresses", department: "women", tags: ["women", "dress", "pea", "minimal"] },
  181: {
    title: "Marni Red & Black Dress Set",
    description: "A designer-inspired red and black dress set with a structured silhouette for bold evening styling.",
    category: "womens-dresses",
    department: "women",
    tags: ["women", "dress", "set", "designer"]
  },
  182: { category: "jewellery", department: "women", tags: ["women", "jewellery", "earrings", "green-crystal"] },
  183: { category: "jewellery", department: "women", tags: ["women", "jewellery", "earrings", "oval"] },
  184: { category: "jewellery", department: "women", tags: ["women", "jewellery", "earrings", "tropical"] },
  185: { category: "womens-shoes", department: "women", tags: ["women", "shoes", "slippers", "casual"] },
  186: { category: "womens-shoes", department: "women", tags: ["women", "shoes", "heels", "formal"] },
  187: { category: "womens-shoes", department: "women", tags: ["women", "shoes", "heels", "party"] },
  188: { category: "womens-shoes", department: "women", tags: ["women", "shoes", "heels", "classic"] },
  189: { category: "womens-shoes", department: "women", tags: ["women", "shoes", "heels", "red"] },
  190: { category: "womens-watches", department: "women", tags: ["women", "watch", "steel", "luxury"] },
  191: { category: "womens-watches", department: "women", tags: ["women", "watch", "moonphase", "luxury"] },
  192: { category: "womens-watches", department: "women", tags: ["women", "watch", "datejust", "luxury"] },
  193: { category: "womens-watches", department: "women", tags: ["women", "watch", "gold", "fashion"] },
  194: { category: "womens-watches", department: "women", tags: ["women", "watch", "daily", "minimal"] }
};

const customProducts = [
  {
    id: 195,
    title: "Classic Pique Polo Shirt",
    category: "mens-tshirts",
    department: "men",
    brand: "North Line",
    price: 34.99,
    discountPercentage: 8.5,
    rating: 4.6,
    tags: ["men", "polo", "t-shirt", "smart-casual"],
    colors: ["Navy", "White", "Forest Green"],
    description: "A breathable pique polo made for office-casual days and polished weekend wear."
  },
  {
    id: 196,
    title: "Tailored Stretch Chinos",
    category: "mens-pants",
    department: "men",
    brand: "Modern Form",
    price: 49.99,
    discountPercentage: 10,
    rating: 4.5,
    tags: ["men", "pants", "chinos", "smart-casual"],
    colors: ["Khaki", "Navy", "Black"],
    description: "Slim tailored chinos with added stretch for all-day comfort and a clean silhouette."
  },
  {
    id: 197,
    title: "Relaxed Fit Denim Jeans",
    category: "mens-pants",
    department: "men",
    brand: "Denim Foundry",
    price: 54.99,
    discountPercentage: 12,
    rating: 4.4,
    tags: ["men", "jeans", "denim", "relaxed"],
    colors: ["Indigo", "Washed Black", "Mid Blue"],
    description: "Relaxed straight-leg denim jeans designed to pair easily with sneakers, polos, and jackets."
  },
  {
    id: 198,
    title: "Weekend Drawstring Shorts",
    category: "mens-pants",
    department: "men",
    brand: "Coastline",
    price: 29.99,
    discountPercentage: 7,
    rating: 4.3,
    tags: ["men", "shorts", "summer", "casual"],
    colors: ["Sand", "Olive", "Charcoal"],
    description: "Lightweight drawstring shorts for warm-weather outfits and laid-back weekend styling."
  },
  {
    id: 199,
    title: "Ribbed Crop Top",
    category: "womens-tops",
    department: "women",
    brand: "Luna Edit",
    price: 24.99,
    discountPercentage: 9,
    rating: 4.5,
    tags: ["women", "top", "crop-top", "everyday"],
    colors: ["Ivory", "Black", "Rose"],
    description: "A fitted ribbed crop top that layers easily under jackets or stands out on its own."
  },
  {
    id: 200,
    title: "Satin Office Blouse",
    category: "womens-tops",
    department: "women",
    brand: "Maison Vale",
    price: 39.99,
    discountPercentage: 11,
    rating: 4.6,
    tags: ["women", "top", "blouse", "office"],
    colors: ["Champagne", "Emerald", "Black"],
    description: "Soft satin blouse with a polished drape for workdays, dinners, and elevated daily styling."
  },
  {
    id: 201,
    title: "Oversized Linen Shirt",
    category: "womens-tops",
    department: "women",
    brand: "Harbor Muse",
    price: 42.99,
    discountPercentage: 10,
    rating: 4.4,
    tags: ["women", "top", "shirt", "linen"],
    colors: ["Sky Blue", "White", "Stone"],
    description: "An oversized linen shirt with a breathable feel and relaxed fit for modern resort-inspired looks."
  },
  {
    id: 202,
    title: "High-Rise Wide Leg Jeans",
    category: "womens-pants",
    department: "women",
    brand: "Denim Atelier",
    price: 57.99,
    discountPercentage: 10,
    rating: 4.7,
    tags: ["women", "pants", "jeans", "wide-leg"],
    colors: ["Dark Indigo", "Light Wash", "Black"],
    description: "High-rise wide-leg jeans that balance comfort and shape for effortless casual outfits."
  },
  {
    id: 203,
    title: "Tailored Ankle Trousers",
    category: "womens-pants",
    department: "women",
    brand: "Studio Nine",
    price: 46.99,
    discountPercentage: 8,
    rating: 4.4,
    tags: ["women", "pants", "trousers", "tailored"],
    colors: ["Black", "Camel", "Taupe"],
    description: "Clean ankle-length trousers with a tailored cut suited to office wear and smart casual outfits."
  },
  {
    id: 204,
    title: "Voyager Leather Messenger Bag",
    category: "bags",
    department: "men",
    brand: "Alder Goods",
    price: 89.99,
    discountPercentage: 13,
    rating: 4.5,
    tags: ["men", "bag", "messenger", "leather"],
    colors: ["Brown", "Black"],
    description: "Structured leather messenger bag built for daily commuting, documents, and travel essentials."
  },
  {
    id: 205,
    title: "Canvas Weekend Backpack",
    category: "bags",
    department: "men",
    brand: "Field & Frame",
    price: 69.99,
    discountPercentage: 9,
    rating: 4.4,
    tags: ["men", "bag", "backpack", "canvas"],
    colors: ["Olive", "Navy"],
    description: "A rugged canvas backpack with a fashion-forward silhouette and practical everyday capacity."
  },
  {
    id: 206,
    title: "Slim Leather Wallet",
    category: "wallets",
    department: "accessories",
    brand: "Alder Goods",
    price: 29.99,
    discountPercentage: 6,
    rating: 4.6,
    tags: ["wallet", "leather", "slim", "accessories"],
    colors: ["Black", "Brown"],
    description: "Minimal leather wallet with a slim profile, card slots, and a refined everyday finish."
  },
  {
    id: 207,
    title: "Zip Around Wallet",
    category: "wallets",
    department: "women",
    brand: "Maison Vale",
    price: 34.99,
    discountPercentage: 8,
    rating: 4.5,
    tags: ["wallet", "zip", "women", "accessories"],
    colors: ["Wine", "Sand"],
    description: "Compact zip-around wallet with organized compartments for cards, cash, and essentials."
  },
  {
    id: 208,
    title: "Stainless Link Smart Watch",
    category: "smart-watch",
    department: "accessories",
    brand: "Pulse Wear",
    price: 149.99,
    discountPercentage: 12,
    rating: 4.4,
    tags: ["smart-watch", "wearables", "accessories", "steel"],
    colors: ["Silver", "Black"],
    description: "A sleek smart watch with a stainless steel bracelet, fitness tracking, and message notifications."
  },
  {
    id: 209,
    title: "Sport Edition Smart Watch",
    category: "smart-watch",
    department: "accessories",
    brand: "Pulse Wear",
    price: 129.99,
    discountPercentage: 10,
    rating: 4.3,
    tags: ["smart-watch", "wearables", "sport", "silicone"],
    colors: ["Black", "Blue"],
    description: "Lightweight smart watch with a silicone strap, workout tracking, and everyday water resistance."
  },
  {
    id: 210,
    title: "Braided Leather Belt",
    category: "belts",
    department: "accessories",
    brand: "North Line",
    price: 26.99,
    discountPercentage: 7,
    rating: 4.5,
    tags: ["belt", "leather", "accessories", "braided"],
    colors: ["Tan", "Dark Brown"],
    description: "Braided leather belt that adds subtle texture to denim, chinos, and modern tailoring."
  },
  {
    id: 211,
    title: "Minimal Buckle Belt",
    category: "belts",
    department: "women",
    brand: "Luna Edit",
    price: 24.99,
    discountPercentage: 5,
    rating: 4.4,
    tags: ["belt", "women", "minimal", "accessories"],
    colors: ["Black", "Cream"],
    description: "A slim belt with a clean metal buckle made to define dresses, pants, and oversized shirts."
  },
  {
    id: 212,
    title: "Signature Baseball Cap",
    category: "hats-caps",
    department: "accessories",
    brand: "Street Core",
    price: 21.99,
    discountPercentage: 5,
    rating: 4.3,
    tags: ["cap", "hat", "accessories", "streetwear"],
    colors: ["Black", "Stone"],
    description: "Classic curved-brim cap with clean embroidery for casual looks and sunny-day styling."
  },
  {
    id: 213,
    title: "Classic Wool Fedora",
    category: "hats-caps",
    department: "accessories",
    brand: "Maison Vale",
    price: 44.99,
    discountPercentage: 9,
    rating: 4.2,
    tags: ["hat", "fedora", "accessories", "wool"],
    colors: ["Camel", "Charcoal"],
    description: "Structured wool fedora that elevates autumn and occasion outfits with a tailored finish."
  },
  {
    id: 214,
    title: "Lightweight Pattern Scarf",
    category: "scarves-socks",
    department: "accessories",
    brand: "Harbor Muse",
    price: 23.99,
    discountPercentage: 6,
    rating: 4.4,
    tags: ["scarf", "accessories", "pattern", "lightweight"],
    colors: ["Rust", "Navy"],
    description: "Soft patterned scarf for transitional weather and layered styling across seasons."
  },
  {
    id: 215,
    title: "Cotton Everyday Socks Set",
    category: "scarves-socks",
    department: "accessories",
    brand: "North Line",
    price: 18.99,
    discountPercentage: 4,
    rating: 4.6,
    tags: ["socks", "accessories", "cotton", "daily"],
    colors: ["Black", "Gray"],
    description: "Comfort-first cotton socks set with reinforced heels and a clean everyday finish."
  },
  {
    id: 216,
    title: "Matte Steel Bracelet",
    category: "jewellery",
    department: "men",
    brand: "Forge Line",
    price: 31.99,
    discountPercentage: 7,
    rating: 4.3,
    tags: ["men", "jewellery", "bracelet", "steel"],
    colors: ["Steel", "Black"],
    description: "Minimal matte steel bracelet that adds understated edge to smart-casual wardrobes."
  },
  {
    id: 217,
    title: "Onyx Signet Ring",
    category: "jewellery",
    department: "men",
    brand: "Forge Line",
    price: 28.99,
    discountPercentage: 6,
    rating: 4.2,
    tags: ["men", "jewellery", "ring", "onyx"],
    colors: ["Silver", "Gold"],
    description: "Statement signet ring with an onyx face, designed for everyday wear and occasion styling."
  },
  {
    id: 218,
    title: "Aviator Leather Weekender",
    category: "bags",
    department: "men",
    brand: "Alder Goods",
    price: 119.99,
    discountPercentage: 14,
    rating: 4.7,
    tags: ["men", "bag", "weekender", "travel"],
    colors: ["Chestnut", "Black"],
    description: "Premium leather weekender with a spacious interior for travel, work, and elevated daily carry."
  },
  {
    id: 219,
    title: "Quilted Crossbody Bag",
    category: "bags",
    department: "women",
    brand: "Luna Edit",
    price: 64.99,
    discountPercentage: 10,
    rating: 4.5,
    tags: ["women", "bag", "crossbody", "quilted"],
    colors: ["Black", "Blush"],
    description: "Compact quilted crossbody bag with polished hardware for day-to-night styling."
  },
  {
    id: 220,
    title: "Pearl Accent Necklace",
    category: "jewellery",
    department: "women",
    brand: "Maison Vale",
    price: 36.99,
    discountPercentage: 8,
    rating: 4.6,
    tags: ["women", "jewellery", "necklace", "pearl"],
    colors: ["Gold", "Silver"],
    description: "Layer-ready necklace finished with pearl accents for elegant daily or occasion wear."
  },
  {
    id: 221,
    title: "Travel Card Wallet",
    category: "wallets",
    department: "accessories",
    brand: "Field & Frame",
    price: 27.99,
    discountPercentage: 5,
    rating: 4.4,
    tags: ["wallet", "travel", "accessories", "cards"],
    colors: ["Navy", "Olive"],
    description: "Compact travel wallet with organized card storage and a secure snap closure."
  }
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function round2(value) {
  return Number(value.toFixed(2));
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function placeholderImage(title, index = 1) {
  const text = encodeURIComponent(title);
  return `https://placehold.co/900x1200/f5f1ea/1f2937?text=${text}+${index}`;
}

function buildVariants(product) {
  const slug = slugify(product.title);
  const colors = product.colors?.length ? product.colors : ["Black", "White"];

  if (["mens-shirts", "mens-tshirts", "mens-pants"].includes(product.category)) {
    const sizes = ["M", "L", "XL"];
    return sizes.map((size, index) => ({
      id: `${slug}-${size.toLowerCase()}-${slugify(colors[index % colors.length])}`,
      sku: `${slug.slice(0, 12).toUpperCase()}-${size}-${index + 1}`,
      size,
      color: colors[index % colors.length],
      price: round2(product.price + index * 2),
      stock: 10 + index * 4
    }));
  }

  if (["womens-dresses", "womens-tops", "womens-pants"].includes(product.category)) {
    const sizes = ["S", "M", "L"];
    return sizes.map((size, index) => ({
      id: `${slug}-${size.toLowerCase()}-${slugify(colors[index % colors.length])}`,
      sku: `${slug.slice(0, 12).toUpperCase()}-${size}-${index + 1}`,
      size,
      color: colors[index % colors.length],
      price: round2(product.price + index * 2),
      stock: 9 + index * 4
    }));
  }

  if (product.category === "mens-shoes") {
    const sizes = ["41", "42", "43"];
    return sizes.map((size, index) => ({
      id: `${slug}-${size}-${slugify(colors[index % colors.length])}`,
      sku: `${slug.slice(0, 12).toUpperCase()}-${size}-${index + 1}`,
      size,
      color: colors[index % colors.length],
      price: round2(product.price + index * 3),
      stock: 7 + index * 3
    }));
  }

  if (product.category === "womens-shoes") {
    const sizes = ["36", "37", "38"];
    return sizes.map((size, index) => ({
      id: `${slug}-${size}-${slugify(colors[index % colors.length])}`,
      sku: `${slug.slice(0, 12).toUpperCase()}-${size}-${index + 1}`,
      size,
      color: colors[index % colors.length],
      price: round2(product.price + index * 3),
      stock: 7 + index * 3
    }));
  }

  if (["mens-watches", "womens-watches"].includes(product.category)) {
    return colors.slice(0, 2).map((color, index) => ({
      id: `${slug}-${slugify(color)}`,
      sku: `${slug.slice(0, 12).toUpperCase()}-W-${index + 1}`,
      size: "One Size",
      color,
      price: round2(product.price + index * 8),
      stock: 5 + index * 2
    }));
  }

  if (product.category === "smart-watch") {
    const sizes = ["42mm", "44mm"];
    return sizes.map((size, index) => ({
      id: `${slug}-${slugify(size)}-${slugify(colors[index % colors.length])}`,
      sku: `${slug.slice(0, 12).toUpperCase()}-S-${index + 1}`,
      size,
      color: colors[index % colors.length],
      price: round2(product.price + index * 10),
      stock: 8 + index * 3
    }));
  }

  return colors.slice(0, 2).map((color, index) => ({
    id: `${slug}-${slugify(color)}`,
    sku: `${slug.slice(0, 12).toUpperCase()}-A-${index + 1}`,
    size: "One Size",
    color,
    price: round2(product.price + index * 4),
    stock: 8 + index * 3
  }));
}

function normalizeExistingProduct(product) {
  const override = existingOverrides[product.id] ?? {};
  const title = override.title ?? product.title;
  const category = override.category ?? product.category;
  const department = override.department ?? "accessories";
  const price = round2(product.price ?? 29.99);
  const discountPercentage = round2(override.discountPercentage ?? product.discountPercentage ?? 0);
  const rating = round2(product.rating ?? 4.3);
  const brand = override.brand ?? product.brand ?? "Fashion House";
  const tags = uniqueStrings([
    ...(override.tags ?? product.tags ?? []),
    ...accessoryGroupTags(category),
    category,
    department,
    "fashion-store"
  ]);
  const images = Array.isArray(product.images) && product.images.length ? product.images : [placeholderImage(title)];
  const thumbnail = product.thumbnail ?? images[0];
  const normalized = {
    id: product.id,
    title,
    slug: slugify(title),
    description: override.description ?? product.description,
    category,
    department,
    brand,
    price,
    discountPercentage,
    rating,
    tags,
    status: "active",
    images,
    thumbnail,
    variants: []
  };

  normalized.variants = buildVariants({
    ...normalized,
    colors: inferColorsFromTitle(title, category, tags)
  });
  normalized.stock = normalized.variants.reduce((sum, variant) => sum + variant.stock, 0);

  return normalized;
}

function inferColorsFromTitle(title, category, tags) {
  const joined = `${title} ${tags.join(" ")}`.toLowerCase();
  const found = [];
  const dictionary = [
    "black", "white", "blue", "red", "green", "brown", "gold",
    "silver", "gray", "grey", "pink", "beige", "navy", "olive",
    "tan", "ivory", "camel", "charcoal", "wine", "blush", "stone"
  ];

  for (const color of dictionary) {
    if (joined.includes(color)) {
      found.push(color === "grey" ? "Gray" : capitalize(color));
    }
  }

  if (found.length >= 2) {
    return uniqueStrings(found);
  }

  const fallbacks = {
    "mens-shirts": ["Blue", "Black", "White"],
    "mens-tshirts": ["Black", "White", "Navy"],
    "mens-pants": ["Khaki", "Navy", "Black"],
    "mens-shoes": ["Black", "White", "Red"],
    "mens-watches": ["Brown", "Black"],
    "womens-dresses": ["Black", "Rose", "Blue"],
    "womens-tops": ["Ivory", "Black", "Sky Blue"],
    "womens-pants": ["Black", "Camel", "Indigo"],
    "womens-shoes": ["Black", "Nude", "Red"],
    "womens-watches": ["Gold", "Silver"],
    "bags": ["Black", "Brown"],
    "wallets": ["Black", "Tan"],
    "jewellery": ["Gold", "Silver"],
    "sunglasses": ["Black", "Brown"],
    "belts": ["Black", "Brown"],
    "hats-caps": ["Black", "Stone"],
    "scarves-socks": ["Gray", "Navy"],
    "smart-watch": ["Black", "Silver"]
  };

  return fallbacks[category] ?? ["Black", "White"];
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeCustomProduct(product) {
  const images = [placeholderImage(product.title, 1), placeholderImage(product.title, 2)];
  const normalized = {
    id: product.id,
    title: product.title,
    slug: slugify(product.title),
    description: product.description,
    category: product.category,
    department: product.department,
    brand: product.brand,
    price: round2(product.price),
    discountPercentage: round2(product.discountPercentage),
    rating: round2(product.rating),
    tags: uniqueStrings([
      ...(product.tags ?? []),
      ...accessoryGroupTags(product.category),
      product.category,
      product.department,
      "fashion-store"
    ]),
    status: "active",
    images,
    thumbnail: images[0],
    variants: []
  };

  normalized.variants = buildVariants(product);
  normalized.stock = normalized.variants.reduce((sum, variant) => sum + variant.stock, 0);

  return normalized;
}

function accessoryGroupTags(category) {
  const accessoryCategories = new Set([
    "wallets",
    "jewellery",
    "sunglasses",
    "belts",
    "hats-caps",
    "scarves-socks",
    "smart-watch"
  ]);

  return accessoryCategories.has(category) ? ["fashion-accessories"] : [];
}

const normalizedProducts = [
  ...originalProducts.filter((product) => keptProductIds.has(product.id)).map(normalizeExistingProduct),
  ...customProducts.map(normalizeCustomProduct)
].sort((a, b) => a.id - b.id);

const productMap = new Map(normalizedProducts.map((product) => [product.id, product]));

function buildCartItem(product, seed, quantity) {
  const variant = product.variants[seed % product.variants.length];
  return {
    productId: product.id,
    variantId: variant.id,
    quantity,
    price: variant.price
  };
}

function fillFashionItems(cart, preservedItems) {
  const minItems = preservedItems.length === 0 ? 2 : Math.min(3, preservedItems.length + ((cart.id + cart.userId) % 2));
  const selected = [...preservedItems];
  const usedIds = new Set(selected.map((item) => item.productId));

  let cursor = cart.id + cart.userId;
  while (selected.length < minItems) {
    const product = normalizedProducts[cursor % normalizedProducts.length];
    cursor += 7;
    if (usedIds.has(product.id)) {
      continue;
    }

    const quantity = ((cart.id + selected.length) % 3) + 1;
    selected.push(buildCartItem(product, cursor, quantity));
    usedIds.add(product.id);
  }

  return selected;
}

const normalizedCarts = originalCarts.map((cart) => {
  const preservedItems = (cart.products ?? [])
    .filter((item) => productMap.has(item.id))
    .slice(0, 3)
    .map((item, index) => buildCartItem(productMap.get(item.id), cart.id + index, Math.max(1, Math.min(item.quantity ?? 1, 3))));

  const products = fillFashionItems(cart, preservedItems);
  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
  const total = round2(products.reduce((sum, item) => sum + item.price * item.quantity, 0));

  return {
    id: cart.id,
    userId: cart.userId,
    products,
    total,
    totalProducts: products.length,
    totalQuantity
  };
});

fs.writeFileSync(productsPath, `${JSON.stringify(normalizedProducts, null, 2)}\n`);
fs.writeFileSync(cartsPath, `${JSON.stringify(normalizedCarts, null, 2)}\n`);

const categorySummary = normalizedProducts.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] ?? 0) + 1;
  return acc;
}, {});

console.log(`products: ${normalizedProducts.length}`);
console.log(`carts: ${normalizedCarts.length}`);
console.log(JSON.stringify(categorySummary, null, 2));
