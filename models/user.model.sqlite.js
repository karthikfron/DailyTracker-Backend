import { getDB } from "../db/index.js";

export const findUserByEmail = async (email) => {
  const db = getDB();
  return db.get("SELECT * FROM users WHERE email = ?", [email]);
};

export const findUserByRefreshToken = async (token) => {
  const db = getDB();
  return db.get("SELECT * FROM users WHERE refreshToken = ?", [token]);
};

export const createUser = async (name, email, password) => {
  const db = getDB();
  return db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
};

export const saveRefreshToken = async (token, id) => {
  const db = getDB();
  return db.run("UPDATE users SET refreshToken = ? WHERE id = ?", [token, id]);
};

export const clearRefreshToken = async (token) => {
  const db = getDB();
  return db.run("UPDATE users SET refreshToken = NULL WHERE refreshToken = ?", [
    token,
  ]);
};

export const getProfile = async (id) => {
  const db = getDB();
  return db.get("SELECT id, name, email FROM users WHERE id = ?", [id]);
};
