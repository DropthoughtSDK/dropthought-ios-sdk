export enum APPEARANCE {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export type IAppearanceType =
  | APPEARANCE.SYSTEM
  | APPEARANCE.LIGHT
  | APPEARANCE.DARK;

export enum COLOR_SCHEMES {
  light = 'light',
  dark = 'dark',
}

export type IColorSchemesType = COLOR_SCHEMES.light | COLOR_SCHEMES.dark;

export type FontColor = string;
export type BackgroundColor = string;

export enum THEME_OPTION {
  CLASSIC = 'classic',
  OPTION1 = 'option1',
  OPTION2 = 'option2',
  OPTION3 = 'option3',
  OPTION4 = 'option4',
  OPTION6 = 'option6',
}

export type IThemeOptionType =
  | THEME_OPTION.CLASSIC
  | THEME_OPTION.OPTION1
  | THEME_OPTION.OPTION2
  | THEME_OPTION.OPTION3
  | THEME_OPTION.OPTION4
  | THEME_OPTION.OPTION6;
