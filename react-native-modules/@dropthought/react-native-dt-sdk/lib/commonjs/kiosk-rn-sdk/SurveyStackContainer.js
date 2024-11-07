"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeUi = require("@dropthought/react-native-ui");
var _SurveyContext = require("./contexts/survey/SurveyContext");
var _SurveyStack = _interopRequireDefault(require("./navigation/SurveyStack"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @param {{preview: boolean}} param0
 */
const SurveyStackContainer = ({
  preview = false
}) => {
  const {
    colorScheme
  } = (0, _reactNativeUi.useTheme)();
  const survey = (0, _SurveyContext.useSurvey)();
  const themeColor = survey.surveyProperty.hexCode;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.StatusBar, {
    backgroundColor: themeColor,
    barStyle: colorScheme === _reactNativeUi.COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
  }), /*#__PURE__*/React.createElement(_SurveyStack.default, {
    preview: preview
  }));
};
var _default = exports.default = SurveyStackContainer;
//# sourceMappingURL=SurveyStackContainer.js.map