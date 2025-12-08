"use client";
import useSWR from "swr";
import { getUserProfile } from "@/actions/userDetails";

const useUserProfile = () => {
  const { data, isLoading, mutate, error } = useSWR(
    "user-profile",
    getUserProfile,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      onError: (err) => {
        console.error("useUserProfile SWR error:", err);
      },
      onSuccess: (data) => {
        console.log("useUserProfile SWR success:", data);
      },
    }
  );

  return { userProfile: data, isLoading, mutate, error };
};

export default useUserProfile;

