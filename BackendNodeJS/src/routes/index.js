import { Router } from "express";

// sau nay import cac route tu cac file khac vao day

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

export default router;
