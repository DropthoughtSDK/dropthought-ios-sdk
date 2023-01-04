import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../../styles';
import { ThemeContext } from './ThemeContext';
import { APPEARANCE, COLOR_SCHEMES } from './theme.const';

function getColorScheme(appearance, systemColorScheme) {
  var _colorScheme;

  let colorScheme;

  if (appearance === APPEARANCE.SYSTEM) {
    if (systemColorScheme) {
      colorScheme = COLOR_SCHEMES[systemColorScheme];
    }
  } else if ([APPEARANCE.LIGHT, APPEARANCE.DARK].includes(appearance)) {
    colorScheme = COLOR_SCHEMES[appearance];
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
  themeOption,
  appearance,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor
}) {
  const systemColorScheme = useColorScheme();
  const colorScheme = getColorScheme(appearance, systemColorScheme);
  const fontColor = getFontColor(customFontColor, colorScheme);
  const backgroundColor = getBackgroundColor(customBackgroundColor, colorScheme);
  return React.useMemo(() => {
    return {
      themeOption,
      colorScheme,
      fontColor,
      backgroundColor,
      customFontColor,
      customBackgroundColor
    };
  }, [themeOption, colorScheme, fontColor, backgroundColor, customFontColor, customBackgroundColor]);
}

export function ThemeProvider({
  children,
  themeOption,
  appearance,
  fontColor,
  backgroundColor
}) {
  const themeValue = useTheme({
    themeOption,
    appearance,
    fontColor,
    backgroundColor
  });
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: themeValue
  }, children);
}
//# sourceMappingURL=ThemeProvider.js.map