"use client";

import { Button } from "@/components/ui/button";

function ThemePreivew() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎨 Theme System Demo</h2>
            <p className="text-muted-foreground">
              This demo showcases how the theme system works with different
              color combinations. Switch between themes using the theme switcher
              in the navbar!
            </p>
          </div>

          {/* Primary Colors */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Primary Colors</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary border-2 border-border"></div>
                <span className="text-sm font-medium">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-border"></div>
                <span className="text-sm font-medium">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-tertiary border-2 border-border"></div>
                <span className="text-sm font-medium">Tertiary</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Button Variants</h3>
            <div className="flex gap-2 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          {/* Text Colors */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Text Colors</h3>
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <p className="text-primary font-medium">Primary text color</p>
              <p className="text-secondary">Secondary text color</p>
              <p className="text-muted-foreground">Muted text color</p>
            </div>
          </div>

          {/* Background Colors */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Background Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary text-primary-foreground rounded-lg text-center font-medium">
                Primary Background
              </div>
              <div className="p-4 bg-secondary text-secondary-foreground rounded-lg text-center font-medium">
                Secondary Background
              </div>
              <div className="p-4 bg-muted text-muted-foreground rounded-lg text-center font-medium">
                Muted Background
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-accent rounded-lg">
            <h3 className="font-semibold mb-2">🚀 How to Test:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>
                Use the <strong>Theme Switcher</strong> (🎨 icon) in the navbar
                to change custom themes
              </li>
              <li>
                Use the <strong>Mode Toggle</strong> (☀️/🌙 icon) to switch
                between light/dark modes
              </li>
              <li>
                Watch how all colors adapt automatically to your selections!
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemePreivew;
