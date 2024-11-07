"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireWildcard(require("../styles"));
var _translation = _interopRequireDefault(require("../translation"));
var _theme = require("../contexts/theme");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const QuestionWarningMessage = ({
  message
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  const isDarkMode = colorScheme === _theme.COLOR_SCHEMES.dark;
  const rtl = _translation.default.dir() === 'rtl';
  const hintStyle = [styles.hint, {
    color: _styles.Colors.warningRed,
    lineHeight: _translation.default.language === 'te' ? 21 : undefined
  }, rtl && _styles.default.horizontalFlip];
  if (!message) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, rtl && _styles.default.horizontalFlip]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.tip, isDarkMode && styles.darkModeTip]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bubble, isDarkMode && styles.darkModeBubble]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/custom_preview_warning_msg",
    style: hintStyle
  }, message)));
};
var _default = exports.default = QuestionWarningMessage;
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 12
  },
  tip: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f9ebeb'
  },
  darkModeTip: {
    borderBottomColor: '#39393a'
  },
  bubble: {
    backgroundColor: '#f9ebeb',
    minWidth: 280,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9
  },
  darkModeBubble: {
    backgroundColor: '#39393a'
  },
  hint: {
    fontSize: 13,
    fontWeight: '600'
  }
});
//# sourceMappingURL=QuestionWarningMessage.js.map