import { SignedIn, SignedOut } from "@clerk/nextjs";
import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import SignInButton from "./signInButton";

const SignInActions = () => {
  return (
    <>
      <SignedIn>
        <Button className="bg-primary" size="icon" asChild>
          <Link href="/profile">
            <User />
          </Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton />
        {/*<SignUpButton />*/}
      </SignedOut>
    </>
  );
};

export default SignInActions;
