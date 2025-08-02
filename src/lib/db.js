import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL settings if needed depending on your DB provider
  // ssl: { rejectUnauthorized: false }
});

export const db = drizzle(pool);
