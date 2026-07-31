import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import corsMiddleware from "./config/cors.js";

import routes from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDirectory = path.resolve(__dirname, "../uploads");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use("/uploads", express.static(uploadsDirectory));

// Routes
app.use("/api", routes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

app.use((error, req, res, next) => {
    console.error(error.message);

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error"
    });
});

export default app;
