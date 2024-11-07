"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("../styles");
var _translation = _interopRequireDefault(require("../translation"));
var _ProgressBar = _interopRequireDefault(require("../components/ProgressBar"));
var _theme = require("../contexts/theme");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-ignore

const SurveyHeader = props => {
  const rtl = _translation.default.dir() === 'rtl';
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    survey,
    pageIndex,
    backgroundColor,
    question,
    onClose
  } = props;
  const {
    hexCode,
    fontColor,
    themeOption,
    customFontColor
  } = (0, _theme.useTheme)();
  let color = fontColor;
  const isOption6Smiley = themeOption === _theme.THEME_OPTION.OPTION6 && (question === null || question === void 0 ? void 0 : question.type) === 'rating' && (question === null || question === void 0 ? void 0 : question.subType) === 'smiley';
  if ((customFontColor === undefined || customFontColor === '') && isOption6Smiley) {
    color = _styles.Colors.white;
  }
  const containerStyle = [styles.container, {
    paddingTop: insets.top
  }, {
    backgroundColor
  }];
  const iconStyle = {
    tintColor: hexCode
  };
  const titleStyle = [styles.title, {
    color
  }];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.headerRowContainer, rtl && _styles.GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/icClose24Px.png')
  })), /*#__PURE__*/React.createElement(_reactNative.Text, {
    testID: "test:id/preview_survey_name_header",
    style: titleStyle,
    numberOfLines: 1
  }, survey.surveyName)), /*#__PURE__*/React.createElement(_ProgressBar.default, {
    value: pageIndex + 1,
    maxValue: survey.pageOrder.length,
    themeColor: hexCode,
    color: color,
    rtl: rtl
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginTop: 17
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1
  }
});
var _default = exports.default = /*#__PURE__*/React.memo(SurveyHeader);
//# sourceMappingURL=SurveyHeader.js.map