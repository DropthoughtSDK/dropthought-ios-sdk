import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../../styles';
import { ThemeContext } from './ThemeContext';
import { APPEARANCE, COLOR_SCHEMES, THEME_OPTION } from './theme.const';
function getColorScheme(appearance, systemColorScheme) {
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
function getFontColor(customFontColor, colorScheme) {
  if (customFontColor) {
    return customFontColor;
  }
  if (colorScheme === COLOR_SCHEMES.dark) {
    return Colors.fontColorDark;
  }
  return Colors.fontColorLight;
}
function getBackgroundColor(customBackgroundColor, colorScheme) {
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
  hexCode,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor,
  autoClose,
  autoCloseCountdown
}) {
  const systemColorScheme = useColorScheme();
  const colorScheme = getColorScheme(appearance, systemColorScheme);
  const fontColor = getFontColor(customFontColor, colorScheme);
  const backgroundColor = getBackgroundColor(customBackgroundColor, colorScheme);
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
      autoCloseCountdown
    };
  }, [themeOption, hexCode, colorScheme, fontColor, backgroundColor, customFontColor, customBackgroundColor, autoClose, autoCloseCountdown]);
}
export function ThemeProvider({
  children,
  themeOption,
  appearance,
  hexCode,
  fontColor,
  backgroundColor,
  autoClose,
  autoCloseCountdown
}) {
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
    autoCloseCountdown
  });
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: themeValue
  }, children);
}
//# sourceMappingURL=ThemeProvider.js.map