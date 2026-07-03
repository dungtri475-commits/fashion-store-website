// Ket noi MongoDB bang Mongoose va dung chung bien moi truong da nap.
import mongoose from "mongoose";

import env from "./env.js";

mongoose.set("strictQuery", true);

export async function connectDatabase() {
    try {
        const connection = await mongoose.connect(env.MONGODB_URI, {
            autoIndex: true,
            maxPoolSize: 20,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 4500
        });

        console.log("MongoDB connected");
        console.log("Database:", connection.connection.name);
        console.log("Host:", connection.connection.host);
        console.log("Port:", connection.connection.port);
    } catch (error) {
        console.error("MongoDB Connection Error");
        console.error(error.message);
        throw error;
    }
}
