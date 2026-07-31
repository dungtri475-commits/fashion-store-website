import {
    BLOG_MANAGER_ROLES
} from "../constants/blog.constant.js";
import {
    getAuthenticatedUserId,
    hasAnyRole
} from "../middlewares/auth.middleware.js";
import blogService from "../services/blog.service.js";
import createHttpError from "../utils/http-error.js";
import {
    cleanupUploadedFiles,
    getUploadedFilePath
} from "../utils/upload.js";

function parseArrayValue(value) {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            return [value];
        }
    }

    return [value];
}

function canManageBlogs(user) {
    return hasAnyRole(user, BLOG_MANAGER_ROLES);
}

function buildPayload(req, { assignAuthorFromToken = false } = {}) {
    const payload = { ...req.body };
    const authenticatedUserId = getAuthenticatedUserId(req.user);

    const parsedTags = parseArrayValue(payload.tags);
    if (parsedTags) {
        payload.tags = parsedTags;
    }

    const parsedImages = parseArrayValue(payload.images);
    if (parsedImages) {
        payload.images = parsedImages;
    }

    if (req.files?.thumbnail?.[0]) {
        payload.thumbnail = getUploadedFilePath(req.files.thumbnail[0]);
    }

    if (req.files?.images?.length) {
        payload.images = [
            ...(payload.images || []),
            ...req.files.images.map(getUploadedFilePath)
        ];
    }

    if (assignAuthorFromToken && authenticatedUserId) {
        payload.author = authenticatedUserId;
    }

    if (!assignAuthorFromToken) {
        delete payload.author;
    }

    if (assignAuthorFromToken && !payload.author) {
        throw createHttpError("Unable to determine blog author from access token.", 401);
    }

    return payload;
}

export async function getBlogs(req, res, next) {
    try {
        const blogs = await blogService.getBlogs(req.query, {
            includeUnpublished: canManageBlogs(req.user)
        });

        res.status(200).json({
            success: true,
            message: "Get blogs successfully",
            data: blogs
        });
    } catch (error) {
        next(error);
    }
}

export async function getBlogDetail(req, res, next) {
    try {
        const blog = await blogService.getBlogBySlug(req.params.slug, {
            includeUnpublished: canManageBlogs(req.user),
            increaseView: true
        });

        res.status(200).json({
            success: true,
            message: "Get blog successfully",
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

export async function createBlog(req, res, next) {
    try {
        const blog = await blogService.createBlog(buildPayload(req, {
            assignAuthorFromToken: true
        }));

        res.status(201).json({
            success: true,
            message: "Create blog successfully",
            data: blog
        });
    } catch (error) {
        await cleanupUploadedFiles(req);
        next(error);
    }
}

export async function updateBlog(req, res, next) {
    try {
        const blog = await blogService.updateBlog(req.params.id, buildPayload(req));

        res.status(200).json({
            success: true,
            message: "Update blog successfully",
            data: blog
        });
    } catch (error) {
        await cleanupUploadedFiles(req);
        next(error);
    }
}

export async function deleteBlog(req, res, next) {
    try {
        await blogService.deleteBlog(req.params.id);

        res.status(200).json({
            success: true,
            message: "Delete blog successfully"
        });
    } catch (error) {
        next(error);
    }
}

export async function searchBlog(req, res, next) {
    try {
        const blogs = await blogService.searchBlog(req.query, {
            includeUnpublished: canManageBlogs(req.user)
        });

        res.status(200).json({
            success: true,
            message: "Search blog successfully",
            data: blogs
        });
    } catch (error) {
        next(error);
    }
}

export async function publishBlog(req, res, next) {
    try {
        const blog = await blogService.publishBlog(req.params.id);

        res.status(200).json({
            success: true,
            message: "Publish successfully",
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

export async function unpublishBlog(req, res, next) {
    try {
        const blog = await blogService.unpublishBlog(req.params.id);

        res.status(200).json({
            success: true,
            message: "Unpublish successfully",
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

export async function increaseView(req, res, next) {
    try {
        const blog = await blogService.increaseView(req.params.id);

        res.status(200).json({
            success: true,
            message: "Increase view successfully",
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

export async function getLatestBlogs(req, res, next) {
    try {
        const blogs = await blogService.getLatestBlogs(Number(req.query.limit) || 5);

        res.status(200).json({
            success: true,
            message: "Get latest blogs successfully",
            data: blogs
        });
    } catch (error) {
        next(error);
    }
}

export async function getPopularBlogs(req, res, next) {
    try {
        const blogs = await blogService.getPopularBlogs(Number(req.query.limit) || 5);

        res.status(200).json({
            success: true,
            message: "Get popular blogs successfully",
            data: blogs
        });
    } catch (error) {
        next(error);
    }
}

export async function getRelatedBlogs(req, res, next) {
    try {
        const blogs = await blogService.getRelatedBlogs(
            req.params.slug,
            Number(req.query.limit) || 5
        );

        res.status(200).json({
            success: true,
            message: "Get related blogs successfully",
            data: blogs
        });
    } catch (error) {
        next(error);
    }
}

export async function uploadBlogImages(req, res, next) {
    try {
        const thumbnail = req.files?.thumbnail?.map(getUploadedFilePath) || [];
        const images = req.files?.images?.map(getUploadedFilePath) || [];

        res.status(201).json({
            success: true,
            message: "Upload blog assets successfully",
            data: {
                thumbnail: thumbnail[0] || null,
                images
            }
        });
    } catch (error) {
        next(error);
    }
}
