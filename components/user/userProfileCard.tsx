"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";

const UserProfileCard = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="bg-[#1a1f2e] p-8 rounded-2xl shadow-lg border border-[rgba(0,217,255,0.1)] text-center profile-card-glow">
        <p className="text-[#94a3b8]">Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1f2e] p-8 rounded-2xl shadow-lg border border-[rgba(0,217,255,0.1)] text-center profile-card-glow relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/5 via-transparent to-[#9d4edd]/5 opacity-50"></div>
      
      <div className="relative z-10">
        <div className="w-28 h-28 bg-gradient-to-br from-[#00d9ff]/20 to-[#9d4edd]/20 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-[#00d9ff]/30 shadow-[0_0_20px_rgba(0,217,255,0.3)] relative">
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={user.fullName || "User"}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-14 h-14 text-[#00d9ff]" />
          )}
        </div>
        
        {isLoaded ? (
          <h1 className="text-3xl font-bold font-mono text-white mb-2">{user?.fullName || "User"}</h1>
        ) : (
          <div className="flex-center mb-2">
            <Skeleton className="h-8 w-60 bg-[#0f1419]" />
          </div>
        )}
        
        <p className="text-[#94a3b8] mb-4 font-medium">Typing Enthusiast</p>
        
        <span className="inline-block px-4 py-2 bg-[#0f1419] border border-[#00d9ff]/30 rounded-full text-sm font-semibold text-[#00d9ff] shadow-[0_0_10px_rgba(0,217,255,0.2)]">
          Level 5
        </span>
      </div>
    </div>
  );
};

export default UserProfileCard;
