"use server";

import { db } from "@/lib/db";
import { personalization } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getCustomTheme = async () => {
  const authObj = await auth();

  return await db
    .select()
    .from(personalization)
    .where(eq(personalization.userId, authObj.userId));
};
