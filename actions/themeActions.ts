"use server";

import { db } from "@/lib/db";
import { personalization } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getCustomTheme = async () => {
  try {
    if (!db) return [];
    
    const authObj = await auth();

    const { isAuthenticated, userId } = authObj;
    if (!isAuthenticated) return [];

    return await db
      .select()
      .from(personalization)
      .where(eq(personalization.userId, userId));
  } catch (error) {
    console.error("Error fetching custom theme:", error);
    return [];
  }
};

export const updateCustomTheme = async (themeName: string) => {
  try {
    if (!db) return [];
    
    const authObj = await auth();

    const { isAuthenticated, userId } = authObj;
    if (!isAuthenticated) return [];

    return await db
      .update(personalization)
      .set({ customTheme: themeName })
      .where(eq(personalization.userId, authObj.userId));
  } catch (error) {
    console.error("Error updating custom theme:", error);
    return [];
  }
};
