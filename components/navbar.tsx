import { ModeToggle } from "@/components/modeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex-between h-[var(--h-nav)] p-4 border-b bg-background">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl font-bold">
          ZebraBoard
        </Link>
      </div>
      <div className="flex text-xl items-center space-x-4">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
