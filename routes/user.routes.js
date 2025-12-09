import express from "express";
import { profile } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authenticateToken, profile);

export default router;
