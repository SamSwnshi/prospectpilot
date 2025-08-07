import "dotenv/config"; // Loads env vars (works with newer Node, can be used instead of calling dotenv.config())
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

console.log("DATABASE_URL in folder:", process.env.DATABASE_URL); // For debug

const pool = new Pool({
  url: process.env.DATABASE_URL,
  // Uncomment if required by your provider
  // ssl: { rejectUnauthorized: false }
});

export const db = drizzle(pool);
