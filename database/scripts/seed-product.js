import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "../../BackendNodeJS/src/config/env.js";
import mongoose from "../config/mongoose.js";
import { connectDatabase } from "../config/index.js";
import Product from "../models/product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");
const filePath = path.join(rootDir, "database", "json", "products.json");

function slugify(value) {
    return value
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function uniqueStrings(values) {
    return [...new Set(values.filter(Boolean))];
}

function normalizeProduct(product) {
    const variants = Array.isArray(product.variants)
        ? product.variants.map((variant) => ({
            id: variant.id,
            sku: variant.sku,
            size: variant.size,
            color: variant.color,
            price: variant.price,
            stock: variant.stock
        }))
        : [];

    const colors = uniqueStrings([
        ...(product.colors ?? []),
        ...variants.map((variant) => variant.color)
    ]);

    const sizes = uniqueStrings([
        ...(product.sizes ?? []),
        ...variants.map((variant) => variant.size)
    ]);

    const computedStock = variants.reduce(
        (total, variant) => total + (variant.stock ?? 0),
        0
    );

    return {
        id: product.id,
        title: product.title,
        slug: product.slug || slugify(product.title),
        description: product.description,
        category: product.category,
        department: product.department,
        brand: product.brand,
        price: product.price,
        discountPercentage: product.discountPercentage ?? product.discountPercent ?? 0,
        stock: product.stock ?? computedStock,
        rating: product.rating,
        sku: product.sku ?? variants[0]?.sku,
        tags: product.tags ?? [],
        colors,
        sizes,
        images: Array.isArray(product.images) ? product.images : [],
        thumbnail: product.thumbnail ?? product.images?.[0] ?? null,
        variants,
        status: product.status ?? "active"
    };
}

try {
    await connectDatabase();

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const productData = products.map(normalizeProduct);

    await Product.deleteMany({});
    await Product.insertMany(productData);

    console.log(`${productData.length} products imported successfully!`);
} catch (error) {
    console.error("Failed to seed products");
    console.error(error.message);
    process.exitCode = 1;
} finally {
    await mongoose.connection.close();
}
