"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _styles = require("../styles");
var _theme = require("../contexts/theme");
var _translation = _interopRequireDefault(require("../translation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SurveyPageIndicator = props => {
  const {
    survey,
    pageIndex = 0,
    rtl
  } = props;
  const {
    hexCode,
    colorScheme
  } = (0, _theme.useTheme)();
  const isDarkMode = colorScheme === _theme.COLOR_SCHEMES.dark;
  const themeColor = hexCode;
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const dimensionStyles = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone ? phoneStyles : tabletStyles;
  const currentPage = survey.pages[pageIndex];
  const textStyle = [styles.title, dimensionStyles.title, isDarkMode && styles.darkModeTitle, {
    paddingBottom: _translation.default.language === 'te' ? 5 : 0
  }];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, dimensionStyles.container, {
      backgroundColor: (0, _styles.opacity10)(themeColor)
    }, isDarkMode && styles.darkModeContainer, rtl ? styles.rtl : {}]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    testID: "test:id/preview_page_indicator",
    style: textStyle
  }, currentPage === null || currentPage === void 0 ? void 0 : currentPage.pageTitle));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 40,
    width: '100%'
  },
  darkModeContainer: {
    backgroundColor: '#39393a'
  },
  title: {
    fontWeight: '600'
  },
  darkModeTitle: {
    color: (0, _styles.opacity60)(_styles.Colors.white)
  },
  rtl: {
    alignItems: 'flex-end'
  }
});
const phoneStyles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.42,
    color: _styles.Colors.progressBarText
  }
});
const tabletStyles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 35
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.48
  }
});
var _default = exports.default = /*#__PURE__*/React.memo(SurveyPageIndicator);
//# sourceMappingURL=SurveyPageIndicator.js.map