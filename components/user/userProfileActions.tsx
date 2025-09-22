import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useClerk } from "@clerk/nextjs";
import { type PropsWithChildren } from "react";

export default function UserProfileActions(props: PropsWithChildren) {
  const { children } = props;
  const { signOut } = useClerk();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <Button
          className="bg-primary"
          size="sm"
          variant="destructive"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
