"use server";

import { db } from "@/lib/db";
import { userDetails } from "@/lib/db/schema";
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

export const ensureUserExists = async (userId: string) => {
  return await db
    .insert(userDetails)
    .values({ userId })
    .onConflictDoNothing({ target: userDetails.userId });
};
