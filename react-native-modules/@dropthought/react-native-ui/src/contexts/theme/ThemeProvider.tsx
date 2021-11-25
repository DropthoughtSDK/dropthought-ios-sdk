import * as React from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import { Colors } from '../../styles';
import { ThemeContext } from './ThemeContext';
import {
  THEME_OPTIONS,
  COLOR_SCHEMES,
  IThemeOptionsType,
  IColorSchemesType,
  FontColor,
  BackgroundColor,
} from './theme.const';

function getColorScheme(
  theme: IThemeOptionsType,
  systemColorScheme: ColorSchemeName
): IColorSchemesType {
  let colorScheme;
  if (theme === THEME_OPTIONS.SYSTEM) {
    if (systemColorScheme) {
      colorScheme = COLOR_SCHEMES[systemColorScheme];
    }
  } else if ([THEME_OPTIONS.LIGHT, THEME_OPTIONS.DARK].includes(theme)) {
    colorScheme = COLOR_SCHEMES[theme];
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

function useTheme({
  theme,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor,
}: {
  theme: IThemeOptionsType;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
}) {
  const systemColorScheme = useColorScheme();
  const colorScheme = getColorScheme(theme, systemColorScheme);
  const fontColor = getFontColor(customFontColor, colorScheme);
  const backgroundColor = getBackgroundColor(
    customBackgroundColor,
    colorScheme
  );

  return React.useMemo(() => {
    return {
      colorScheme,
      fontColor,
      backgroundColor,
    };
  }, [colorScheme, fontColor, backgroundColor]);
}

type Props = {
  children: React.ReactNode;
  theme: IThemeOptionsType;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
};

export function ThemeProvider({
  children,
  theme,
  fontColor,
  backgroundColor,
}: Props) {
  const themeValue = useTheme({ theme, fontColor, backgroundColor });

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
