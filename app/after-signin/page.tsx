import { ensureUserExists } from "@/actions/userDetails";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  try {
    const authObj = await auth();

    if (authObj.isAuthenticated) {
      await ensureUserExists(authObj.userId);
      redirect("/");
    }
  } catch (error) {
    console.error("Error in after-signin:", error);
  }

  redirect("/");
}
