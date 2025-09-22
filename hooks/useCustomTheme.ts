"use client";
import useSWR from "swr";

import { getCustomTheme } from "@/actions/themeActions";
import { defaultTheme } from "@/lib/themes";
import { useEffect } from "react";

const useCustomTheme = () => {
  const { data, isLoading, mutate, error } = useSWR(
    "custom-theme",
    getCustomTheme,
  );

  const customTheme = data?.[0]?.customTheme;

  useEffect(() => {
    const localStorageTheme =
      localStorage.getItem("custom-theme") || defaultTheme;
    const finalCustomTheme = customTheme || localStorageTheme;

    document.documentElement.setAttribute("data-theme", finalCustomTheme);
  }, [customTheme, isLoading]);

  return { customTheme, isLoading, mutate, error };
};

export default useCustomTheme;
