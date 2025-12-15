import sqlite3 from "sqlite3";
import { open } from "sqlite";


let db;


export const initSQLite  = async () => {
  db = await open({
    filename: "./dailytracker.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      refreshToken TEXT
    )
  `);

  console.log("Database ready");
  return db;
};

export const getSQLite  = () => db;
