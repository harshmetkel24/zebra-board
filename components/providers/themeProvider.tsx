"use client";

import { Loading } from "@/components/ui/loading";
import useCustomTheme from "@/hooks/useCustomTheme";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { isLoading } = useCustomTheme();

  return (
    <NextThemesProvider {...props}>
      {isLoading ? (
        <Loading text="Downloading user data" showProgress />
      ) : (
        children
      )}
    </NextThemesProvider>
  );
}
