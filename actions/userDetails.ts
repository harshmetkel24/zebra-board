"use server";

import { db } from "@/lib/db";
import { personalization, userDetails } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export const updateTestsCount = async () => {
  const authObj = await auth();

  if (authObj.isAuthenticated) {
    return db
      .update(userDetails)
      .set({ totalTests: sql`${userDetails.totalTests} + 1` })
      .where(eq(userDetails.userId, authObj.userId));
  }
};

export const checkIfUserExists = async (userId: string) => {
  return await db
    .select()
    .from(userDetails)
    .where(eq(userDetails.userId, userId));
};

export const ensureUserExists = async (userId: string) => {
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
};
