# Theme System Documentation

This directory contains the theme system for the application, providing multiple custom themes with automatic CSS generation.

## Structure

- `types.ts` - TypeScript interfaces for theme definitions
- `themes.ts` - Theme definitions in TypeScript
- `themes.json` - Theme definitions in JSON (used by the CSS generator - auto generated after executing script)
- `index.ts` - Main exports

## How to Add a New Theme

### Step 1: Add to themes.ts (Source of Truth)
Add your new theme to `lib/themes/themes.ts`:

```typescript
export const themes: CustomThemes = {
  // ... existing themes
  "your-theme-name": {
    name: "Your Theme Name",
    light: {
      primary: "#your-primary-color",
      secondary: "#your-secondary-color",
      tertiary: "#your-tertiary-color"
    },
    dark: {
      primary: "#your-dark-primary-color",
      secondary: "#your-dark-secondary-color",
      tertiary: "#your-dark-tertiary-color"
    }
  }
};
```

### Step 2: Generate CSS
Run the CSS generation script:

```bash
npm run generate-themes
```

This will:
1. Read themes from `themes.ts` (source of truth)
2. Generate `themes.json` automatically
3. Update `app/globals.css` with new theme variables

### Workflow
```
themes.ts → generate-themes script → themes.json → globals.css
```

**Note:** You only need to edit `themes.ts`. The script handles everything else automatically!

## Usage in Components

### Using Theme Variables
```tsx
// These will automatically use the current theme's colors
<div className="bg-primary text-primary-foreground">
  Primary colored element
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary colored element
</div>

<div className="bg-tertiary text-tertiary-foreground">
  Tertiary colored element
</div>
```

### ThemeSwitcher Component
The `ThemeSwitcher` component provides a dropdown to select custom themes:

```tsx
import { ThemeSwitcher } from "@/components/themeSwitcher";

// Add to your navbar or layout
<ThemeSwitcher />
```

### Manual Theme Switching
Themes are switched using data attributes on the HTML element:

```typescript
// Set theme programmatically
document.documentElement.setAttribute("data-theme", "ocean");

// Get current theme
const currentTheme = document.documentElement.getAttribute("data-theme");
```

### Integration with next-themes
The system works alongside `next-themes` for light/dark mode:

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();

// Switch to dark mode
setTheme("dark");

// The custom theme colors will automatically adapt
```

## Available Themes

- **Ocean Blue** (`ocean`) - Deep blues with bright accents
- **Forest Green** (`forest`) - Rich greens for a natural feel
- **Sunset Orange** (`sunset`) - Warm oranges for energy
- **Purple Dream** (`purple`) - Elegant purples for creativity
- **Rose Pink** (`rose`) - Soft pinks for a gentle touch
- **Modern Slate** (`slate`) - Sophisticated grays for minimalism

## Helper Functions

```typescript
import { themes, getThemeNames, getTheme, defaultTheme } from '@/lib/themes';

// Get all available theme names
const themeNames = getThemeNames(); // ['ocean', 'forest', 'sunset', ...]

// Get specific theme configuration
const oceanTheme = getTheme('ocean');

// Use default theme
const currentTheme = getTheme(defaultTheme);
```

## Color Guidelines

- **Primary**: Main brand color, used for primary actions and highlights
- **Secondary**: Supporting color, used for secondary actions and accents
- **Tertiary**: Subtle color, used for backgrounds and muted elements

Ensure good contrast ratios for accessibility:
- Primary colors should have white text (#ffffff)
- Darker colors may need white text in both light and dark modes
- Lighter colors may need black text (#000000) in light mode

## UI Components

### ThemeSwitcher
- **Location**: `components/themeSwitcher.tsx`
- **Purpose**: Dropdown component for selecting custom themes
- **Features**:
  - Shows color preview for each theme
  - Adapts to current light/dark mode
  - Persists selection in localStorage
  - Works alongside the existing ModeToggle

### ModeToggle
- **Location**: `components/modeToggle.tsx`
- **Purpose**: Toggle between light/dark/system themes
- **Integration**: Works seamlessly with custom themes

### Navbar Integration
Both components are integrated into the navbar:

```tsx
// components/navbar.tsx
<div className="flex text-xl items-center space-x-4">
  <ThemeSwitcher />  {/* Custom theme selector */}
  <ModeToggle />     {/* Light/Dark/System toggle */}
  {/* Other navbar items */}
</div>
```

## Automatic Fallback

The system maintains backward compatibility with the original light/dark themes. If no custom theme is selected, it falls back to the default light/dark theme variables.
