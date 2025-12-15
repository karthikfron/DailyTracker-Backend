import { initSQLite, getSQLite } from "./sqlite.js";
import { initPostgres, query } from "./postgres.js";

let dbType;

export const initDB = async () => {
  if (process.env.VERCEL) {
    dbType = "postgres";
    await initPostgres();
  } else {
    dbType = "sqlite";
    await initSQLite();
  }
};

export const getDB = () => {
  if (dbType === "sqlite") return getSQLite();
  return { query };
};
