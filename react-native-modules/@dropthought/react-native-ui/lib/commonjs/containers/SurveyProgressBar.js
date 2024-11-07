"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _hooks = require("@react-native-community/hooks");
var _ClassicProgressBar = _interopRequireDefault(require("../components/ClassicProgressBar"));
var _feedback = require("../contexts/feedback");
var _styles = require("../styles");
var _theme = require("../contexts/theme");
var _translation = _interopRequireDefault(require("../translation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore

const numValidFeedbacks = ({
  answeredQuestionIds,
  feedbacksMap
}) => {
  return answeredQuestionIds.filter(qid => {
    const feedback = feedbacksMap[qid];

    // if no answers or 0 length, filter out
    if (!feedback || !feedback.answers || !feedback.answers.length) {
      return false;
    }

    // a special case: answers: [""], should also consider as invalid
    const answer = feedback.answers[0];
    if (typeof answer === 'string' && !answer.length) {
      return false;
    }
    return true;
  }).length;
};
const isAndroid = _reactNative.Platform.OS === 'android';
const SurveyProgressBar = ({
  displayDictionary
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const feedbackState = (0, _feedback.useFeedbackState)();
  const {
    hexCode
  } = (0, _theme.useTheme)();
  const themeColor = hexCode;
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    keyboardShown
  } = (0, _hooks.useKeyboard)();
  const insetsBottom =
  // if it is android, and the insets bottom is not normal,
  // maybe it is because the keyboard is showed, don't use this insets
  isAndroid && insets.bottom >= 100 ? 0 : insets.bottom;
  const containerStyle = _react.default.useMemo(() => [styles.container, {
    backgroundColor: (0, _styles.opacity10)(themeColor),
    paddingBottom: insetsBottom || 15
  }], [insetsBottom, themeColor]);

  // hide this bar when it is android and keyboard is shown
  if (isAndroid && keyboardShown) return null;
  const maxValue = Object.values(displayDictionary).filter(item => item === true).length;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_ClassicProgressBar.default, {
    value: numValidFeedbacks(feedbackState),
    maxValue: maxValue,
    themeColor: themeColor,
    rtl: rtl
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    width: '100%'
  }
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(SurveyProgressBar);
//# sourceMappingURL=SurveyProgressBar.js.map