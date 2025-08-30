#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read themes from the themes.ts file and generate themes.json
function readThemes() {
  const themesTsPath = path.join(__dirname, '..', 'lib', 'themes', 'themes.ts');
  const themesJsonPath = path.join(__dirname, '..', 'lib', 'themes', 'themes.json');

  // Read the TypeScript file
  const themesTsContent = fs.readFileSync(themesTsPath, 'utf-8');

  // Create a temporary JavaScript file to extract themes
  const tempFile = path.join(__dirname, 'temp-extract-themes.js');

  // Extract just the themes object and create a runnable JS file
  const themesMatch = themesTsContent.match(/export const themes: CustomThemes = (\{[\s\S]*?\n\})/);
  if (!themesMatch) {
    throw new Error('Could not find themes object in themes.ts');
  }

  const tempContent = `
    const themes = ${themesMatch[1]};
    console.log(JSON.stringify(themes, null, 2));
  `;

  fs.writeFileSync(tempFile, tempContent);

  try {
    // Execute the temporary file to get the themes as JSON
    const result = execSync(`node ${tempFile}`, { encoding: 'utf-8' });
    const themes = JSON.parse(result);

    // Generate and write the JSON file
    const themesJson = JSON.stringify(themes, null, 2);
    fs.writeFileSync(themesJsonPath, themesJson);
    console.log('📄 Generated themes.json from themes.ts');

    return themes;
  } catch (error) {
    throw new Error(`Failed to parse themes.ts: ${error.message}`);
  } finally {
    // Clean up temp file
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
}

// Generate CSS variables for a theme
function generateThemeCSS(themeName, themeConfig) {
  const { light, dark } = themeConfig;

  return `
/* ${themeConfig.name} Theme */
[data-theme="${themeName}"] {
  --primary: ${light.primary};
  --secondary: ${light.secondary};
  --tertiary: ${light.tertiary};
  --primary-foreground: #ffffff;
  --secondary-foreground: #ffffff;
  --tertiary-foreground: #000000;
}

[data-theme="${themeName}"].dark,
.dark[data-theme="${themeName}"] {
  --primary: ${dark.primary};
  --secondary: ${dark.secondary};
  --tertiary: ${dark.tertiary};
  --primary-foreground: #ffffff;
  --secondary-foreground: #ffffff;
  --tertiary-foreground: #ffffff;
}`;
}

// Generate all theme CSS
function generateAllThemesCSS(themes) {
  let css = '';

  Object.entries(themes).forEach(([themeName, themeConfig]) => {
    css += generateThemeCSS(themeName, themeConfig);
  });

  return css;
}

// Update globals.css
function updateGlobalsCSS(themeCSS) {
  const globalsPath = path.join(__dirname, '..', 'app', 'globals.css');
  let globalsContent = fs.readFileSync(globalsPath, 'utf-8');

  // Remove existing theme CSS (between markers)
  const startMarker = '/* THEME VARIABLES START */';
  const endMarker = '/* THEME VARIABLES END */';

  const startIndex = globalsContent.indexOf(startMarker);
  const endIndex = globalsContent.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    globalsContent = globalsContent.substring(0, startIndex) + globalsContent.substring(endIndex + endMarker.length);
  }

  // Add theme CSS before the @layer base
  const insertPoint = globalsContent.indexOf('@layer base');
  if (insertPoint === -1) {
    throw new Error('Could not find @layer base in globals.css');
  }

  const updatedContent = globalsContent.substring(0, insertPoint) +
    `${startMarker}\n${themeCSS}\n${endMarker}\n\n` +
    globalsContent.substring(insertPoint);

  fs.writeFileSync(globalsPath, updatedContent);
  console.log('✅ Updated globals.css with theme variables');
}

// Main function
function main() {
  try {
    console.log('🔄 Reading themes from themes.ts...');
    const themes = readThemes();

    console.log('🎨 Generating CSS variables...');
    const themeCSS = generateAllThemesCSS(themes);

    console.log('📝 Updating globals.css...');
    updateGlobalsCSS(themeCSS);

    console.log('✨ Theme CSS generation complete!');
    console.log(`📊 Generated CSS for ${Object.keys(themes).length} themes`);
    console.log('💡 Source of truth: themes.ts → themes.json → globals.css');

  } catch (error) {
    console.error('❌ Error generating theme CSS:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateThemeCSS, generateAllThemesCSS };