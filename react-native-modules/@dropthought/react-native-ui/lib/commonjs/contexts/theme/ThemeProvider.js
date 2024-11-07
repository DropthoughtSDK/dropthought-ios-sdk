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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getColorScheme(appearance, systemColorScheme) {
  let colorScheme;
  if (appearance === _theme.APPEARANCE.SYSTEM) {
    if (systemColorScheme) {
      colorScheme = _theme.COLOR_SCHEMES[systemColorScheme];
    }
  } else if ([_theme.APPEARANCE.LIGHT, _theme.APPEARANCE.DARK].includes(appearance)) {
    colorScheme = _theme.COLOR_SCHEMES[appearance];
  }
  return colorScheme ?? _theme.COLOR_SCHEMES.light;
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
  themeOption,
  appearance,
  hexCode,
  fontColor: customFontColor,
  backgroundColor: customBackgroundColor,
  autoClose,
  autoCloseCountdown
}) {
  const systemColorScheme = (0, _reactNative.useColorScheme)();
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
function ThemeProvider({
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
  if (themeOption === _theme.THEME_OPTION.BIJLIRIDE) {
    transformedHexCode = _styles.Colors.bijlirideHexCode;
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
  return /*#__PURE__*/React.createElement(_ThemeContext.ThemeContext.Provider, {
    value: themeValue
  }, children);
}
//# sourceMappingURL=ThemeProvider.js.map