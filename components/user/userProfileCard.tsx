"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";

const UserProfileCard = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <div>Please login to view your profile</div>;
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
      <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
        <User className="w-12 h-12 text-muted-foreground" />
      </div>
      {isLoaded ? (
        <h1 className="text-2xl font-bold">{user?.fullName}</h1>
      ) : (
        <div className="flex-center">
          <Skeleton className="h-6 w-60" />
        </div>
      )}
      <p className="text-muted-foreground">Typing Enthusiast</p>
      <span className="inline-block mt-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
        Level 5
      </span>
    </div>
  );
};

export default UserProfileCard;
