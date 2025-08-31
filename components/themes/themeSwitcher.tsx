"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { defaultTheme, getTheme, getThemeNames } from "@/lib/themes";
import clsx from "clsx";
import { ArrowUpRight, Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ColorsPreview from "./colorsPreview";

export function ThemeSwitcher() {
  const { theme: currentTheme } = useTheme();
  const [selectedCustomTheme, setSelectedCustomTheme] =
    useState<string>("ocean");

  const themeNames = getThemeNames();
  const isDark = currentTheme === "dark";

  const handleThemeSelect = (themeName: string) => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-theme", themeName);
    setSelectedCustomTheme(themeName);

    localStorage.setItem("custom-theme", themeName);
  };

  const applyThemeColor = useCallback(
    (element: HTMLDivElement) => {
      const htmlElement = document.documentElement;
      const currentCustomTheme =
        htmlElement.getAttribute("data-theme") || defaultTheme;
      setSelectedCustomTheme(currentCustomTheme);
      if (element) {
        const color = isDark
          ? getTheme(selectedCustomTheme)?.dark.primary
          : getTheme(selectedCustomTheme)?.light.primary;
        element.style.backgroundColor = color;
      }
    },
    [isDark, selectedCustomTheme],
  );

  useEffect(() => {
    // Get the current custom theme from data-theme attribute
    const htmlElement = document.documentElement;
    const currentCustomTheme =
      htmlElement.getAttribute("data-theme") || defaultTheme;
    setSelectedCustomTheme(currentCustomTheme);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch theme</span>
          {/* Color indicator */}
          <div
            className={clsx(
              "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
              {
                hidden: selectedCustomTheme === defaultTheme,
              },
            )}
            ref={applyThemeColor}
            // style={{
            //   backgroundColor: isDark
            //     ? getTheme(selectedCustomTheme)?.dark.primary
            //     : getTheme(selectedCustomTheme)?.light.primary,
            // }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
          Select Theme
        </div>
        {themeNames.map((themeName) => {
          const themeConfig = getTheme(themeName);
          if (!themeConfig) return null;

          const isSelected = selectedCustomTheme === themeName;

          return (
            <DropdownMenuItem
              key={themeName}
              onClick={() => handleThemeSelect(themeName)}
              className="flex-between cp"
            >
              <div className="flex items-center gap-2">
                <ColorsPreview theme={themeName} />
                <span>{themeConfig.name}</span>
              </div>
              {isSelected && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuItem className="cp" asChild>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/theme-preview">
              Preview <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
