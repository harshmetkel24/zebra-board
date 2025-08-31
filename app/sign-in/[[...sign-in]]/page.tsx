import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex-center h-ex-nav-footer">
      <SignIn />
    </div>
  );
}
