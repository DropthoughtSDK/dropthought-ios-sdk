"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = ThemeProvider;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../../styles");

var _ThemeContext = require("./ThemeContext");

var _theme = require("./theme.const");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getColorScheme(theme, systemColorScheme) {
  var _colorScheme;

  let colorScheme;

  if (theme === _theme.THEME_OPTIONS.SYSTEM) {
    if (systemColorScheme) {
      colorScheme = _theme.COLOR_SCHEMES[systemColorScheme];
    }
  } else if ([_theme.THEME_OPTIONS.LIGHT, _theme.THEME_OPTIONS.DARK].includes(theme)) {
    colorScheme = _theme.COLOR_SCHEMES[theme];
  }

  return (_colorScheme = colorScheme) !== null && _colorScheme !== void 0 ? _colorScheme : _theme.COLOR_SCHEMES.light;
}

function getFontColor(customFontColor, colorScheme) {
  if (customFontColor) {
    return customFontColor;
  }

  if (colorScheme === _theme.COLOR_SCHEMES.dark) {
    return _styles.Colors.fontColorDark;
  }

  return _styles.Colors.fontColorLight;
}

function getBackgroundColor(customBackgroundColor, colorScheme) {
  if (customBackgroundColor) {
    return customBackgroundColor;
  }

  if (colorScheme === _theme.COLOR_SCHEMES.dark) {
    return _styles.Colors.backgroundColorDark;
  }

  return _styles.Colors.backgroundColorLight;
}

function useTheme({
  theme,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor
}) {
  const systemColorScheme = (0, _reactNative.useColorScheme)();
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

function ThemeProvider({
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
  return /*#__PURE__*/React.createElement(_ThemeContext.ThemeContext.Provider, {
    value: themeValue
  }, children);
}
//# sourceMappingURL=ThemeProvider.js.map