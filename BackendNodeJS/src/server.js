import express from "express";
import corsMiddleware from "./config/cors.js";
import env from "./config/env.js";
import { connectDatabase } from "./config/db.js";

const app = express();

app.use(express.json());
app.use(corsMiddleware);

async function startServer() {
    await connectDatabase();

    const PORT = env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("Server startup failed");
    console.error(error.message);
    process.exit(1);
});
