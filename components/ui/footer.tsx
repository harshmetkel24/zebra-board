import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background p-4 mt-auto">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2025 ZebraBoard. Practice your fingers here with 🦓
        </p>
      </div>
    </footer>
  );
};

export default Footer;
