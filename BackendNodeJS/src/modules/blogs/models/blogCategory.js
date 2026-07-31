import mongoose from "mongoose";

const { Schema } = mongoose;

const blogCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 255
        },
        image: {
            type: String,
            default: "",
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
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

blogCategorySchema.index({ name: 1 });

export default mongoose.model("BlogCategory", blogCategorySchema);
