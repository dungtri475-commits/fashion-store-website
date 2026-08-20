// Load bien moi truong tu BackendNodeJS/.env theo duong dan tuyet doi.
import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: envPath });

function getRequiredEnv(name) {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 3000,
    MONGODB_URI: getRequiredEnv("MONGODB_URI"),
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5500",
    JWT_SECRET: getRequiredEnv("JWT_SECRET")
};

export default env;
