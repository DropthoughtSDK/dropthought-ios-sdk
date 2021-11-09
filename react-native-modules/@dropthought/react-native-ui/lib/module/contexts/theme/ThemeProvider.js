import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../../styles';
import { ThemeContext } from './ThemeContext';
import { THEME_OPTIONS, COLOR_SCHEMES } from './theme.const';

function getColorScheme(theme, systemColorScheme) {
  var _colorScheme;

  let colorScheme;

  if (theme === THEME_OPTIONS.SYSTEM) {
    if (systemColorScheme) {
      colorScheme = COLOR_SCHEMES[systemColorScheme];
    }
  } else if ([THEME_OPTIONS.LIGHT, THEME_OPTIONS.DARK].includes(theme)) {
    colorScheme = COLOR_SCHEMES[theme];
  }

  return (_colorScheme = colorScheme) !== null && _colorScheme !== void 0 ? _colorScheme : COLOR_SCHEMES.light;
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
  theme,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor
}) {
  const systemColorScheme = useColorScheme();
  const colorScheme = getColorScheme(theme, systemColorScheme);
  const fontColor = getFontColor(customFontColor, colorScheme);
  const backgroundColor = getBackgroundColor(customBackgroundColor, colorScheme);
  return React.useMemo(() => {
    return {
      colorScheme,
      fontColor,
      backgroundColor
    };
  }, [colorScheme, fontColor, backgroundColor]);
}

export function ThemeProvider({
  children,
  theme,
  fontColor,
  backgroundColor
}) {
  const themeValue = useTheme({
    theme,
    fontColor,
    backgroundColor
  });
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: themeValue
  }, children);
}
//# sourceMappingURL=ThemeProvider.js.map