import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { initDB } from "./db/database.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { swaggerUiServe, swaggerUiSetup } from "./docs/swagger.js";
import { errorHandler } from "./middleware/error.middleware.js";
import cors from 'cors';
import morgan from 'morgan';





dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet(
  {contentSecurityPolicy:false}
));
// Application Routes gores here
app.use("/api-docs", swaggerUiServe, swaggerUiSetup);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests/min
  message: { msg: "Too many requests, slow down!" },
});
app.use(limiter);

app.use(
  cors(
    {
      origin : "*", //Later we can restrict to frontend Url
      methods : ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders : ["Content-Type", "Authorization"],
    }
   )
);

app.use(morgan("dev"));

// Init DB
await initDB();
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Daily Tracker Backend API is running",
    docs: "/api-docs"
  });
});


// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

// Server
// app.listen(5000, () => console.log("Server running on 5000 🚀"));
export default app;
