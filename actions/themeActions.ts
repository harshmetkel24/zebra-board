"use server";

import { db } from "@/lib/db";
import { userDetails } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { checkIfUserExists } from "./userDetails";

export const getCustomTheme = async () => {
  try {
    const authObj = await auth();

    const { isAuthenticated, userId } = authObj;
    if (!isAuthenticated) return [];

    const userExists = await checkIfUserExists(userId);
    if (!userExists || userExists.length === 0) return [];

    return await db
      .select({ customTheme: userDetails.customTheme })
      .from(userDetails)
      .where(eq(userDetails.userId, userId));
  } catch (error) {
    console.error("Error fetching custom theme:", error);
    return [];
  }
};

export const updateCustomTheme = async (themeName: string) => {
  try {
    const authObj = await auth();

    const { isAuthenticated, userId } = authObj;
    if (!isAuthenticated) return [];

    const userExists = await checkIfUserExists(userId);
    if (!userExists || userExists.length === 0) return [];

    return await db
      .update(userDetails)
      .set({ customTheme: themeName })
      .where(eq(userDetails.userId, authObj.userId));
  } catch (error) {
    console.error("Error updating custom theme:", error);
    return [];
  }
};
