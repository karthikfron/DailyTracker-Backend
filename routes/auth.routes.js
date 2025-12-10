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
