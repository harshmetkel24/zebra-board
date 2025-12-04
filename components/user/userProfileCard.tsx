"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { Star, User } from "lucide-react";

const UserProfileCard = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <div>Please login to view your profile</div>;
  }

  return (
    <div className="relative bg-gradient-to-br from-card via-card to-card/80 p-8 rounded-2xl shadow-xl border border-border/50 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute top-4 right-4 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
        <Star className="h-3 w-3 text-primary stroke-primary fill-none" strokeWidth={1.5} />
        <Star className="h-4 w-4 text-primary stroke-primary fill-none" strokeWidth={1.5} />
        <Star className="h-3 w-3 text-primary stroke-primary fill-none" strokeWidth={1.5} />
      </div>
      
      <div className="absolute bottom-4 left-4 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
        <Star className="h-3 w-3 text-primary stroke-primary fill-none" strokeWidth={1.5} />
        <Star className="h-4 w-4 text-primary stroke-primary fill-none" strokeWidth={1.5} />
        <Star className="h-3 w-3 text-primary stroke-primary fill-none" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
          <div className="relative w-28 h-28 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto flex items-center justify-center border-2 border-primary/30 shadow-lg">
            <User className="w-14 h-14 text-primary" />
          </div>
        </div>
        
      {isLoaded ? (
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            {user?.fullName}
          </h1>
      ) : (
          <div className="flex-center mb-2">
            <Skeleton className="h-8 w-60" />
          </div>
        )}
        
        <p className="text-muted-foreground mb-4 font-medium">Typing Enthusiast</p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full text-sm font-semibold shadow-sm">
          <Star className="h-4 w-4 text-primary fill-primary/20 stroke-primary" strokeWidth={2} />
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Level 5</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
