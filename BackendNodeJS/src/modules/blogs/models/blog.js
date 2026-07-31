import mongoose from "mongoose";

import { BLOG_STATUS } from "../constants/blog.constant.js";

const { Schema } = mongoose;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
            minlength: 5,
            maxlength: 200
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        shortDescription: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },
        content: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true,
            trim: true
        },
        images: [
            {
                type: String,
                trim: true
            }
        ],
        category: {
            type: Schema.Types.ObjectId,
            ref: "BlogCategory",
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            required: true
        },
        tags: [
            {
                type: String,
                trim: true
            }
        ],
        status: {
            type: String,
            enum: Object.values(BLOG_STATUS),
            default: BLOG_STATUS.DRAFT
        },
        viewCount: {
            type: Number,
            default: 0,
            min: 0
        },
        likeCount: {
            type: Number,
            default: 0,
            min: 0
        },
        commentCount: {
            type: Number,
            default: 0,
            min: 0
        },
        publishedAt: {
            type: Date,
            default: null
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

blogSchema.index({ category: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({
    title: "text",
    shortDescription: "text",
    content: "text"
});

blogSchema.virtual("url").get(function getUrl() {
    return `/blog/${this.slug}`;
});

blogSchema.set("toJSON", {
    virtuals: true
});

blogSchema.set("toObject", {
    virtuals: true
});

export default mongoose.model("Blog", blogSchema);
