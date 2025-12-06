import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());

// ------------------ DATABASE SETUP ------------------
let db;

(async () => {
  db = await open({
    filename: "./dailytracker.db",  
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  console.log("Database ready 🚀");
})();

// ------------------ SIGNUP ROUTE ------------------
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // check if email already exists
  const exists = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (exists) {
    return res.status(400).json({ msg: "Email already used" });
  }

  // hash password
  const hashed = await bcrypt.hash(password, 10);

  // insert user
  await db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed]
  );

  res.json({ msg: "Signup successful" });
});

// ------------------ LOGIN ROUTE ------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  // Create token
  const jwt = await import("jsonwebtoken");
  const token = jwt.default.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    msg: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});


// ------------------ START SERVER ------------------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
