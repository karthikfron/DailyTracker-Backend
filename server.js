import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();


const app = express();
app.use(express.json());

// ------------------ DATABASE SETUP 
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

  await db.exec(`
  ALTER TABLE users ADD COLUMN refreshToken TEXT;
`);

  console.log("Database ready");
})();

// ------------------ SIGNUP ROUTE 
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

// ------------------ LOGIN ROUTE 
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
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Create refreshToken
const refreshToken = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
 // Save refresh token in DB
 await db.run("UPDATE users SET refreshToken = ? WHERE id = ?",[refreshToken, user.id]);


  res.json({
    msg: "Login successful",
    token,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ msg: "Invalid or expired token" });

    req.user = payload; // { id, email }
    next();
  });
}

// ------------------ PROTECTED ROUTE 
app.get("/profile", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  const user = await db.get(
    "SELECT id, name, email FROM users WHERE id = ?",
    [userId]
  );

  if (!user) return res.status(404).json({ msg: "User not found" });

  res.json({ user });
});

// ----------------- RefreshToken route

app.post("/token", async (req, res) =>{
  const {refreshToken} = req.body;
  if (!refreshToken){
    res.status(401).json({msg : "Refresh token required"})
  }

   // Check Db
  const user = await db.get(
    "Select  * from users where refreshToken = ?", 
    [refreshToken]
  )

  if (!user) return res.status(401).json({msg : "Invalid refresh Token"});

   // Invalid referesh Token
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) 
      return res.status(403).json({msg : "EXpired refresh Token"})

    const newAccesstoken = jwt.sign(
      {id : user.id, email : user.email},
      process.env.JWT_SECRET,
      {expiresIn :"1h"}
    )

    res.json({accesstoken :newAccesstoken })
    
  })


})


 // ----------------- Logout route
 app.post("/logout", async ( req, res) => {
   const {refreshToken}  = req.body;
   if (!refreshToken) return res.status(401).json({msg : "Refresh Token required"})

   await db.run(
    "UPDATE users SET refreshToken = NULL where refreshToken = ?", [refreshToken]
   );

   res.json({msg : "Logged out"})

    


 })




// ------------------ START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
