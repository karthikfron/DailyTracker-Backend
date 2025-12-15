import { query } from "../db/postgres.js";

export const findUserByEmail = async (email) => {
  const res = await query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return res.rows[0];
};

export const findUserByRefreshToken = async (token) => {
  const res = await query(
    "SELECT * FROM users WHERE refresh_token = $1",
    [token]
  );
  return res.rows[0];
};

export const createUser = async (name, email, password) => {
  return query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password]
  );
};

export const saveRefreshToken = async (token, id) => {
  return query(
    "UPDATE users SET refresh_token = $1 WHERE id = $2",
    [token, id]
  );
};

export const clearRefreshToken = async (token) => {
  return query(
    "UPDATE users SET refresh_token = NULL WHERE refresh_token = $1",
    [token]
  );
};

export const getProfile = async (id) => {
  const res = await query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id]
  );
  return res.rows[0];
};
