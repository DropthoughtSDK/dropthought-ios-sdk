"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTheme = void 0;
var _react = require("react");
var _ThemeContext = require("./ThemeContext");
const useTheme = () => {
  const context = (0, _react.useContext)(_ThemeContext.ThemeContext);
  return context;
};
exports.useTheme = useTheme;
//# sourceMappingURL=ThemeHooks.js.map