import { Router } from "express";
import blogsRouter from "../modules/blogs/blogs.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Fashion Store API"
    });
});

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy",
        timestamp: new Date().toISOString()
    });
});

router.use("/blogs", blogsRouter);

export default router;
