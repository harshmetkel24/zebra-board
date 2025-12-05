"use server";

import { db } from "@/lib/db";
import { speedTestResults, userDetails } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";

export const checkIfUserExists = async (userId: string) => {
  try {
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
    const user = await currentUser();
    
    return await db.transaction(async (tx) => {
      try {
        await tx
          .insert(userDetails)
          .values({
            userId,
            name: user?.fullName || user?.firstName || null,
            username: user?.username || null,
            email: user?.primaryEmailAddress?.emailAddress || null,
          })
          .onConflictDoUpdate({
            target: userDetails.userId,
            set: {
              name: user?.fullName || user?.firstName || null,
              username: user?.username || null,
              email: user?.primaryEmailAddress?.emailAddress || null,
              updatedAt: new Date(),
            },
          });
      } catch (error: any) {
        if (error?.message?.includes('column') && error?.message?.includes('does not exist')) {
          await tx
            .insert(userDetails)
            .values({ userId })
            .onConflictDoNothing({ target: userDetails.userId });
        } else {
          throw error;
        }
      }
    });
  } catch (error) {
    console.error("Error ensuring user exists:", error);
  }
};

export const saveTestResult = async (wpm: number, accuracy: number, testDuration: number) => {
  try {
    const authObj = await auth();

    if (!authObj.isAuthenticated || !authObj.userId) {
      return null;
    }

    return await db.transaction(async (tx) => {
      await tx.insert(speedTestResults).values({
        userId: authObj.userId,
        wpm,
        accuracy,
        testDuration,
      });

      const results = await tx
        .select({
          totalTests: sql<number>`count(*)::int`,
          avgWpm: sql<number>`avg(${speedTestResults.wpm})::int`,
          avgAccuracy: sql<number>`avg(${speedTestResults.accuracy})::int`,
          bestWpm: sql<number>`max(${speedTestResults.wpm})::int`,
        })
        .from(speedTestResults)
        .where(eq(speedTestResults.userId, authObj.userId));

      const stats = results[0];

      await tx
        .update(userDetails)
        .set({
          totalTests: stats.totalTests,
          avgWpm: stats.avgWpm,
          avgAccuracy: stats.avgAccuracy,
          bestWpm: stats.bestWpm,
          updatedAt: new Date(),
        })
        .where(eq(userDetails.userId, authObj.userId));

      return stats;
    });
  } catch (error) {
    console.error("Error saving test result:", error);
    return null;
  }
};

export const getUserProfile = async () => {
  try {
    const authObj = await auth();

    if (!authObj.isAuthenticated || !authObj.userId) {
      return null;
    }

    const user = await db
      .select()
      .from(userDetails)
      .where(eq(userDetails.userId, authObj.userId))
      .limit(1);

    return user[0] || null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

export const getRecentTestResults = async (limit: number = 10) => {
  try {
    const authObj = await auth();

    if (!authObj.isAuthenticated || !authObj.userId) {
      return [];
    }

    return await db
      .select()
      .from(speedTestResults)
      .where(eq(speedTestResults.userId, authObj.userId))
      .orderBy(desc(speedTestResults.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("Error getting recent test results:", error);
    return [];
  }
};
