import express from "express";
import {
  signup,
  login,
  refreshTokenController,
  logout
} from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

router.post("/signup", signup);

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { msg: "Too many login attempts, try again later." },
});

router.post("/login", loginLimiter, login);
router.post("/token", refreshTokenController);
router.post("/logout", logout);

export default router;
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       200:
 *         description: Signup successful
 *       400:
 *         description: Email already used
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Renew access token using refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token returned
 *       401:
 *         description: Invalid or missing refresh token
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out user and invalidate refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Refresh token required
 */

