import { BLOG_STATUS } from "../constants/blog.constant.js";
import BlogCategory from "../models/blogCategory.js";
import blogRepository from "../repositories/blog.repository.js";
import createHttpError from "../utils/http-error.js";
import slugify from "../utils/slug.js";

async function ensureCategoryExists(categoryId) {
    const category = await BlogCategory.findById(categoryId);

    if (!category || category.isDeleted || !category.isActive) {
        throw createHttpError("Category not found.", 400);
    }

    return category;
}

async function resolveCategoryFilter(categoryQuery) {
    if (!categoryQuery) {
        return null;
    }

    if (BlogCategory.base.Types.ObjectId.isValid(categoryQuery)) {
        return categoryQuery;
    }

    const category = await BlogCategory.findOne({
        isDeleted: false,
        isActive: true,
        $or: [
            { slug: String(categoryQuery).toLowerCase().trim() },
            { name: new RegExp(`^${String(categoryQuery).trim()}$`, "i") }
        ]
    }).select("_id");

    return category ? category._id : "__not_found__";
}

class BlogService {
    async getBlogs(query, { includeUnpublished = false } = {}) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const filter = {};
        const keyword = query.keyword || query.q || query.search || "";

        if (query.category) {
            filter.category = await resolveCategoryFilter(query.category);
        }

        if (query.tag) {
            filter.tags = query.tag;
        }

        if (includeUnpublished && query.status) {
            filter.status = query.status;
        }

        return blogRepository.findAll({
            filter,
            page,
            limit,
            keyword: keyword.trim(),
            sort: query.sort || "newest",
            includeUnpublished
        });
    }

    async getBlogBySlug(slug, {
        includeUnpublished = false,
        increaseView = false
    } = {}) {
        const blog = await blogRepository.findBySlug(slug, { includeUnpublished });

        if (!blog) {
            throw createHttpError("Blog not found.", 404);
        }

        if (increaseView && blog.status === BLOG_STATUS.PUBLISHED) {
            return blogRepository.increaseView(blog._id);
        }

        return blog;
    }

    async createBlog(data) {
        await ensureCategoryExists(data.category);

        data.slug = slugify(data.title);

        if (!data.slug) {
            throw createHttpError("Unable to generate slug from title.", 400);
        }

        const existingBlog = await blogRepository.findSlugForAdmin(data.slug);

        if (existingBlog) {
            throw createHttpError("Slug already exists.", 409);
        }

        if (data.status === BLOG_STATUS.PUBLISHED) {
            data.publishedAt = new Date();
        }

        return blogRepository.create(data);
    }

    async updateBlog(id, data) {
        const existingBlog = await blogRepository.findById(id);

        if (!existingBlog || existingBlog.isDeleted) {
            throw createHttpError("Blog not found.", 404);
        }

        if (data.category) {
            await ensureCategoryExists(data.category);
        }

        if (data.title) {
            data.slug = slugify(data.title);

            if (!data.slug) {
                throw createHttpError("Unable to generate slug from title.", 400);
            }

            const duplicatedSlug = await blogRepository.findSlugForAdmin(data.slug);

            if (duplicatedSlug && String(duplicatedSlug._id) !== String(id)) {
                throw createHttpError("Slug already exists.", 409);
            }
        }

        if (data.status === BLOG_STATUS.PUBLISHED && !existingBlog.publishedAt) {
            data.publishedAt = new Date();
        }

        return blogRepository.update(id, data);
    }

    async deleteBlog(id) {
        const existingBlog = await blogRepository.findById(id);

        if (!existingBlog || existingBlog.isDeleted) {
            throw createHttpError("Blog not found.", 404);
        }

        return blogRepository.softDelete(id);
    }

    async publishBlog(id) {
        const existingBlog = await blogRepository.findById(id);

        if (!existingBlog || existingBlog.isDeleted) {
            throw createHttpError("Blog not found.", 404);
        }

        return blogRepository.publish(id);
    }

    async unpublishBlog(id) {
        const existingBlog = await blogRepository.findById(id);

        if (!existingBlog || existingBlog.isDeleted) {
            throw createHttpError("Blog not found.", 404);
        }

        return blogRepository.unpublish(id);
    }

    async searchBlog(query, options = {}) {
        return this.getBlogs(query, options);
    }

    async increaseView(id) {
        const existingBlog = await blogRepository.findById(id);

        if (!existingBlog || existingBlog.isDeleted) {
            throw createHttpError("Blog not found.", 404);
        }

        return blogRepository.increaseView(id);
    }

    async getLatestBlogs(limit = 5) {
        return blogRepository.findLatest(limit);
    }

    async getPopularBlogs(limit = 5) {
        return blogRepository.findPopular(limit);
    }

    async getRelatedBlogs(slug, limit = 5) {
        const blog = await blogRepository.findBySlug(slug, {
            includeUnpublished: true
        });

        if (!blog || blog.isDeleted) {
            throw createHttpError("Blog not found.", 404);
        }

        return blogRepository.findRelated({
            blogId: blog._id,
            categoryId: blog.category?._id || blog.category,
            limit
        });
    }
}

export default new BlogService();
