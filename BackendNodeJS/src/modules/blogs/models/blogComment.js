import mongoose from "mongoose";

const { Schema } = mongoose;

const blogCommentSchema = new Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: "BlogComment",
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

blogCommentSchema.index({ blog: 1, createdAt: -1 });
blogCommentSchema.index({ parentComment: 1 });

export default mongoose.model("BlogComment", blogCommentSchema);
