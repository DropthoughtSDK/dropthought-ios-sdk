"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _reactNativeUi = require("@dropthought/react-native-ui");

var _CloseButton = _interopRequireDefault(require("../components/CloseButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This Fake Screen is used when you need a header, but it is not in any navigation
 * it is used to display the placeholder when unable to fetch survey
 */
const FakeScreen = ({
  onClose,
  children
}) => {
  const {
    backgroundColor,
    colorScheme
  } = (0, _reactNativeUi.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _reactNative.Platform.OS === 'android' && /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
    backgroundColor: backgroundColor,
    barStyle: colorScheme === _reactNativeUi.COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: [_reactNativeUi.GlobalStyle.flex1, {
      backgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
    tintColor: _reactNativeUi.Colors.purple,
    onPress: onClose
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _reactNativeUi.GlobalStyle.flex1
  }, children)));
};

var _default = FakeScreen;
exports.default = _default;
//# sourceMappingURL=FakeScreen.js.map