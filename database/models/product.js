import mongoose from "../config/mongoose.js";

const variantSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            trim: true
        },
        sku: {
            type: String,
            required: true,
            trim: true
        },
        size: {
            type: String,
            required: true,
            trim: true
        },
        color: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        _id: false
    }
);

const productSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },

        title: {
            type: String,
            required: true
        },

        slug: {
            type: String,
            required: true,
            unique: true
        },

        description: String,

        category: String,

        department: String,

        brand: String,

        price: Number,

        discountPercentage: Number,

        stock: Number,

        rating: Number,

        sku: String,

        tags: [String],

        colors: [String],

        sizes: [String],

        images: [String],

        thumbnail: String,

        variants: {
            type: [variantSchema],
            default: []
        },

        status: {
            type: String,
            default: "active"
        }
    },
    {
        timestamps: true
    }
);
export default mongoose.model("Product", productSchema);
