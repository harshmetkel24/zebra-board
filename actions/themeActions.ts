"use server";

import { db } from "@/lib/db";
import { personalization } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getCustomTheme = async () => {
  const authObj = await auth();

  return authObj
    ? await db
        .select()
        .from(personalization)
        .where(eq(personalization.userId, authObj.userId))
    : [];
};

export const updateCustomTheme = async (themeName: string) => {
  const authObj = await auth();

  return authObj
    ? await db
        .update(personalization)
        .set({ customTheme: themeName })
        .where(eq(personalization.userId, authObj.userId))
    : [];
};
