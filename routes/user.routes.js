import express from "express";
import { profile } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authenticateToken, profile);

export default router;
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile operations
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User not found
 */

