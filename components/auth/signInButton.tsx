"use client";

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { defaultTheme } from "@/lib/themes";

const getTooltipColors = (themeName: string, isDark: boolean) => {
  const colorMap: Record<string, { light: { bg: string; text: string; hover: string; border: string }; dark: { bg: string; text: string; hover: string; border: string } }> = {
    default: {
      light: { bg: "#F5F5F5", text: "#1F2937", hover: "#E5E7EB", border: "#D1D5DB" },
      dark: { bg: "#1F2937", text: "#F3F4F6", hover: "#374151", border: "#4B5563" },
    },
    ocean: {
      light: { bg: "#F0F9FF", text: "#0369A1", hover: "#E0F2FE", border: "#0284C7" },
      dark: { bg: "#0C2340", text: "#7DD3FC", hover: "#164E63", border: "#0EA5E9" },
    },
    forest: {
      light: { bg: "#F0FDF4", text: "#166534", hover: "#DCFCE7", border: "#22C55E" },
      dark: { bg: "#052E16", text: "#86EFAC", hover: "#166534", border: "#22C55E" },
    },
    sunset: {
      light: { bg: "#FFF7ED", text: "#92400E", hover: "#FFEDD5", border: "#FB923C" },
      dark: { bg: "#431407", text: "#FDBA74", hover: "#7C2D12", border: "#FB923C" },
    },
    purple: {
      light: { bg: "#FAF5FF", text: "#6B21A8", hover: "#F3E8FF", border: "#A855F7" },
      dark: { bg: "#3F0F5C", text: "#D8B4FE", hover: "#6B21A8", border: "#A855F7" },
    },
    rose: {
      light: { bg: "#FFF1F2", text: "#9D174D", hover: "#FFE4E6", border: "#EC4899" },
      dark: { bg: "#500724", text: "#F472B6", hover: "#831843", border: "#EC4899" },
    },
    slate: {
      light: { bg: "#F1F5F9", text: "#334155", hover: "#E2E8F0", border: "#94A3B8" },
      dark: { bg: "#0F172A", text: "#CBD5E1", hover: "#1E293B", border: "#64748B" },
    },
  };

  const theme = colorMap[themeName] || colorMap[defaultTheme];
  return isDark ? theme.dark : theme.light;
};

const SignInButton = () => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const htmlElement = document.documentElement;
      const theme = htmlElement.getAttribute("data-theme") || localStorage.getItem("custom-theme") || defaultTheme;
      setCurrentTheme(theme);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <ClerkSignInButton>
        <Button size="sm" variant="ghost" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </ClerkSignInButton>
    );
  }

  const isDark = resolvedTheme === "dark";
  const colors = getTooltipColors(currentTheme, isDark);

  return (
    <ClerkSignInButton>
      <Tooltip>
        <TooltipTrigger>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-md"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            color: colors.text,
          }}
        >
          <div className="space-y-2">
            <p className="font-medium" style={{ color: colors.text }}>Sign in to unlock:</p>
            <p className="text-xs" style={{ color: colors.text }}>📊 Progress tracking & detailed stats</p>
            <p className="text-xs" style={{ color: colors.text }}>🏆 Performance history & improvements</p>
            <p className="text-xs" style={{ color: colors.text }}>💾 Never lose your typing results</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </ClerkSignInButton>
  );
};

export default SignInButton;
