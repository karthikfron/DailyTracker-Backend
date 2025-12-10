import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { initDB } from "./db/database.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet(
  {contentSecurityPolicy:false}
));
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests/min
  message: { msg: "Too many requests, slow down!" },
});
app.use(limiter);

// Init DB
await initDB();

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Server
app.listen(5000, () => console.log("Server running on 5000 🚀"));
