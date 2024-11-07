"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var React = _interopRequireWildcard(require("react"));
var _surveyPage = require("../contexts/survey-page");
var _styles = _interopRequireWildcard(require("../styles"));
var _QuestionWarningMessage = _interopRequireDefault(require("./QuestionWarningMessage"));
var _translation = _interopRequireDefault(require("../translation"));
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  subTitleMessage,
  style
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const {
    fontColor,
    themeOption,
    customFontColor
  } = (0, _theme.useTheme)();
  const {
    questionId,
    questionTitlePlain,
    mandatory,
    type,
    subType,
    optional
  } = question;
  const ref = React.useRef(null);
  const addMandatoryRef = (0, _surveyPage.useAddMandatoryRef)();
  React.useEffect(() => {
    if (ref.current) {
      addMandatoryRef(questionId, ref.current);
    }
  }, [addMandatoryRef, questionId]);
  let color = fontColor;
  const isOption6Smiley = themeOption === _theme.THEME_OPTION.OPTION6 && type === 'rating' && subType === 'smiley';
  if ((customFontColor === undefined || customFontColor === '') && isOption6Smiley) {
    color = _styles.Colors.white;
  }
  const textStyle = [styles.questionTitle, questionTitleSize[dimensionWidthType], {
    color,
    lineHeight: _translation.default.language === 'te' ? 42 : undefined
  }];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    ref: ref,
    style: [styles.horizontal, style, rtl && _styles.default.flexRowReverse]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    testID: "test:id/mandatory_title",
    style: textStyle
  }, questionTitlePlain,
  //optional was been used on matrix question
  (mandatory || optional) && /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.hint
  }, "*")), subTitleMessage ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: rtl && _styles.default.flexRowReverse
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.subTitle
  }, subTitleMessage)) : null, /*#__PURE__*/React.createElement(_QuestionWarningMessage.default
  // forgot message has higher priority than custom invalid message
  , {
    message: forgot ? mandatoryErrorMessage : invalidMessage
  }));
};
var _default = exports.default = MandatoryTitle;
const questionTitleSize = _reactNative.StyleSheet.create({
  [_useWindowDimensions.DimensionWidthType.phone]: {
    fontSize: 26
  },
  [_useWindowDimensions.DimensionWidthType.tablet]: {
    fontSize: 26
  }
});
const styles = _reactNative.StyleSheet.create({
  hint: {
    color: _styles.Colors.mandatoryRed,
    fontSize: 18
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center'
  },
  subTitle: {
    marginTop: 8,
    color: _styles.Colors.border
  }
});
//# sourceMappingURL=MandatoryTitle.js.map