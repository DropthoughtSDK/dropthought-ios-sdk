export enum THEME_OPTIONS {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export type IThemeOptionsType =
  | THEME_OPTIONS.SYSTEM
  | THEME_OPTIONS.LIGHT
  | THEME_OPTIONS.DARK;

export enum COLOR_SCHEMES {
  light = 'light',
  dark = 'dark',
}

export type IColorSchemesType = COLOR_SCHEMES.light | COLOR_SCHEMES.dark;

export type FontColor = string;
export type BackgroundColor = string;
