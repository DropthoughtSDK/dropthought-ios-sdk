"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KioskProvider = void 0;
var _react = _interopRequireDefault(require("react"));
var _feedback = require("./contexts/feedback");
var _theme = require("./contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const KioskProvider = ({
  children,
  themeOption,
  appearance,
  hexCode,
  fontColor,
  backgroundColor,
  autoClose,
  autoCloseCountdown
}) => {
  return /*#__PURE__*/_react.default.createElement(_theme.ThemeProvider, {
    themeOption: themeOption,
    appearance: appearance,
    hexCode: hexCode,
    fontColor: fontColor,
    backgroundColor: backgroundColor,
    autoClose: autoClose,
    autoCloseCountdown: autoCloseCountdown
  }, /*#__PURE__*/_react.default.createElement(_feedback.FeedbackProvider, null, children));
};
exports.KioskProvider = KioskProvider;
//# sourceMappingURL=KioskProvider.js.map