import Blog from "../models/blog.js";
import { BLOG_STATUS } from "../constants/blog.constant.js";

class BlogRepository {
    withRelations(query) {
        return query.populate("category");
    }

    resolveSort(sort = "newest", keyword = "") {
        if (keyword) {
            return {
                score: { $meta: "textScore" },
                publishedAt: -1,
                createdAt: -1
            };
        }

        if (sort === "oldest") {
            return {
                publishedAt: 1,
                createdAt: 1
            };
        }

        if (sort === "popular") {
            return {
                viewCount: -1,
                publishedAt: -1,
                createdAt: -1
            };
        }

        return {
            publishedAt: -1,
            createdAt: -1
        };
    }

    async create(data) {
        const blog = await Blog.create(data);
        return this.findById(blog._id);
    }

    async findById(id) {
        return this.withRelations(Blog.findById(id));
    }

    async findBySlug(slug, { includeUnpublished = false } = {}) {
        const query = {
            slug,
            isDeleted: false
        };

        if (!includeUnpublished) {
            query.status = BLOG_STATUS.PUBLISHED;
        }

        return this.withRelations(Blog.findOne(query));
    }

    async findSlugForAdmin(slug) {
        return Blog.findOne({
            slug,
            isDeleted: false
        }).select("_id slug");
    }

    async findAll({
        filter = {},
        page = 1,
        limit = 10,
        keyword = "",
        sort = "newest",
        includeUnpublished = false
    } = {}) {
        const skip = (page - 1) * limit;
        const query = {
            isDeleted: false,
            ...filter
        };

        if (!includeUnpublished) {
            query.status = BLOG_STATUS.PUBLISHED;
        }

        if (keyword) {
            query.$text = { $search: keyword };
        }

        const itemQuery = keyword
            ? Blog.find(query, {
                score: { $meta: "textScore" }
            }).sort(this.resolveSort(sort, keyword))
            : Blog.find(query).sort(this.resolveSort(sort, keyword));

        const [items, total] = await Promise.all([
            this.withRelations(itemQuery)
                .skip(skip)
                .limit(limit),
            Blog.countDocuments(query)
        ]);

        return {
            items,
            blogs: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async update(id, data) {
        return this.withRelations(Blog.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }));
    }

    async softDelete(id) {
        return this.withRelations(Blog.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        ));
    }

    async publish(id) {
        return this.withRelations(Blog.findByIdAndUpdate(
            id,
            {
                status: BLOG_STATUS.PUBLISHED,
                publishedAt: new Date()
            },
            { new: true, runValidators: true }
        ));
    }

    async increaseView(id) {
        return this.withRelations(Blog.findByIdAndUpdate(
            id,
            {
                $inc: {
                    viewCount: 1
                }
            },
            { new: true }
        ));
    }

    async findLatest(limit = 5) {
        return this.withRelations(
            Blog.find({
                isDeleted: false,
                status: BLOG_STATUS.PUBLISHED
            })
                .sort({ publishedAt: -1, createdAt: -1 })
                .limit(limit)
        );
    }

    async findPopular(limit = 5) {
        return this.withRelations(
            Blog.find({
                isDeleted: false,
                status: BLOG_STATUS.PUBLISHED
            })
                .sort({ viewCount: -1, publishedAt: -1, createdAt: -1 })
                .limit(limit)
        );
    }

    async findRelated({
        blogId,
        categoryId,
        limit = 5
    }) {
        return this.withRelations(
            Blog.find({
                _id: { $ne: blogId },
                category: categoryId,
                isDeleted: false,
                status: BLOG_STATUS.PUBLISHED
            })
                .sort({ publishedAt: -1, createdAt: -1 })
                .limit(limit)
        );
    }

    async unpublish(id) {
        return this.withRelations(Blog.findByIdAndUpdate(
            id,
            {
                status: BLOG_STATUS.DRAFT
            },
            { new: true, runValidators: true }
        ));
    }
}

export default new BlogRepository();
