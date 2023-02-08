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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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