import UsreProfileIcon from "@/components/user/userProfileIcon";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInButton from "./signInButton";

const SignInActions = () => {
  return (
    <>
      <SignedIn>
        <UsreProfileIcon />
      </SignedIn>
      <SignedOut>
        <SignInButton />
        {/*<SignUpButton />*/}
      </SignedOut>
    </>
  );
};

export default SignInActions;
