"use client";

import useThemeSync from "@/hooks/useThemeSync";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useThemeSync();

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
