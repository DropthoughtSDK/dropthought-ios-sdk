import * as React from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import { Colors } from '../../styles';
import { ThemeContext } from './ThemeContext';
import {
  APPEARANCE,
  COLOR_SCHEMES,
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

function useTheme({
  themeOption,
  appearance,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor,
}: {
  themeOption: IThemeOptionType;
  appearance: IAppearanceType;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
}) {
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
      colorScheme,
      fontColor,
      backgroundColor,
      customFontColor,
      customBackgroundColor,
    };
  }, [
    themeOption,
    colorScheme,
    fontColor,
    backgroundColor,
    customFontColor,
    customBackgroundColor,
  ]);
}

type Props = {
  children: React.ReactNode;
  themeOption: IThemeOptionType;
  appearance: IAppearanceType;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
};

export function ThemeProvider({
  children,
  themeOption,
  appearance,
  fontColor,
  backgroundColor,
}: Props) {
  const themeValue = useTheme({
    themeOption,
    appearance,
    fontColor,
    backgroundColor,
  });

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
