import * as React from 'react';
import { useColorScheme } from 'react-native';
import type { ColorSchemeName } from 'react-native';
import { Colors } from '../../styles';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextProps } from './ThemeContext';
import { APPEARANCE, COLOR_SCHEMES, THEME_OPTION } from './theme.const';
import type {
  IAppearanceType,
  IColorSchemesType,
  FontColor,
  BackgroundColor,
  IThemeOptionType,
} from './theme.const';

function getColorScheme(
  appearance: IAppearanceType,
  systemColorScheme: ColorSchemeName
): IColorSchemesType {
  let colorScheme;
  if (appearance === APPEARANCE.SYSTEM) {
    if (systemColorScheme) {
      colorScheme = COLOR_SCHEMES[systemColorScheme];
    }
  } else if ([APPEARANCE.LIGHT, APPEARANCE.DARK].includes(appearance)) {
    colorScheme = COLOR_SCHEMES[appearance];
  }
  return colorScheme ?? COLOR_SCHEMES.light;
}

function getFontColor(
  customFontColor: FontColor,
  colorScheme: IColorSchemesType
) {
  if (customFontColor) {
    return customFontColor;
  }
  if (colorScheme === COLOR_SCHEMES.dark) {
    return Colors.fontColorDark;
  }
  return Colors.fontColorLight;
}

function getBackgroundColor(
  customBackgroundColor: BackgroundColor,
  colorScheme: IColorSchemesType
) {
  if (customBackgroundColor) {
    return customBackgroundColor;
  }
  if (colorScheme === COLOR_SCHEMES.dark) {
    return Colors.backgroundColorDark;
  }
  return Colors.backgroundColorLight;
}

export interface useThemeProps {
  themeOption: IThemeOptionType;
  appearance: IAppearanceType;
  hexCode: string;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
  autoClose: boolean;
  autoCloseCountdown: number;
}

function useTheme({
  themeOption,
  appearance,
  hexCode,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor,
  autoClose,
  autoCloseCountdown,
}: useThemeProps): ThemeContextProps {
  const systemColorScheme = useColorScheme();
  const colorScheme = getColorScheme(appearance, systemColorScheme);
  const fontColor = getFontColor(customFontColor, colorScheme);
  const backgroundColor = getBackgroundColor(
    customBackgroundColor,
    colorScheme
  );

  return React.useMemo(() => {
    return {
      themeOption,
      hexCode,
      colorScheme,
      fontColor,
      backgroundColor,
      customFontColor,
      customBackgroundColor,
      autoClose,
      autoCloseCountdown,
    };
  }, [
    themeOption,
    hexCode,
    colorScheme,
    fontColor,
    backgroundColor,
    customFontColor,
    customBackgroundColor,
    autoClose,
    autoCloseCountdown,
  ]);
}

export interface ThemeProviderProps extends useThemeProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
  themeOption,
  appearance,
  hexCode,
  fontColor,
  backgroundColor,
  autoClose,
  autoCloseCountdown,
}: ThemeProviderProps) {
  let transformedHexCode = hexCode;

  if (themeOption === THEME_OPTION.BIJLIRIDE) {
    transformedHexCode = Colors.bijlirideHexCode;
  }

  const themeValue = useTheme({
    themeOption,
    appearance,
    hexCode: transformedHexCode,
    fontColor,
    backgroundColor,
    autoClose,
    autoCloseCountdown,
  });

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
