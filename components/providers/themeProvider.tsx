"use client";

import { defaultTheme } from "@/lib/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("custom-theme") || defaultTheme;
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
