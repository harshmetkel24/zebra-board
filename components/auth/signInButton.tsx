import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SignInButton = () => {
  return (
    <ClerkSignInButton forceRedirectUrl={"/after-signin"}>
      <Tooltip>
        <TooltipTrigger>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-md">
          <div className="space-y-2">
            <p className="font-medium">Sign in to unlock:</p>
            <p className="text-xs">📊 Progress tracking & detailed stats</p>
            <p className="text-xs">🏆 Performance history & improvements</p>
            <p className="text-xs">💾 Never lose your typing results</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </ClerkSignInButton>
  );
};

export default SignInButton;
