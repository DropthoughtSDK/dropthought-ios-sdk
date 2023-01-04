"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _ramda = require("ramda");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _hooks = require("@react-native-community/hooks");

var _ClassicProgressBar = _interopRequireDefault(require("../components/ClassicProgressBar"));

var _feedback = require("../contexts/feedback");

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore
const numValidFeedbacks = ({
  answeredQuestionIds,
  feedbacksMap
}) => {
  return answeredQuestionIds.filter(qid => {
    const feedback = feedbacksMap[qid]; // if no answers or 0 length, filter out

    if (!feedback || !feedback.answers || !feedback.answers.length) {
      return false;
    } // a special case: answers: [""], should also consider as invalid


    const answer = feedback.answers[0];

    if (typeof answer === 'string' && !answer.length) {
      return false;
    }

    return true;
  }).length;
};

const numTotalQuestions = survey => {
  const questionNumOfPages = survey.pages.map(page => page.questions.length);
  return (0, _ramda.sum)(questionNumOfPages);
};

const isAndroid = _reactNative.Platform.OS === 'android';

const SurveyProgressBar = ({
  rtl,
  ...props
}) => {
  const feedbackState = (0, _feedback.useFeedbackState)();
  const themeColor = props.survey.surveyProperty.hexCode;
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    keyboardShown
  } = (0, _hooks.useKeyboard)();
  const insetsBottom = // if it is android, and the insets bottom is not normal,
  // maybe it is because the keyboard is showed, don't use this insets
  isAndroid && insets.bottom >= 100 ? 0 : insets.bottom;
  const containerStyle = React.useMemo(() => [styles.container, {
    backgroundColor: (0, _styles.opacity10)(themeColor),
    paddingBottom: insetsBottom || 15
  }], [insetsBottom, themeColor]); // hide this bar when it is android and keyboard is shown

  if (isAndroid && keyboardShown) return null;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(_ClassicProgressBar.default, {
    value: numValidFeedbacks(feedbackState),
    maxValue: numTotalQuestions(props.survey),
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

var _default = /*#__PURE__*/React.memo(SurveyProgressBar);

exports.default = _default;
//# sourceMappingURL=SurveyProgressBar.js.map