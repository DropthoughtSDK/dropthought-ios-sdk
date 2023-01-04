"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = void 0;

var _react = require("react");

var _styles = require("../../styles");

var _theme = require("./theme.const");

const ThemeContext = /*#__PURE__*/(0, _react.createContext)({
  themeOption: _theme.THEME_OPTION.CLASSIC,
  colorScheme: 'light',
  fontColor: _styles.Colors.fontColorLight,
  backgroundColor: _styles.Colors.backgroundColorLight,
  customFontColor: '',
  customBackgroundColor: ''
});
exports.ThemeContext = ThemeContext;
//# sourceMappingURL=ThemeContext.js.map