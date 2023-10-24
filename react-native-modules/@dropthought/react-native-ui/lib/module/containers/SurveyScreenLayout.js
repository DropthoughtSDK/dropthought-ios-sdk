import * as React from 'react';
import { ScrollView as RNScrollView, StyleSheet, Platform, View, findNodeHandle } from 'react-native';
import { SurveyPageProvider } from '../contexts/survey-page';
import ClassicQuestionContainer from './ClassicQuestionContainer';
import QuestionContainer from './QuestionContainer';
import DefaultSurveyProgressBar from './SurveyProgressBar';
import ClassicSurveyFooter from './ClassicSurveyFooter';
import SurveyFooter from './SurveyFooter';
import DefaultSurveyPageIndicator from '../components/SurveyPageIndicator';
import { KeyboardAvoidingScrollView } from '../components/KeyboardAvoidingView';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { THEME_OPTION, useTheme } from '../contexts/theme';
import { questionFeedbackValidator } from '../utils/data';
import { nextPage } from '../dt-common';
import { useFeedbackState } from '../contexts/feedback';
import { useSurveyPageContext } from '../contexts/survey-page';
import SurveyHeader from './SurveyHeader';
export const SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1
};
const ScrollView = Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

/**
 * check if the feedbacks of questions of the page is valid
 * returns the 1st invalid question id or undefined (means all valid)
 */
const firstInvalidQuestionId = (page, feedbackState) => {
  let invalidQuestionId;

  for (const question of page.questions) {
    const feedback = feedbackState.feedbacksMap[question.questionId];

    if (question.mandatory && feedback === undefined || question.optional && feedback === undefined) {
      invalidQuestionId = question.questionId;
      break;
    }

    if (feedback && !questionFeedbackValidator(question, feedback)) {
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
  } = useTheme();
  const {
    pageIndex = 0,
    survey,
    onClose,
    onPrevPage,
    onNextPage,
    onSubmit,
    onUpload,
    isUploading,
    SurveyPageIndicator = DefaultSurveyPageIndicator,
    SurveyProgressBar = DefaultSurveyProgressBar,
    surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom
  } = props;
  const scrollViewRef = React.useRef(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const surveyProgressBar = /*#__PURE__*/React.createElement(SurveyProgressBar, {
    survey: survey,
    pageIndex: pageIndex,
    rtl: i18n.dir() === 'rtl'
  });
  const singleQuestion = survey.pages[pageIndex].questions[0]; // when validation start, set the state

  const [validationStarted, setValidationStarted] = React.useState(false);
  const onValidationStartHandler = React.useCallback(() => {
    setValidationStarted(true);
  }, []); // when validation failed, scroll to the ref

  const onValidationFailedHandler = React.useCallback((_, targetReg) => {
    if (targetReg && scrollViewRef.current) {
      targetReg.measureLayout(findNodeHandle(scrollViewRef.current), (_x, y) => {
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

  const feedbackState = useFeedbackState();
  const {
    mandatoryQuestionTitleRefs
  } = useSurveyPageContext();
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
      const nextPageIndex = nextPage(pageIndex, getFeedbacks(feedbackState), survey);

      if (nextPageIndex === -1) {
        onSubmit({
          surveyId,
          feedbacks: getFeedbacks(feedbackState)
        });
      } else {
        onNextPage(nextPageIndex);
      }
    }
  }, [validatePageFeedbacks, pageIndex, feedbackState, survey, onSubmit, onNextPage, surveyId]);
  const classicQuestions = survey.pages[pageIndex].questions.map(question => {
    return /*#__PURE__*/React.createElement(ClassicQuestionContainer, {
      key: question.questionId,
      anonymous: survey.anonymous,
      question: question,
      validationStarted: validationStarted,
      themeColor: survey.surveyProperty.hexCode,
      onDragGrant: () => setScrollEnabled(false),
      onDragEnd: () => setScrollEnabled(true),
      onUpload: onUpload,
      isUploading: isUploading
    });
  });
  const classicLayout = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SurveyPageIndicator, {
    pageIndex: pageIndex,
    survey: survey,
    rtl: i18n.dir() === 'rtl'
  }), /*#__PURE__*/React.createElement(ScrollView // @ts-ignore
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
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler
  }), surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody && surveyProgressBar)), surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom && surveyProgressBar);

  const onCloseHandler = () => {
    onClose && onClose();
  }; // Can rename this if have better name


  const newLayout = /*#__PURE__*/React.createElement(React.Fragment, null, singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/React.createElement(SurveyHeader, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onCloseHandler
  }), /*#__PURE__*/React.createElement(QuestionContainer, {
    key: singleQuestion.questionId,
    anonymous: survey.anonymous,
    question: singleQuestion,
    validationStarted: validationStarted,
    themeColor: survey.surveyProperty.hexCode,
    onClose: onCloseHandler,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler,
    onUpload: onUpload,
    isUploading: isUploading,
    survey: survey,
    pageIndex: pageIndex,
    themeOption: themeOption
  }), singleQuestion.type === 'rating' && singleQuestion.subType === 'smiley' ? null : /*#__PURE__*/React.createElement(SurveyFooter, {
    surveyColor: survey.surveyProperty.hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPageHandler,
    onNextPage: onNextPageHandler,
    backgroundColor: backgroundColor
  }));
  return /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.flex1, {
      backgroundColor
    }]
  }, themeOption === THEME_OPTION.CLASSIC ? classicLayout : newLayout);
};

const SurveyScreenLayoutWrapper = props => {
  return /*#__PURE__*/React.createElement(SurveyPageProvider, null, /*#__PURE__*/React.createElement(SurveyScreenLayout, props));
};

export default SurveyScreenLayoutWrapper;

const noop = () => undefined;

SurveyScreenLayout.defaultProps = {
  pageIndex: 0,
  onSubmit: noop,
  onNextPage: noop,
  onPrevPage: noop
};
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