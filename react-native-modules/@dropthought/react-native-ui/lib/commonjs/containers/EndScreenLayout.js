"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EndScreenLayout;
var _react = _interopRequireDefault(require("react"));
var _theme = require("../contexts/theme");
var _EndScreen = _interopRequireDefault(require("./EndScreen"));
var _ClassicEndScreen = _interopRequireDefault(require("./ClassicEndScreen"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function EndScreenLayout({
  survey,
  onClose
}) {
  const {
    themeOption
  } = (0, _theme.useTheme)();
  switch (themeOption) {
    case _theme.THEME_OPTION.CLASSIC:
    case _theme.THEME_OPTION.BIJLIRIDE:
      return /*#__PURE__*/_react.default.createElement(_ClassicEndScreen.default, {
        survey: survey,
        onClose: onClose
      });
    default:
      return /*#__PURE__*/_react.default.createElement(_EndScreen.default, {
        survey: survey,
        onClose: onClose
      });
  }
}
//# sourceMappingURL=EndScreenLayout.js.map