"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SDKEntry;
var React = _interopRequireWildcard(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _survey = require("./contexts/survey");
var _customProps = require("./contexts/custom-props");
var _SurveyStackContainer = _interopRequireDefault(require("./SurveyStackContainer"));
var _feedback = require("@dropthought/react-native-ui/src/contexts/feedback");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/** @typedef {"system" | "light" | "dark"} ThemeType */

/**
 * @typedef {object} SDKEntryOwnProps
 * @property {string} apiKey
 * @property {string=} visibilityId
 * @property {string=} surveyId
 * @property {string=} defaultLanguage if not provided, default is "en"
 * @property {string=} baseURL if not provided, default is ...
 * @property {()=>void=} onClose when the close icon is pressed in the header
 * @property {THEME_OPTION} themeOption
 * @property {ThemeType=} appearance
 * @property {string=} fontColor
 * @property {string=} backgroundColor
 * @property {string=} timezone
 * @property {boolean=} preview
 */

/**
 * @typedef {import('./contexts/custom-props').CustomProps & SDKEntryOwnProps} SDKEntryProps
 */

/**
 * @param {SDKEntryProps} props
 */
function SDKEntry(props) {
  return /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, /*#__PURE__*/React.createElement(_feedback.FeedbackProvider, null, /*#__PURE__*/React.createElement(_customProps.CustomPropsContextProvider, props, /*#__PURE__*/React.createElement(_survey.SurveyContextProvider, props, /*#__PURE__*/React.createElement(_SurveyStackContainer.default, {
    preview: props.preview
  })))));
}
//# sourceMappingURL=SDKEntry.js.map