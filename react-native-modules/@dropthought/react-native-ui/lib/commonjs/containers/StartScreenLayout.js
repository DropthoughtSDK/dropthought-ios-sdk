"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StartScreenLayout;

var _react = _interopRequireDefault(require("react"));

var _theme = require("../contexts/theme");

var _StartScreen = _interopRequireDefault(require("./StartScreen"));

var _ClassicStartScreen = _interopRequireDefault(require("./ClassicStartScreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StartScreenLayout({
  onLanguageSelect,
  onClose,
  onStart,
  survey
}) {
  const {
    themeOption
  } = (0, _theme.useTheme)();

  switch (themeOption) {
    case _theme.THEME_OPTION.CLASSIC:
      return /*#__PURE__*/_react.default.createElement(_ClassicStartScreen.default, {
        survey: survey,
        onLanguageSelect: onLanguageSelect,
        onStart: onStart
      });

    default:
      return /*#__PURE__*/_react.default.createElement(_StartScreen.default, {
        survey: survey,
        onLanguageSelect: onLanguageSelect,
        onClose: onClose,
        onStart: onStart
      });
  }
}
//# sourceMappingURL=StartScreenLayout.js.map