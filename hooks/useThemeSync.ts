"use client";

import { defaultTheme } from "@/lib/themes";
import { useEffect } from "react";

const useThemeSync = () => {
  // const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // const { data, isLoading, error, status } = useQuery({
  //   queryKey: ["custom-theme", user?.id],
  //   queryFn: async () => {
  //     const supabase = createClient();
  //     const data = await supabase
  //       .from("personalization")
  //       .select("custom-theme")
  //       .eq("user_id", user?.id || "");
  //     return data;
  //   },
  //   enabled: !!(userLoaded && user?.id),
  // });

  useEffect(() => {
    const localStorageTheme =
      localStorage.getItem("custom-theme") || defaultTheme;
    // const finalTheme =
    //   isSignedIn && status === "success" && !error
    //     ? data.data?.[0]?.["custom-theme"]
    //     : localStorageTheme;

    document.documentElement.setAttribute("data-theme", localStorageTheme);
  }, []);
  // }, [error, isLoading, isSignedIn, status]);
};

export default useThemeSync;
