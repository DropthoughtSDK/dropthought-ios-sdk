"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _surveyPage = require("../contexts/survey-page");
var _styles = _interopRequireWildcard(require("../styles"));
var _ClassicQuestionWarningMessage = _interopRequireDefault(require("./ClassicQuestionWarningMessage"));
var _HtmlText = _interopRequireDefault(require("./HtmlText"));
var _htmlHelper = require("../utils/htmlHelper");
var _translation = _interopRequireDefault(require("../translation"));
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ClassicMandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  subTitleMessage,
  style
}) => {
  const {
    questionId,
    questionTitle,
    mandatory,
    optional,
    type,
    respondentTracker = false
  } = question;
  const rtl = _translation.default.dir() === 'rtl';
  const {
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const ref = (0, _react.useRef)(null);
  const addMandatoryRef = (0, _surveyPage.useAddMandatoryRef)();
  (0, _react.useEffect)(() => {
    if (ref.current) {
      addMandatoryRef(questionId, ref.current);
    }
  }, [addMandatoryRef, questionId]);
  let html = mandatory || optional ? (0, _htmlHelper.htmlMandatory)((0, _htmlHelper.htmlTrim)((0, _htmlHelper.toHtml)(questionTitle))) : (0, _htmlHelper.htmlTrim)((0, _htmlHelper.toHtml)(questionTitle));
  html = colorScheme === _theme.COLOR_SCHEMES.dark && (type === 'nps' || respondentTracker) ? (0, _htmlHelper.toWhite)(html) : html;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    ref: ref,
    style: [styles.horizontal, style, rtl && _styles.default.flexRowReverse]
  }, /*#__PURE__*/_react.default.createElement(_HtmlText.default, {
    html: html,
    accessibilityLabel: `question_${fontColor}_${questionTitle}`
  }), subTitleMessage ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: rtl && _styles.default.flexRowReverse
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.subTitle
  }, subTitleMessage)) : null, /*#__PURE__*/_react.default.createElement(_ClassicQuestionWarningMessage.default
  // forgot message has higher priority than custom invalid message
  , {
    message: forgot ? mandatoryErrorMessage : invalidMessage
  }));
};
var _default = exports.default = ClassicMandatoryTitle;
const styles = _reactNative.StyleSheet.create({
  hint: {
    color: _styles.Colors.mandatoryRed,
    fontSize: 18
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 2,
    textAlignVertical: 'center',
    alignSelf: 'center'
  },
  subTitle: {
    marginTop: 8,
    color: _styles.Colors.border
  }
});
//# sourceMappingURL=ClassicMandatoryTitle.js.map