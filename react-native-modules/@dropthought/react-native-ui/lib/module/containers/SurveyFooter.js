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
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { questionFeedbackValidator, nextPage } from '../utils/data';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import Button from '../components/Button';
import { useFeedbackState } from '../contexts/feedback';
import { useSurveyPageContext } from '../contexts/survey-page';
import { GlobalStyle } from '../styles';
import i18n from '../translation';

const noop = () => undefined;

const DummyButton = ({
  width
}) => /*#__PURE__*/React.createElement(View, {
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

    if (!questionFeedbackValidator(question, feedback)) {
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
  const feedbackState = useFeedbackState();
  const {
    mandatoryQuestionTitleRefs
  } = useSurveyPageContext();
  const dimensionWidthType = useDimensionWidthType();
  const rtl = i18n.dir() === 'rtl';
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
      const nextPageIndex = nextPage(pageIndex, currentPage.pageId, feedbackState.feedbacksMap, survey);

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

  let LeftButtonComponent = Button;

  if (!pageIndex || pageIndex <= 0) {
    // @ts-ignore
    LeftButtonComponent = DummyButton;
  }

  const themeColor = props.survey.surveyProperty.hexCode;
  const btnWidth = dimensionWidthType === DimensionWidthType.phone ? 76 : 100;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(LeftButtonComponent, {
    width: btnWidth,
    title: i18n.t('survey:survey-back'),
    color: themeColor,
    onPress: onBackPressHandler // @ts-ignore
    ,
    containerStyle: styles.leftBtnContainer
  }), /*#__PURE__*/React.createElement(Button, {
    width: btnWidth,
    title: lastPage ? i18n.t('survey:survey-submit') : i18n.t('survey:survey-next'),
    color: themeColor,
    onPress: lastPage ? onSubmitPressHandler : onNextPressHandler // @ts-ignore
    ,
    containerStyle: styles.rightBtnContainer
  }));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyle.row,
    justifyContent: 'space-between',
    marginVertical: 30
  }
});
export default /*#__PURE__*/React.memo(SurveyFooter);
//# sourceMappingURL=SurveyFooter.js.map