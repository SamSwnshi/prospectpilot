import "dotenv/config"; // or:
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
console.log("DATABASE_URL:", process.env.DATABASE_URL);
module.exports = {
  schema: "./src/lib/dbSchema/schema.js", // Adjust to your schema file’s path (leave as-is for your structure)
  out: "./drizzle", // Drizzle will put migrations and snapshots here
  dialect: "postgresql", // 'postgresql' or 'postgres' both are fine in most setups
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
