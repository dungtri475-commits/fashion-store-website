// Cho phep frontend truy cap backend tu cac domain hop le.
import cors from "cors";

import env from "./env.js";

const allowedOrigins = (env.CORS_ORIGIN ?? "http://localhost:5500")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("CORS policy does not allow this origin"));
    },
    credentials: true
};

export default cors(corsOptions);
