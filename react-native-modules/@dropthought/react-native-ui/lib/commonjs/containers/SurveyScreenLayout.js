"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SurveyProgressBarPosition = void 0;
var _react = _interopRequireWildcard(require("react"));
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
var _dtCommon = require("../dt-common");
var _feedback = require("../contexts/feedback");
var _SurveyHeader = _interopRequireDefault(require("./SurveyHeader"));
var _fileUploadValidator = _interopRequireDefault(require("../validators/fileUploadValidator"));
var _displaylogic = require("../hooks/displaylogic");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-ignore

// @ts-ignore

// @ts-ignore

const SurveyProgressBarPosition = exports.SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1
};
const ScrollView = _reactNative.Platform.OS === 'ios' ? _KeyboardAvoidingView.KeyboardAvoidingScrollView : _reactNative.ScrollView;
/**
 * check if the feedbacks of questions of the page is valid
 * returns the 1st invalid question id or undefined (means all valid)
 */
const firstInvalidQuestionId = (page, feedbackState, theme, dictionary) => {
  let invalidQuestionId;
  for (const question of page.questions) {
    const feedback = feedbackState.feedbacksMap[question.questionId];
    // this line is for handle mandatory question if the question is been displayed.
    if (dictionary[question.questionId]) {
      if (question.mandatory && feedback === undefined || question.optional && feedback === undefined) {
        invalidQuestionId = question.questionId;
        break;
      }
      if (feedback && !(0, _data.questionFeedbackValidator)(question, feedback, theme)) {
        invalidQuestionId = question.questionId;
        break;
      }
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
const SurveyScreenLayout = ({
  pageIndex = 0,
  survey,
  onClose,
  onPrevPage,
  onNextPage,
  onSubmit,
  onUpload,
  isUploading,
  onPostPollChoice,
  isPostingPollChoice,
  SurveyPageIndicator = _SurveyPageIndicator.default,
  SurveyProgressBar = _SurveyProgressBar.default,
  surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom,
  preview
}) => {
  // need add filter survey for new EUX skiplogic and displaylogic here
  const theme = (0, _theme.useTheme)();
  const {
    hexCode,
    themeOption,
    backgroundColor,
    colorScheme
  } = theme;
  const isClassicTheme = themeOption === _theme.THEME_OPTION.CLASSIC || themeOption === _theme.THEME_OPTION.BIJLIRIDE;
  const scrollViewRef = _react.default.useRef(null);
  const [scrollEnabled, setScrollEnabled] = _react.default.useState(true);
  const currentPage = survey.pages[pageIndex];
  const singleQuestion = currentPage === null || currentPage === void 0 ? void 0 : currentPage.questions[0];

  // when validation start, set the state
  const [validationStarted, setValidationStarted] = _react.default.useState(false);
  const onValidationStartHandler = _react.default.useCallback(() => {
    setValidationStarted(true);
  }, []);

  // when validation failed, scroll to the ref
  const onValidationFailedHandler = _react.default.useCallback(targetRef => {
    if (targetRef && scrollViewRef.current) {
      targetRef.measureLayout(
      // @ts-ignore
      (0, _reactNative.findNodeHandle)(scrollViewRef.current), (_x, y) => {
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
    const isValid = validatePrevPageFeedbacks();
    if (isValid) {
      onPrevPage && onPrevPage();
    }
  };
  const feedbackState = (0, _feedback.useFeedbackState)();
  const {
    mandatoryQuestionTitleRefs
  } = (0, _surveyPage.useSurveyPageContext)();
  const feedbackDispatch = (0, _feedback.useFeedbackDispatch)();
  const removeSingleFeedbackHandler = questionId => {
    (0, _feedback.removeSingleFeedback)(feedbackDispatch, questionId);
  };
  const feedbacksMap = feedbackState === null || feedbackState === void 0 ? void 0 : feedbackState.feedbacksMap;
  const feedbacks = _react.default.useMemo(() => feedbacksMap ? Object.values(feedbacksMap) : [], [feedbacksMap]);
  const {
    displayDictionary,
    getDisplayStatusForPage
  } = (0, _displaylogic.useDisplayLogic)({
    survey,
    feedbacks,
    removeSingleFeedbackHandler
  });
  const surveyId = survey.surveyId;

  // check if feedbacks are valid
  const validatePageFeedbacks = _react.default.useCallback(() => {
    if (currentPage) {
      onValidationStartHandler();
      const invalidQuestionId = firstInvalidQuestionId(currentPage, feedbackState, theme, displayDictionary);
      // if there's an invalid question, call onValidationFailed
      if (invalidQuestionId) onValidationFailedHandler(mandatoryQuestionTitleRefs[invalidQuestionId]);
      return !invalidQuestionId;
    } else {
      return true;
    }
  }, [onValidationStartHandler, displayDictionary, currentPage, feedbackState, onValidationFailedHandler, mandatoryQuestionTitleRefs, theme]);
  const validatePrevPageFeedbacks = _react.default.useCallback(() => {
    if (currentPage) {
      for (const question of currentPage.questions) {
        const feedback = feedbackState.feedbacksMap[question.questionId];
        const allFeedbackIsUploadedValidator = question.type === 'file' && feedback && feedback.answers ? (0, _fileUploadValidator.default)(question, feedback, colorScheme) : true;
        if (!allFeedbackIsUploadedValidator) return allFeedbackIsUploadedValidator;
      }
    }
    return true;
  }, [currentPage, feedbackState, colorScheme]);
  const nextPageIndex = (0, _react.useMemo)(() => {
    // calculate by skip logic
    let next = (0, _dtCommon.nextPage)(pageIndex, getFeedbacks(feedbackState), survey, themeOption);
    // calculate by display logic
    const getNextValidPageIndexByDisplayLogic = () => {
      const page = survey.pages[next];
      if (page && next >= 0) {
        const displayStatus = getDisplayStatusForPage(page);
        if (displayStatus.every(value => value === false)) {
          next += 1;
          if (next < survey.pages.length) {
            return getNextValidPageIndexByDisplayLogic();
          } else {
            return -1;
          }
        }
      }
      return next;
    };
    next = getNextValidPageIndexByDisplayLogic();
    return next;
  }, [getDisplayStatusForPage, feedbackState, survey, themeOption, pageIndex]);
  const onNextPageHandler = _react.default.useCallback(() => {
    const isValid = validatePageFeedbacks();
    if (isValid) {
      if (nextPageIndex === -1) {
        onSubmit({
          surveyId,
          feedbacks: getFeedbacks(feedbackState)
        });
      } else {
        onNextPage(nextPageIndex);
      }
    }
  }, [validatePageFeedbacks, feedbackState, onSubmit, surveyId, onNextPage, nextPageIndex]);
  const classicQuestions = currentPage === null || currentPage === void 0 ? void 0 : currentPage.questions.map(question => {
    const allowToDisplay = displayDictionary[question.questionId];
    return allowToDisplay ? /*#__PURE__*/_react.default.createElement(_ClassicQuestionContainer.default, {
      key: question.questionId,
      mandatoryErrorMessage: survey.mandatoryErrorMessage,
      anonymous: survey.anonymous,
      question: question,
      survey: survey,
      validationStarted: validationStarted,
      themeColor: hexCode,
      onDragGrant: () => setScrollEnabled(false),
      onDragEnd: () => setScrollEnabled(true),
      onUpload: onUpload,
      isUploading: isUploading,
      onPostPollChoice: onPostPollChoice,
      isPostingPollChoice: isPostingPollChoice,
      preview: preview
    }) : null;
  });
  const classicLayout = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(SurveyPageIndicator, {
    pageIndex: pageIndex,
    survey: survey,
    rtl: _translation.default.dir() === 'rtl'
  }), /*#__PURE__*/_react.default.createElement(ScrollView
  // @ts-ignore
  , {
    ref: scrollViewRef,
    style: [styles.scrollView, {
      backgroundColor
    }],
    extraAvoidingSpace: 30,
    contentContainerStyle: styles.scrollViewContentContainer,
    scrollEnabled: scrollEnabled
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bodyContent
  }, classicQuestions, /*#__PURE__*/_react.default.createElement(_ClassicSurveyFooter.default, {
    survey: survey,
    pageIndex: pageIndex,
    isLast: pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler
  }), surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody && /*#__PURE__*/_react.default.createElement(SurveyProgressBar, {
    displayDictionary: displayDictionary
  }))), surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom && /*#__PURE__*/_react.default.createElement(SurveyProgressBar, {
    displayDictionary: displayDictionary
  }));
  const onCloseHandler = () => {
    onClose && onClose();
  };

  // Can rename this if have better name
  const newLayout = singleQuestion && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/_react.default.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onCloseHandler
  }), /*#__PURE__*/_react.default.createElement(_QuestionContainer.default, {
    key: singleQuestion.questionId,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    anonymous: survey.anonymous,
    question: singleQuestion,
    validationStarted: validationStarted,
    themeColor: hexCode,
    onClose: onCloseHandler,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler,
    onUpload: onUpload,
    isUploading: isUploading,
    onPostPollChoice: onPostPollChoice,
    isPostingPollChoice: isPostingPollChoice,
    survey: survey,
    pageIndex: pageIndex,
    themeOption: themeOption,
    preview: preview,
    isLastPage: pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1
  }), singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/_react.default.createElement(_SurveyFooter.default, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler,
    backgroundColor: backgroundColor
  }));
  return /*#__PURE__*/_react.default.createElement(_surveyPage.SurveyPageProvider, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.flex1, {
      backgroundColor
    }]
  }, isClassicTheme ? classicLayout : newLayout));
};
var _default = exports.default = SurveyScreenLayout;
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