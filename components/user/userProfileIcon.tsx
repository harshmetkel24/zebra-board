"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfileActions from "./userProfileActions";

const UsreProfileIcon = () => {
  const { user, isLoaded } = useUser();

  const pathName = usePathname();

  if (pathName === "/profile") return null;

  const Icon =
    isLoaded && user?.firstName?.length
      ? () => user?.firstName?.[0]?.toLocaleUpperCase()
      : User;

  return (
    <UserProfileActions>
      <Link href="/profile">
        <Button className="bg-primary" size="icon">
          <Icon />
        </Button>
      </Link>
    </UserProfileActions>
  );
};

export default UsreProfileIcon;
