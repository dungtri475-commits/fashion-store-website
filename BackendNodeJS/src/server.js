import app from "./app.js";
import env from "./config/env.js";
import { connectDatabase } from "./config/db.js";

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
