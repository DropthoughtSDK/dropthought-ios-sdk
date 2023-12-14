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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    style: hintStyle
  }, message)));
};

var _default = QuestionWarningMessage;
exports.default = _default;

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