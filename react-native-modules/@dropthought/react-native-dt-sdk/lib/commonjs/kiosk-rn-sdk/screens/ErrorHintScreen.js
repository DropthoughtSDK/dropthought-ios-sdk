"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeUi = require("@dropthought/react-native-ui");
var _CloseButton = _interopRequireWildcard(require("../components/CloseButton"));
var _SurveyContext = require("../contexts/survey/SurveyContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * This Fake Screen is used when you need a header, but it is not in any navigation
 * it is used to display the placeholder when unable to fetch survey
 */

const ErrorHintScreen = ({
  onClose,
  hideCloseButton = false,
  children
}) => {
  const {
    backgroundColor,
    colorScheme,
    fontColor,
    hexCode,
    themeOption
  } = (0, _reactNativeUi.useTheme)();
  const {
    survey
  } = (0, _SurveyContext.useSurveyContext)();
  const isRtl = _reactNativeUi.i18n.dir() === 'rtl';
  const isBijliride = themeOption === _reactNativeUi.THEME_OPTION.BIJLIRIDE;
  const headerTextStyle = [styles.title, {
    color: fontColor
  }];
  const header = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 1,
    style: headerTextStyle
  }, (survey === null || survey === void 0 ? void 0 : survey.surveyName) || ''), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.closeButtonWrapper, isRtl ? styles.closeButtonWrapperRtl : styles.closeButtonWrapperLtr]
  }, /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
    onPress: onClose,
    tintColor: hexCode || fontColor
  }))));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _reactNative.Platform.OS === 'android' && /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
    backgroundColor: backgroundColor,
    barStyle: colorScheme === _reactNativeUi.COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: [_reactNativeUi.GlobalStyle.flex1, {
      backgroundColor
    }]
  }, hideCloseButton || isBijliride ? null : header, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _reactNativeUi.GlobalStyle.flex1
  }, children)));
};
var _default = exports.default = ErrorHintScreen;
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    height: _CloseButton.ICON_SIZE,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: _CloseButton.ICON_SIZE,
    textAlign: 'center'
  },
  closeButtonWrapper: {
    position: 'absolute'
  },
  closeButtonWrapperRtl: {
    right: 0
  },
  closeButtonWrapperLtr: {
    left: 0
  }
});
//# sourceMappingURL=ErrorHintScreen.js.map