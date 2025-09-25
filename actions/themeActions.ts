"use server";

import { db } from "@/lib/db";
import { personalization } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { checkIfUserExists } from "./userDetails";

export const getCustomTheme = async () => {
  const authObj = await auth();

  const { isAuthenticated, userId } = authObj;
  if (!isAuthenticated) return [];

  const userExists = await checkIfUserExists(userId);
  if (!userExists) return [];

  return await db
    .select()
    .from(personalization)
    .where(eq(personalization.userId, userId));
};

export const updateCustomTheme = async (themeName: string) => {
  const authObj = await auth();

  const { isAuthenticated, userId } = authObj;
  if (!isAuthenticated) return [];

  const userExists = await checkIfUserExists(userId);
  if (!userExists) return [];

  return await db
    .update(personalization)
    .set({ customTheme: themeName })
    .where(eq(personalization.userId, authObj.userId));
};
