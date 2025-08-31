import { ModeToggle } from "@/components/modeToggle";
import { ThemeSwitcher } from "@/components/themes/themeSwitcher";
import Link from "next/link";
import SignInActions from "./auth/signInActions";

const Navbar = () => {
  return (
    <nav className="flex-between h-[var(--h-nav)] p-4 border-b bg-secondary">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl font-bold">
          ZebraBoard
        </Link>
      </div>
      <div className="flex text-xl items-center space-x-4">
        <ThemeSwitcher />
        <ModeToggle />
        <SignInActions />
      </div>
    </nav>
  );
};

export default Navbar;
