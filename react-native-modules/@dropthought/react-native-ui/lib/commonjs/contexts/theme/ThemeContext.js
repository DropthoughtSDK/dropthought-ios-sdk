"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = void 0;
var _react = require("react");
var _styles = require("../../styles");
var _theme = require("./theme.const");
const ThemeContext = exports.ThemeContext = /*#__PURE__*/(0, _react.createContext)({
  themeOption: _theme.THEME_OPTION.CLASSIC,
  hexCode: '',
  colorScheme: _theme.COLOR_SCHEMES.light,
  fontColor: _styles.Colors.fontColorLight,
  backgroundColor: _styles.Colors.backgroundColorLight,
  customFontColor: '',
  customBackgroundColor: '',
  autoClose: false,
  autoCloseCountdown: 3000
});
//# sourceMappingURL=ThemeContext.js.map