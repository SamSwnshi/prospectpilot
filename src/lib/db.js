
import "dotenv/config"; // or:
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Pool } from "pg";

import { drizzle } from "drizzle-orm/node-postgres";
console.log("DATABASE_URL in drizzle.config.js:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL settings if needed depending on your DB provider
  // ssl: { rejectUnauthorized: false }
});

export const db = drizzle(pool);
