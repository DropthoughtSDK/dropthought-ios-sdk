"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SurveyProgressBarPosition = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _surveyPage = require("../contexts/survey-page");

var _ClassicQuestionContainer = _interopRequireDefault(require("./ClassicQuestionContainer"));

var _QuestionContainer = _interopRequireDefault(require("./QuestionContainer"));

var _SurveyProgressBar = _interopRequireDefault(require("./SurveyProgressBar"));

var _ClassicSurveyFooter = _interopRequireDefault(require("./ClassicSurveyFooter"));

var _SurveyFooter = _interopRequireDefault(require("./SurveyFooter"));

var _SurveyPageIndicator = _interopRequireDefault(require("../components/SurveyPageIndicator"));

var _KeyboardAvoidingView = require("../components/KeyboardAvoidingView");

var _styles = _interopRequireDefault(require("../styles"));

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

var _data = require("../utils/data");

var _feedback = require("../contexts/feedback");

var _SurveyHeader = _interopRequireDefault(require("./SurveyHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1
};
exports.SurveyProgressBarPosition = SurveyProgressBarPosition;
const ScrollView = _reactNative.Platform.OS === 'ios' ? _KeyboardAvoidingView.KeyboardAvoidingScrollView : _reactNative.ScrollView;

/**
 * check if the feedbacks of questions of the page is valid
 * returns the 1st invalid question id or undefined (means all valid)
 */
const firstInvalidQuestionId = (page, feedbackState) => {
  let invalidQuestionId;

  for (const question of page.questions) {
    const feedback = feedbackState.feedbacksMap[question.questionId];

    if (!(0, _data.questionFeedbackValidator)(question, feedback)) {
      invalidQuestionId = question.questionId;
      break;
    }
  }

  return invalidQuestionId;
};
/**
 * get feedbacks array from feedback state
 */


const getFeedbacks = feedbackState => {
  return feedbackState.answeredQuestionIds.map(qid => feedbackState.feedbacksMap[qid]);
};

const SurveyScreenLayout = props => {
  const {
    themeOption,
    backgroundColor
  } = (0, _theme.useTheme)();
  const {
    pageIndex = 0,
    survey,
    onClose,
    onPrevPage,
    onNextPage,
    onSubmit,
    SurveyPageIndicator = _SurveyPageIndicator.default,
    SurveyProgressBar = _SurveyProgressBar.default,
    surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom
  } = props;
  const scrollViewRef = React.useRef(null);
  const questions = survey.pages[pageIndex].questions.map(question => {
    return /*#__PURE__*/React.createElement(_ClassicQuestionContainer.default, {
      key: question.questionId,
      anonymous: survey.anonymous,
      question: question,
      validationStarted: validationStarted,
      themeColor: survey.surveyProperty.hexCode
    });
  });
  const surveyProgressBar = /*#__PURE__*/React.createElement(SurveyProgressBar, {
    survey: survey,
    pageIndex: pageIndex,
    rtl: _translation.default.dir() === 'rtl'
  });
  const singleQuestion = survey.pages[pageIndex].questions[0]; // when validation start, set the state

  const [validationStarted, setValidationStarted] = React.useState(false);
  const onValidationStartHandler = React.useCallback(() => {
    setValidationStarted(true);
  }, []); // when validation failed, scroll to the ref

  const onValidationFailedHandler = React.useCallback((_, targetReg) => {
    if (targetReg && scrollViewRef.current) {
      targetReg.measureLayout((0, _reactNative.findNodeHandle)(scrollViewRef.current), (_x, y) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: 0,
            y: y,
            animated: true
          });
        }
      });
    }
  }, []);

  const onPrevPageHandler = () => {
    onPrevPage && onPrevPage();
  };

  const feedbackState = (0, _feedback.useFeedbackState)();
  const {
    mandatoryQuestionTitleRefs
  } = (0, _surveyPage.useSurveyPageContext)();
  const currentPage = survey.pages[pageIndex];
  const surveyId = survey.surveyId; // check if feedbacks are valid

  const validatePageFeedbacks = React.useCallback(() => {
    onValidationStartHandler();
    const invalidQuestionId = firstInvalidQuestionId(currentPage, feedbackState); // if there's an invalid question, call onValidationFailed

    if (invalidQuestionId) onValidationFailedHandler(invalidQuestionId, mandatoryQuestionTitleRefs[invalidQuestionId]);
    return !invalidQuestionId;
  }, [onValidationStartHandler, currentPage, feedbackState, onValidationFailedHandler, mandatoryQuestionTitleRefs]);
  const onNextPageHandler = React.useCallback(() => {
    const isValid = validatePageFeedbacks();

    if (isValid) {
      const nextPageIndex = (0, _data.nextPage)(pageIndex, currentPage.pageId, feedbackState.feedbacksMap, survey);

      if (nextPageIndex === -1) {
        onSubmit({
          surveyId,
          feedbacks: getFeedbacks(feedbackState)
        });
      } else {
        onNextPage(nextPageIndex);
      }
    }
  }, [validatePageFeedbacks, pageIndex, currentPage.pageId, feedbackState, survey, onSubmit, onNextPage, surveyId]);
  const classicLayout = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SurveyPageIndicator, {
    pageIndex: pageIndex,
    survey: survey,
    rtl: _translation.default.dir() === 'rtl'
  }), /*#__PURE__*/React.createElement(ScrollView // @ts-ignore
  , {
    ref: scrollViewRef,
    style: [styles.scrollView, {
      backgroundColor
    }],
    extraAvoidingSpace: 30,
    contentContainerStyle: styles.scrollViewContentContainer
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.bodyContent
  }, questions, /*#__PURE__*/React.createElement(_ClassicSurveyFooter.default, {
    survey: survey,
    pageIndex: pageIndex,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler
  }), surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody && surveyProgressBar)), surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom && surveyProgressBar);

  const onCloseHandler = () => {
    onClose && onClose();
  }; // Can rename this if have better name


  const newLayout = /*#__PURE__*/React.createElement(React.Fragment, null, singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/React.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onCloseHandler
  }), /*#__PURE__*/React.createElement(_QuestionContainer.default, {
    key: singleQuestion.questionId,
    anonymous: survey.anonymous,
    question: singleQuestion,
    validationStarted: validationStarted,
    themeColor: survey.surveyProperty.hexCode,
    onClose: onCloseHandler,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler,
    survey: survey,
    pageIndex: pageIndex,
    themeOption: themeOption
  }), singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/React.createElement(_SurveyFooter.default, {
    surveyColor: survey.surveyProperty.hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler,
    backgroundColor: backgroundColor
  }));
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_styles.default.flex1, {
      backgroundColor
    }]
  }, themeOption === _theme.THEME_OPTION.CLASSIC ? classicLayout : newLayout);
};

const SurveyScreenLayoutWrapper = props => {
  return /*#__PURE__*/React.createElement(_surveyPage.SurveyPageProvider, null, /*#__PURE__*/React.createElement(SurveyScreenLayout, props));
};

var _default = SurveyScreenLayoutWrapper;
exports.default = _default;

const noop = () => undefined;

SurveyScreenLayout.defaultProps = {
  pageIndex: 0,
  onSubmit: noop,
  onNextPage: noop,
  onPrevPage: noop
};

const styles = _reactNative.StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 30
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 30
  },
  // where the questions and submit/page buttons go
  bodyContent: {
    width: '100%',
    flex: 1,
    maxWidth: 648
  }
});
//# sourceMappingURL=SurveyScreenLayout.js.map