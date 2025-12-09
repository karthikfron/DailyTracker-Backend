import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { initDB } from "./db/database.js";

dotenv.config();

const app = express();
app.use(express.json());

// Init DB
await initDB();

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Server
app.listen(5000, () => console.log("Server running on 5000 🚀"));
