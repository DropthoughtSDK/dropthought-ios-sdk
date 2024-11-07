import React, { useMemo } from 'react';
import { ScrollView as RNScrollView, StyleSheet, Platform, View, findNodeHandle } from 'react-native';
import { SurveyPageProvider } from '../contexts/survey-page';
import ClassicQuestionContainer from './ClassicQuestionContainer';
import QuestionContainer from './QuestionContainer';
import DefaultSurveyProgressBar from './SurveyProgressBar';
import ClassicSurveyFooter from './ClassicSurveyFooter';
import SurveyFooter from './SurveyFooter';
import DefaultSurveyPageIndicator from '../components/SurveyPageIndicator';
// @ts-ignore
import { KeyboardAvoidingScrollView } from '../components/KeyboardAvoidingView';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { THEME_OPTION, useTheme } from '../contexts/theme';
import { questionFeedbackValidator } from '../utils/data';
// @ts-ignore
import { nextPage } from '../dt-common';
// @ts-ignore

import { useFeedbackDispatch, useFeedbackState, removeSingleFeedback } from '../contexts/feedback';
import { useSurveyPageContext } from '../contexts/survey-page';
import SurveyHeader from './SurveyHeader';
import fileUploadValidator from '../validators/fileUploadValidator';
import { useDisplayLogic } from '../hooks/displaylogic';
export const SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1
};
const ScrollView = Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;
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
      if (feedback && !questionFeedbackValidator(question, feedback, theme)) {
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
  SurveyPageIndicator = DefaultSurveyPageIndicator,
  SurveyProgressBar = DefaultSurveyProgressBar,
  surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom,
  preview
}) => {
  // need add filter survey for new EUX skiplogic and displaylogic here
  const theme = useTheme();
  const {
    hexCode,
    themeOption,
    backgroundColor,
    colorScheme
  } = theme;
  const isClassicTheme = themeOption === THEME_OPTION.CLASSIC || themeOption === THEME_OPTION.BIJLIRIDE;
  const scrollViewRef = React.useRef(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const currentPage = survey.pages[pageIndex];
  const singleQuestion = currentPage === null || currentPage === void 0 ? void 0 : currentPage.questions[0];

  // when validation start, set the state
  const [validationStarted, setValidationStarted] = React.useState(false);
  const onValidationStartHandler = React.useCallback(() => {
    setValidationStarted(true);
  }, []);

  // when validation failed, scroll to the ref
  const onValidationFailedHandler = React.useCallback(targetRef => {
    if (targetRef && scrollViewRef.current) {
      targetRef.measureLayout(
      // @ts-ignore
      findNodeHandle(scrollViewRef.current), (_x, y) => {
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
  const feedbackState = useFeedbackState();
  const {
    mandatoryQuestionTitleRefs
  } = useSurveyPageContext();
  const feedbackDispatch = useFeedbackDispatch();
  const removeSingleFeedbackHandler = questionId => {
    removeSingleFeedback(feedbackDispatch, questionId);
  };
  const feedbacksMap = feedbackState === null || feedbackState === void 0 ? void 0 : feedbackState.feedbacksMap;
  const feedbacks = React.useMemo(() => feedbacksMap ? Object.values(feedbacksMap) : [], [feedbacksMap]);
  const {
    displayDictionary,
    getDisplayStatusForPage
  } = useDisplayLogic({
    survey,
    feedbacks,
    removeSingleFeedbackHandler
  });
  const surveyId = survey.surveyId;

  // check if feedbacks are valid
  const validatePageFeedbacks = React.useCallback(() => {
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
  const validatePrevPageFeedbacks = React.useCallback(() => {
    if (currentPage) {
      for (const question of currentPage.questions) {
        const feedback = feedbackState.feedbacksMap[question.questionId];
        const allFeedbackIsUploadedValidator = question.type === 'file' && feedback && feedback.answers ? fileUploadValidator(question, feedback, colorScheme) : true;
        if (!allFeedbackIsUploadedValidator) return allFeedbackIsUploadedValidator;
      }
    }
    return true;
  }, [currentPage, feedbackState, colorScheme]);
  const nextPageIndex = useMemo(() => {
    // calculate by skip logic
    let next = nextPage(pageIndex, getFeedbacks(feedbackState), survey, themeOption);
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
  const onNextPageHandler = React.useCallback(() => {
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
    return allowToDisplay ? /*#__PURE__*/React.createElement(ClassicQuestionContainer, {
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
  const classicLayout = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SurveyPageIndicator, {
    pageIndex: pageIndex,
    survey: survey,
    rtl: i18n.dir() === 'rtl'
  }), /*#__PURE__*/React.createElement(ScrollView
  // @ts-ignore
  , {
    ref: scrollViewRef,
    style: [styles.scrollView, {
      backgroundColor
    }],
    extraAvoidingSpace: 30,
    contentContainerStyle: styles.scrollViewContentContainer,
    scrollEnabled: scrollEnabled
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.bodyContent
  }, classicQuestions, /*#__PURE__*/React.createElement(ClassicSurveyFooter, {
    survey: survey,
    pageIndex: pageIndex,
    isLast: pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler
  }), surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody && /*#__PURE__*/React.createElement(SurveyProgressBar, {
    displayDictionary: displayDictionary
  }))), surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom && /*#__PURE__*/React.createElement(SurveyProgressBar, {
    displayDictionary: displayDictionary
  }));
  const onCloseHandler = () => {
    onClose && onClose();
  };

  // Can rename this if have better name
  const newLayout = singleQuestion && /*#__PURE__*/React.createElement(React.Fragment, null, singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/React.createElement(SurveyHeader, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onCloseHandler
  }), /*#__PURE__*/React.createElement(QuestionContainer, {
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
  }), singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/React.createElement(SurveyFooter, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler,
    backgroundColor: backgroundColor
  }));
  return /*#__PURE__*/React.createElement(SurveyPageProvider, null, /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.flex1, {
      backgroundColor
    }]
  }, isClassicTheme ? classicLayout : newLayout));
};
export default SurveyScreenLayout;
const styles = StyleSheet.create({
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