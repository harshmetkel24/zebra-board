"use server";

import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const testDatabaseConnection = async () => {
  try {
    if (!db) {
      return { 
        success: false, 
        error: "Database not connected. Please set DATABASE_URL in .env.local" 
      };
    }
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log("Database connection test successful:", result);
    return { success: true, result };
  } catch (error) {
    console.error("Database connection test failed:", error);
    return { success: false, error: String(error) };
  }
};

