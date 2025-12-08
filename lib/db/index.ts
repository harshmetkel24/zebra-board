import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "";

if (!connectionString || connectionString.includes("xxx")) {
  console.error("⚠️  DATABASE_URL is not set or is using placeholder value!");
  console.error("Please set DATABASE_URL in .env.local with your Neon DB connection string");
}

export const client = connectionString && !connectionString.includes("xxx") 
  ? postgres(connectionString, { prepare: false })
  : null;

export const db = client ? drizzle(client) : null;

export * from "./utils";
