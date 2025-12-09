import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findUserByEmail,
  findUserByRefreshToken,
  createUser,
  saveRefreshToken,
  clearRefreshToken
} from "../models/user.model.js";

import {
  createAccessToken,
  createRefreshToken
} from "../utils/token.utils.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await findUserByEmail(email);
  if (exists) return res.status(400).json({ msg: "Email already used" });

  const hashed = await bcrypt.hash(password, 10);

  await createUser(name, email, hashed);

  res.json({ msg: "Signup successful" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ msg: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ msg: "Invalid email or password" });

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  await saveRefreshToken(refreshToken, user.id);

  res.json({
    msg: "Login successful",
    token: accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ msg: "Refresh token required" });

  const user = await findUserByRefreshToken(refreshToken);
  if (!user) return res.status(401).json({ msg: "Invalid refresh token" });

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(403).json({ msg: "Expired refresh token" });

    const newAccessToken = createAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ msg: "Refresh token required" });

  await clearRefreshToken(refreshToken);

  res.json({ msg: "Logged out" });
};
