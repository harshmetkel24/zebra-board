export interface Pallette {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface ThemeConfig {
  name: string;
  light: Pallette;
  dark: Pallette;
}

export interface CustomThemes {
  [name: string]: ThemeConfig;
}
