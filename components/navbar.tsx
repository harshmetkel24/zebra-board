import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          Zebra Board
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/about">
          <Button variant="ghost">About</Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
