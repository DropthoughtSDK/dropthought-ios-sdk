"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _Button = _interopRequireDefault(require("../components/Button"));
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

const DummyButton = ({
  width
}) => /*#__PURE__*/React.createElement(_reactNative.View, {
  style: {
    width
  }
});
const ClassicSurveyFooter = props => {
  const {
    hexCode
  } = (0, _theme.useTheme)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const rtl = _translation.default.dir() === 'rtl';
  const {
    survey,
    pageIndex = 0,
    isLast,
    onPrevPage,
    onNextPage
  } = props;

  // why use a dummy button here? we use 'space-between' to layout the buttons
  let LeftButtonComponent = _Button.default;
  if (!pageIndex || pageIndex <= 0) {
    // @ts-ignore
    LeftButtonComponent = DummyButton;
  }
  const themeColor = hexCode;
  const btnWidth = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone ? 76 : 100;
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, rtl && _styles.GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(LeftButtonComponent, {
    testID: "test:id/button_back_preview",
    width: btnWidth,
    title: survey.backPage,
    color: themeColor,
    onPress: onPrevPage
    // @ts-ignore
    ,
    containerStyle: styles.leftBtnContainer
  }), isLast ? /*#__PURE__*/React.createElement(_Button.default, {
    testID: "test:id/button_submit_preview",
    disabled: submitDisabled,
    width: btnWidth,
    title: survey.submitSurvey,
    color: themeColor,
    onPress: () => {
      setSubmitDisabled(true);
      setTimeout(() => setSubmitDisabled(false), 1000);
      onNextPage();
    }
    // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }) : /*#__PURE__*/React.createElement(_Button.default, {
    testID: "test:id/button_next_preview",
    width: btnWidth,
    title: survey.nextPage,
    color: themeColor,
    onPress: onNextPage
    // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    ..._styles.GlobalStyle.row,
    justifyContent: 'space-between',
    marginVertical: 30
  }
});
var _default = exports.default = /*#__PURE__*/React.memo(ClassicSurveyFooter);
//# sourceMappingURL=ClassicSurveyFooter.js.map