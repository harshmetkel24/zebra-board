import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const SignUpButton = () => {
  return (
    <ClerkSignUpButton>
      <Button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
        Sign Up
      </Button>
    </ClerkSignUpButton>
  );
};

export default SignUpButton;
