import { CustomThemes } from "./types";

export const themes: CustomThemes = {
  ocean: {
    name: "Ocean Blue",
    light: {
      primary: "#1e40af", // Deep blue
      secondary: "#3b82f6", // Bright blue
      tertiary: "#60a5fa", // Light blue
    },
    dark: {
      primary: "#1e3a8a", // Darker blue
      secondary: "#2563eb", // Medium blue
      tertiary: "#3b82f6", // Bright blue
    },
  },
  forest: {
    name: "Forest Green",
    light: {
      primary: "#166534", // Dark green
      secondary: "#22c55e", // Bright green
      tertiary: "#4ade80", // Light green
    },
    dark: {
      primary: "#14532d", // Darker green
      secondary: "#16a34a", // Medium green
      tertiary: "#22c55e", // Bright green
    },
  },
  sunset: {
    name: "Sunset Orange",
    light: {
      primary: "#c2410c", // Deep orange
      secondary: "#ea580c", // Bright orange
      tertiary: "#fb923c", // Light orange
    },
    dark: {
      primary: "#9a3412", // Darker orange
      secondary: "#c2410c", // Medium orange
      tertiary: "#ea580c", // Bright orange
    },
  },
  purple: {
    name: "Purple Dream",
    light: {
      primary: "#7c3aed", // Deep purple
      secondary: "#a855f7", // Bright purple
      tertiary: "#c084fc", // Light purple
    },
    dark: {
      primary: "#6b21a8", // Darker purple
      secondary: "#7c3aed", // Medium purple
      tertiary: "#a855f7", // Bright purple
    },
  },
  rose: {
    name: "Rose Pink",
    light: {
      primary: "#be185d", // Deep pink
      secondary: "#ec4899", // Bright pink
      tertiary: "#f472b6", // Light pink
    },
    dark: {
      primary: "#9d174d", // Darker pink
      secondary: "#be185d", // Medium pink
      tertiary: "#ec4899", // Bright pink
    },
  },
  slate: {
    name: "Modern Slate",
    light: {
      primary: "#334155", // Dark slate
      secondary: "#64748b", // Medium slate
      tertiary: "#94a3b8", // Light slate
    },
    dark: {
      primary: "#1e293b", // Darker slate
      secondary: "#334155", // Medium slate
      tertiary: "#64748b", // Bright slate
    },
  },
};

export const getThemeNames = (): string[] => {
  return Object.keys(themes);
};

export const getTheme = (name: string) => {
  return themes[name];
};

export const defaultTheme = "ocean";
