import { Router } from "express";

import * as blogController from "../controllers/blog.controller.js";
import {
    authenticate,
    authorizeRoles,
    optionalAuthenticate
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
    BLOG_MANAGER_ROLES
} from "../constants/blog.constant.js";
import {
    validateBlogId,
    validateBlogSlug,
    validateCreateBlog,
    validateListOptions,
    validatePaginationQuery,
    validateSimpleLimitQuery,
    validateSearchQuery,
    validateUpdateBlog
} from "../validators/blog.validator.js";

const router = Router();
const blogManagerGuards = [
    authenticate,
    authorizeRoles(...BLOG_MANAGER_ROLES)
];

router.get(
    "/",
    optionalAuthenticate,
    validateListOptions,
    blogController.getBlogs
);

router.get(
    "/latest",
    validateSimpleLimitQuery,
    blogController.getLatestBlogs
);

router.get(
    "/popular",
    validateSimpleLimitQuery,
    blogController.getPopularBlogs
);

router.get(
    "/search",
    optionalAuthenticate,
    validateSearchQuery,
    blogController.searchBlog
);

router.get(
    "/:slug/related",
    validateBlogSlug,
    validateSimpleLimitQuery,
    blogController.getRelatedBlogs
);

router.get(
    "/:slug",
    optionalAuthenticate,
    validateBlogSlug,
    blogController.getBlogDetail
);

router.post(
    "/",
    ...blogManagerGuards,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    validateCreateBlog,
    blogController.createBlog
);

router.put(
    "/:id",
    ...blogManagerGuards,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    validateUpdateBlog,
    blogController.updateBlog
);

router.delete(
    "/:id",
    ...blogManagerGuards,
    validateBlogId,
    blogController.deleteBlog
);

router.patch(
    "/:id/publish",
    ...blogManagerGuards,
    validateBlogId,
    blogController.publishBlog
);

router.patch(
    "/:id/unpublish",
    ...blogManagerGuards,
    validateBlogId,
    blogController.unpublishBlog
);

router.patch(
    "/:id/view",
    validateBlogId,
    blogController.increaseView
);

router.post(
    "/upload",
    ...blogManagerGuards,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    blogController.uploadBlogImages
);

export default router;
