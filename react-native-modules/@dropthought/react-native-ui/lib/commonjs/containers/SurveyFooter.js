"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _data = require("../utils/data");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _Button = _interopRequireDefault(require("../components/Button"));

var _feedback = require("../contexts/feedback");

var _surveyPage = require("../contexts/survey-page");

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" is pressed,
 *     would check if the answers are valid, and then apply the Skip Logic, get the next page id, call props.onNextPage(nextPageIndex)
 *     or it would call props.onSubmit, when the rule says it should go to end
 * When "Submit" is pressed,
 *     would check if the answers are valid, and then call props.onSubmit
 *
 * when the validation process failed, call props.onValidationFailed
 */
const noop = () => undefined;

const DummyButton = ({
  width
}) => /*#__PURE__*/React.createElement(_reactNative.View, {
  style: {
    width
  }
});

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

const SurveyFooter = props => {
  const feedbackState = (0, _feedback.useFeedbackState)();
  const {
    mandatoryQuestionTitleRefs
  } = (0, _surveyPage.useSurveyPageContext)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const rtl = _translation.default.dir() === 'rtl';
  const {
    survey,
    pageIndex = 0,
    onPrevPage,
    onNextPage,
    onSubmit,
    onValidationStart = noop,
    onValidationFailed = noop
  } = props;
  const lastPage = pageIndex === survey.pageOrder.length - 1;
  const currentPage = survey.pages[pageIndex];
  const surveyId = survey.surveyId; // check if feedbacks are valid

  const validatePageFeedbacks = React.useCallback(() => {
    onValidationStart();
    const invalidQuestionId = firstInvalidQuestionId(currentPage, feedbackState); // if there's an invalid question, call onValidationFailed

    if (invalidQuestionId) onValidationFailed(invalidQuestionId, mandatoryQuestionTitleRefs[invalidQuestionId]);
    return !invalidQuestionId;
  }, [currentPage, feedbackState, mandatoryQuestionTitleRefs, onValidationStart, onValidationFailed]); // check if feedbacks are valid, apply the skip-logic rule, only call onNextPage when valid

  const onNextPressHandler = React.useCallback(() => {
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
  const onSubmitPressHandler = React.useCallback(() => {
    const isValid = validatePageFeedbacks();

    if (isValid) {
      onSubmit({
        surveyId,
        feedbacks: getFeedbacks(feedbackState)
      });
    }
  }, [onSubmit, validatePageFeedbacks, feedbackState, surveyId]);
  const onBackPressHandler = React.useCallback(() => {
    onPrevPage();
  }, [onPrevPage]); // why use a dummy button here? we use 'space-between' to layout the buttons

  let LeftButtonComponent = _Button.default;

  if (!pageIndex || pageIndex <= 0) {
    // @ts-ignore
    LeftButtonComponent = DummyButton;
  }

  const themeColor = props.survey.surveyProperty.hexCode;
  const btnWidth = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone ? 76 : 100;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, rtl && _styles.GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(LeftButtonComponent, {
    width: btnWidth,
    title: _translation.default.t('survey:survey-back'),
    color: themeColor,
    onPress: onBackPressHandler // @ts-ignore
    ,
    containerStyle: styles.leftBtnContainer
  }), /*#__PURE__*/React.createElement(_Button.default, {
    width: btnWidth,
    title: lastPage ? _translation.default.t('survey:survey-submit') : _translation.default.t('survey:survey-next'),
    color: themeColor,
    onPress: lastPage ? onSubmitPressHandler : onNextPressHandler // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }));
};

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    ..._styles.GlobalStyle.row,
    justifyContent: 'space-between',
    marginVertical: 30
  }
});

var _default = /*#__PURE__*/React.memo(SurveyFooter);

exports.default = _default;
//# sourceMappingURL=SurveyFooter.js.map