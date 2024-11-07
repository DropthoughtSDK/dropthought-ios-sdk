"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SDKEntry;
var React = _interopRequireWildcard(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _SurveyContext = require("./contexts/survey/SurveyContext");
var _CustomPropsContext = require("./contexts/custom-props/CustomPropsContext");
var _SurveyStackContainer = _interopRequireDefault(require("./SurveyStackContainer"));
var _FeedbackProvider = require("@dropthought/react-native-ui/src/contexts/feedback/FeedbackProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @param {SDKEntryProps} props
 */
function SDKEntry(props) {
  return /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, /*#__PURE__*/React.createElement(_FeedbackProvider.FeedbackProvider, null, /*#__PURE__*/React.createElement(_CustomPropsContext.CustomPropsContextProvider, props, /*#__PURE__*/React.createElement(_SurveyContext.SurveyContextProvider, props, /*#__PURE__*/React.createElement(_SurveyStackContainer.default, {
    preview: props.preview
  })))));
}

/**
 * @typedef {import('./SDKEntry').SDKEntryProps} SDKEntryProps
 */
//# sourceMappingURL=SDKEntry.js.map