import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.resolve(__dirname, "../../../../uploads/blogs");

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename(req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
            return;
        }

        cb(new Error("Only jpeg/png/webp files are allowed."), false);
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;
