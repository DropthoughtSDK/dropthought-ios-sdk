"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = void 0;

var _react = require("react");

var _styles = require("../../styles");

const ThemeContext = /*#__PURE__*/(0, _react.createContext)({
  colorScheme: 'light',
  fontColor: _styles.Colors.fontColorLight,
  backgroundColor: _styles.Colors.backgroundColorLight
});
exports.ThemeContext = ThemeContext;
//# sourceMappingURL=ThemeContext.js.map