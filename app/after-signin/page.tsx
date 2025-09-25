import { ensureUserExists } from "@/actions/userDetails";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const authObj = await auth();
  if (authObj?.userId) {
    await ensureUserExists(authObj.userId);
  }
  redirect("/");
}
