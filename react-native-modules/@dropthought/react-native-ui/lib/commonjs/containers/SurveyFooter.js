"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hooks = require("@react-native-community/hooks");
var _styles = require("../styles");
var _translation = _interopRequireDefault(require("../translation"));
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */

const isAndroid = _reactNative.Platform.OS === 'android';
const SurveyFooter = props => {
  const rtl = _translation.default.dir() === 'rtl';
  const {
    submitSurvey,
    surveyColor,
    isFirstPage,
    isLastPage,
    onPrevPage,
    onNextPage,
    backgroundColor
  } = props;
  const {
    keyboardShown
  } = (0, _hooks.useKeyboard)();
  const containerStyle = [styles.container, {
    backgroundColor
  }];
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  const isDarkMode = colorScheme === _theme.COLOR_SCHEMES.dark;
  const iconStyle = [styles.icon, {
    tintColor: isDarkMode ? _styles.Colors.white : surveyColor
  }];
  const iconBgStyle = [styles.iconBg, {
    tintColor: surveyColor,
    opacity: isDarkMode ? 1 : 0.1
  }];
  const [submitDisabled, setSubmitDisabled] = (0, _react.useState)(false);
  const leftIcon = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    accessibilityLabel: "test:id/custom_preview_back",
    style: iconBgStyle,
    source: require('../assets/icPreviousButtonBg.png')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/icPreviousButton.png')
  }));
  const rightIcon = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    accessibilityLabel: "test:id/custom_preview_next",
    style: iconBgStyle,
    source: require('../assets/icNextButtonBg.png')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/icNextButton.png')
  }));
  const submitButtonStyle = [styles.centerButtonContainer, {
    backgroundColor: surveyColor,
    borderRadius: _translation.default.language === 'te' ? 25 : 20
  }];
  const textStyle = [styles.submitText, {
    lineHeight: _translation.default.language === 'te' ? 26 : undefined
  }];
  const submitButton = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.GlobalStyle.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: submitButtonStyle,
    disabled: submitDisabled,
    onPress: () => {
      setSubmitDisabled(true);
      setTimeout(() => setSubmitDisabled(false), 1000);
      onNextPage();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/button_custom_preview_submit",
    style: textStyle
  }, submitSurvey)));
  const leftButton = /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.leftButtonContainer,
    onPress: rtl ? onNextPage : onPrevPage
  }, leftIcon);
  const rightButton = /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.rightButtonContainer,
    onPress: rtl ? onPrevPage : onNextPage
  }, rightIcon);

  // hide this bar when it is android and keyboard is shown
  if (isAndroid && keyboardShown) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, isFirstPage ? null : rtl ? rightButton : leftButton, isLastPage ? submitButton : rtl ? leftButton : rightButton);
};
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: 100
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0
  },
  centerButtonContainer: {
    minWidth: 100,
    borderRadius: 20,
    top: 14,
    paddingHorizontal: 30,
    paddingVertical: 12
  },
  submitText: {
    color: _styles.Colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  icon: {
    position: 'absolute',
    top: 21,
    left: 13
  },
  iconBg: {
    opacity: 0.5
  }
});
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SurveyFooter);
//# sourceMappingURL=SurveyFooter.js.map