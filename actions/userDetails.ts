"use server";

import { db } from "@/lib/db";
import { personalization, userDetails } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export const checkIfUserExists = async (userId: string) => {
  try {
    if (!db) return [];
    return await db
      .select()
      .from(userDetails)
      .where(eq(userDetails.userId, userId));
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return [];
  }
};

export const ensureUserExists = async (userId: string) => {
  try {
    if (!db) return;
    
    return await db.transaction(async (tx) => {
      await tx
        .insert(userDetails)
        .values({ userId })
        .onConflictDoNothing({ target: userDetails.userId });
      await tx
        .insert(personalization)
        .values({ userId })
        .onConflictDoNothing({ target: personalization.userId });
    });
  } catch (error) {
    console.error("Error ensuring user exists:", error);
  }
};
