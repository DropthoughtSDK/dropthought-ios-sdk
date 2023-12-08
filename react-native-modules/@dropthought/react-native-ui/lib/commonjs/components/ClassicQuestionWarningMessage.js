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

const ClassicQuestionWarningMessage = ({
  message
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  const isDarkMode = colorScheme === _theme.COLOR_SCHEMES.dark;
  const rtl = _translation.default.dir() === 'rtl';
  if (!message) return null;
  const textStyle = [styles.hint, isDarkMode && styles.darkModeHint, rtl && _styles.default.horizontalFlip, {
    lineHeight: _translation.default.language === 'te' ? 22 : undefined
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, rtl && _styles.default.horizontalFlip]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.tip, isDarkMode && styles.darkModeTip]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bubble, isDarkMode && styles.darkModeBubble]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: textStyle
  }, message)));
};

var _default = ClassicQuestionWarningMessage;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12
  },
  tip: {
    top: 13,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderRightWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#FFDEE4'
  },
  darkModeTip: {
    borderRightColor: '#39393a'
  },
  bubble: {
    backgroundColor: '#FFDEE4',
    minWidth: 280,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9
  },
  darkModeBubble: {
    backgroundColor: '#39393a'
  },
  hint: {
    color: _styles.Colors.black,
    fontSize: 13
  },
  darkModeHint: {
    color: '#FFE0E5'
  }
});
//# sourceMappingURL=ClassicQuestionWarningMessage.js.map