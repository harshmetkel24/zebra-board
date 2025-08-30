import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex-between h-[var(--h-nav)] p-4 border-b bg-secondary">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl font-bold">
          ZebraBoard
        </Link>
      </div>
      <div className="flex text-xl items-center space-x-4">
        <ModeToggle />
        <Button className="bg-primary" size="icon" asChild>
          <Link href="/profile">
            <User />
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
