import mongoose from "mongoose";

import {
    BLOG_MANAGER_ROLES,
    BLOG_STATUS
} from "../constants/blog.constant.js";
import { hasAnyRole } from "../middlewares/auth.middleware.js";
import { createHttpError } from "../utils/http-error.js";
import { cleanupUploadedFiles } from "../utils/upload.js";

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim() !== "";
}

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

function ensureMongoId(value, fieldName, status = 400) {
    if (!mongoose.isValidObjectId(value)) {
        throw createHttpError(`Invalid ${fieldName}.`, status);
    }
}

function ensurePageParams(req) {
    const { page, limit } = req.query;

    if (page !== undefined && (!Number.isInteger(Number(page)) || Number(page) < 1)) {
        throw createHttpError("Page must be greater than 0.", 400);
    }

    if (
        limit !== undefined &&
        (!Number.isInteger(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)
    ) {
        throw createHttpError("Limit must be between 1 and 100.", 400);
    }
}

function ensureLimit(limit, {
    fieldName = "Limit",
    min = 1,
    max = 100
} = {}) {
    if (limit === undefined) {
        return;
    }

    if (!Number.isInteger(Number(limit)) || Number(limit) < min || Number(limit) > max) {
        throw createHttpError(`${fieldName} must be between ${min} and ${max}.`, 400);
    }
}

function ensureStatus(status, allowRestrictedStatuses = false) {
    if (status === undefined) {
        return;
    }

    if (!Object.values(BLOG_STATUS).includes(status)) {
        throw createHttpError("Invalid blog status.", 400);
    }

    if (
        status !== BLOG_STATUS.PUBLISHED &&
        !allowRestrictedStatuses
    ) {
        throw createHttpError("You do not have permission to filter by this blog status.", 403);
    }
}

function sanitizeCreateOrUpdateBody(req) {
    const tags = parseArrayValue(req.body.tags);
    if (tags !== undefined) {
        req.body.tags = tags;
    }

    const images = parseArrayValue(req.body.images);
    if (images !== undefined) {
        req.body.images = images;
    }
}

async function withUploadCleanup(req, callback) {
    try {
        await callback();
    } catch (error) {
        await cleanupUploadedFiles(req);
        throw error;
    }
}

export function validatePaginationQuery(req, res, next) {
    try {
        ensurePageParams(req);

        if (req.query.category !== undefined) {
            if (!isNonEmptyString(req.query.category)) {
                throw createHttpError("Category must be a non-empty string.", 400);
            }
        }

        ensureStatus(
            req.query.status,
            hasAnyRole(req.user, BLOG_MANAGER_ROLES)
        );

        next();
    } catch (error) {
        next(error);
    }
}

export function validateSearchQuery(req, res, next) {
    try {
        ensurePageParams(req);

        const keyword = req.query.keyword || req.query.q || req.query.search;

        if (!isNonEmptyString(keyword)) {
            throw createHttpError("Keyword is required.", 400);
        }

        req.query.keyword = keyword;
        next();
    } catch (error) {
        next(error);
    }
}

export function validateBlogSlug(req, res, next) {
    try {
        if (!isNonEmptyString(req.params.slug)) {
            throw createHttpError("Slug is required.", 400);
        }

        next();
    } catch (error) {
        next(error);
    }
}

export function validateBlogId(req, res, next) {
    try {
        ensureMongoId(req.params.id, "blog id");
        next();
    } catch (error) {
        next(error);
    }
}

export function validateListOptions(req, res, next) {
    try {
        ensurePageParams(req);

        if (req.query.category !== undefined) {
            if (!isNonEmptyString(req.query.category)) {
                throw createHttpError("Category must be a non-empty string.", 400);
            }
        }

        if (req.query.tag !== undefined && !isNonEmptyString(req.query.tag)) {
            throw createHttpError("Tag must be a non-empty string.", 400);
        }

        if (
            req.query.sort !== undefined &&
            !["newest", "oldest", "popular"].includes(req.query.sort)
        ) {
            throw createHttpError("Sort must be one of newest, oldest, popular.", 400);
        }

        ensureStatus(
            req.query.status,
            hasAnyRole(req.user, BLOG_MANAGER_ROLES)
        );

        next();
    } catch (error) {
        next(error);
    }
}

export function validateSimpleLimitQuery(req, res, next) {
    try {
        ensureLimit(req.query.limit, { fieldName: "Limit", min: 1, max: 20 });
        next();
    } catch (error) {
        next(error);
    }
}

export async function validateCreateBlog(req, res, next) {
    try {
        await withUploadCleanup(req, async () => {
            sanitizeCreateOrUpdateBody(req);

            if (!isNonEmptyString(req.body.title) || req.body.title.trim().length < 5 || req.body.title.trim().length > 200) {
                throw createHttpError("Title must be between 5 and 200 characters.", 400);
            }

            if (
                !isNonEmptyString(req.body.shortDescription) ||
                req.body.shortDescription.trim().length > 500
            ) {
                throw createHttpError("Short description is required and must not exceed 500 characters.", 400);
            }

            if (!isNonEmptyString(req.body.content)) {
                throw createHttpError("Content is required.", 400);
            }

            ensureMongoId(req.body.category, "category id");

            if (req.body.author !== undefined) {
                ensureMongoId(req.body.author, "author id");
            }

            ensureStatus(req.body.status, true);

            if (req.body.tags !== undefined && !Array.isArray(req.body.tags)) {
                throw createHttpError("Tags must be an array.", 400);
            }

            if (!req.files?.thumbnail?.length && !isNonEmptyString(req.body.thumbnail)) {
                throw createHttpError("Thumbnail is required.", 400);
            }
        });

        next();
    } catch (error) {
        next(error);
    }
}

export async function validateUpdateBlog(req, res, next) {
    try {
        await withUploadCleanup(req, async () => {
            ensureMongoId(req.params.id, "blog id");
            sanitizeCreateOrUpdateBody(req);

            if (
                req.body.title !== undefined &&
                (!isNonEmptyString(req.body.title) || req.body.title.trim().length < 5 || req.body.title.trim().length > 200)
            ) {
                throw createHttpError("Title must be between 5 and 200 characters.", 400);
            }

            if (
                req.body.shortDescription !== undefined &&
                (!isNonEmptyString(req.body.shortDescription) || req.body.shortDescription.trim().length > 500)
            ) {
                throw createHttpError("Short description must not exceed 500 characters.", 400);
            }

            if (req.body.category !== undefined) {
                ensureMongoId(req.body.category, "category id");
            }

            if (req.body.author !== undefined) {
                ensureMongoId(req.body.author, "author id");
            }

            ensureStatus(req.body.status, true);

            if (req.body.tags !== undefined && !Array.isArray(req.body.tags)) {
                throw createHttpError("Tags must be an array.", 400);
            }
        });

        next();
    } catch (error) {
        next(error);
    }
}
