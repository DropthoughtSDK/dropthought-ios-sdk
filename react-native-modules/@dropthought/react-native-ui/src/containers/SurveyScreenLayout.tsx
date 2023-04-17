import * as React from 'react';
import {
  ScrollView as RNScrollView,
  StyleSheet,
  Platform,
  View,
  findNodeHandle,
} from 'react-native';

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
import type { Survey, SurveyFeedback, Page, Feedback } from 'src/data';
import { questionFeedbackValidator, nextPage } from '../utils/data';
import { useFeedbackState } from '../contexts/feedback';
import { useSurveyPageContext } from '../contexts/survey-page';
import SurveyHeader from './SurveyHeader';

export const SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1,
};

const ScrollView =
  Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

type FeedbackReducerState = any;
/**
 * check if the feedbacks of questions of the page is valid
 * returns the 1st invalid question id or undefined (means all valid)
 */
const firstInvalidQuestionId = (
  page: Page,
  feedbackState: FeedbackReducerState
): string | undefined => {
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
const getFeedbacks = (feedbackState: FeedbackReducerState): Feedback[] => {
  return feedbackState.answeredQuestionIds.map(
    (qid: string) => feedbackState.feedbacksMap[qid]
  );
};

type Props = {
  pageIndex: number; //current page index (start from 0)
  survey: Survey;
  onClose?: () => void;
  onSubmit: (surveyFeedback: SurveyFeedback) => void;
  onNextPage: (nextPageIndex: number) => void;
  onPrevPage?: () => void;
  onPageEnter?: () => void;
  onPageLeave?: () => void;
  onFeedback?: () => void;
  SurveyProgressBar?: any;
  surveyProgressBarPosition?: number;
  SurveyPageIndicator?: any;
};

const SurveyScreenLayout = (props: Props) => {
  const { themeOption, backgroundColor } = useTheme();
  const {
    pageIndex = 0,
    survey,
    onClose,
    onPrevPage,
    onNextPage,
    onSubmit,
    SurveyPageIndicator = DefaultSurveyPageIndicator,
    SurveyProgressBar = DefaultSurveyProgressBar,
    surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom,
  } = props;
  const scrollViewRef = React.useRef<RNScrollView>(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  const questions = survey.pages[pageIndex].questions.map((question) => {
    return (
      <ClassicQuestionContainer
        key={question.questionId}
        anonymous={survey.anonymous}
        question={question}
        validationStarted={validationStarted}
        themeColor={survey.surveyProperty.hexCode}
        onDragStart={() => {
          setScrollEnabled(false);
        }}
        onDragEnd={() => {
          setScrollEnabled(true);
        }}
      />
    );
  });

  const surveyProgressBar = (
    <SurveyProgressBar
      survey={survey}
      pageIndex={pageIndex}
      rtl={i18n.dir() === 'rtl'}
    />
  );

  const singleQuestion = survey.pages[pageIndex].questions[0];

  // when validation start, set the state
  const [validationStarted, setValidationStarted] = React.useState(false);
  const onValidationStartHandler = React.useCallback(() => {
    setValidationStarted(true);
  }, []);

  // when validation failed, scroll to the ref
  const onValidationFailedHandler = React.useCallback((_, targetReg) => {
    if (targetReg && scrollViewRef.current) {
      targetReg.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (_x: number, y: number) => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              x: 0,
              y: y,
              animated: true,
            });
          }
        }
      );
    }
  }, []);

  const onPrevPageHandler = () => {
    onPrevPage && onPrevPage();
  };

  const feedbackState = useFeedbackState();
  const { mandatoryQuestionTitleRefs } = useSurveyPageContext();
  const currentPage = survey.pages[pageIndex];
  const surveyId = survey.surveyId;

  // check if feedbacks are valid
  const validatePageFeedbacks = React.useCallback(() => {
    onValidationStartHandler();
    const invalidQuestionId = firstInvalidQuestionId(
      currentPage,
      feedbackState
    );
    // if there's an invalid question, call onValidationFailed
    if (invalidQuestionId)
      onValidationFailedHandler(
        invalidQuestionId,
        mandatoryQuestionTitleRefs[invalidQuestionId]
      );
    return !invalidQuestionId;
  }, [
    onValidationStartHandler,
    currentPage,
    feedbackState,
    onValidationFailedHandler,
    mandatoryQuestionTitleRefs,
  ]);

  const onNextPageHandler = React.useCallback(() => {
    const isValid = validatePageFeedbacks();
    if (isValid) {
      const nextPageIndex = nextPage(
        pageIndex,
        currentPage.pageId,
        feedbackState.feedbacksMap,
        survey
      );
      if (nextPageIndex === -1) {
        onSubmit({
          surveyId,
          feedbacks: getFeedbacks(feedbackState),
        });
      } else {
        onNextPage(nextPageIndex);
      }
    }
  }, [
    validatePageFeedbacks,
    pageIndex,
    currentPage.pageId,
    feedbackState,
    survey,
    onSubmit,
    onNextPage,
    surveyId,
  ]);

  const classicLayout = (
    <>
      <SurveyPageIndicator
        pageIndex={pageIndex}
        survey={survey}
        rtl={i18n.dir() === 'rtl'}
      />
      {/* @ts-ignore */}
      <ScrollView
        // @ts-ignore
        ref={scrollViewRef}
        style={[styles.scrollView, { backgroundColor }]}
        extraAvoidingSpace={30}
        contentContainerStyle={styles.scrollViewContentContainer}
        scrollEnabled={scrollEnabled}
      >
        <View style={styles.bodyContent}>
          {questions}
          <ClassicSurveyFooter
            survey={survey}
            pageIndex={pageIndex}
            onPrevPage={onPrevPageHandler}
            onNextPage={onNextPageHandler}
          />
          {surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody &&
            surveyProgressBar}
        </View>
      </ScrollView>
      {surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom &&
        surveyProgressBar}
    </>
  );

  const onCloseHandler = () => {
    onClose && onClose();
  };

  // Can rename this if have better name
  const newLayout = (
    <>
      {singleQuestion.type === 'rating' &&
      singleQuestion.subType === 'smiley' ? null : (
        <SurveyHeader
          survey={survey}
          pageIndex={pageIndex}
          backgroundColor={backgroundColor}
          onClose={onCloseHandler}
        />
      )}
      <QuestionContainer
        key={singleQuestion.questionId}
        anonymous={survey.anonymous}
        question={singleQuestion}
        validationStarted={validationStarted}
        themeColor={survey.surveyProperty.hexCode}
        onClose={onCloseHandler}
        onPrevPage={onPrevPageHandler}
        onNextPage={onNextPageHandler}
        survey={survey}
        pageIndex={pageIndex}
        themeOption={themeOption}
      />
      {singleQuestion.type === 'rating' &&
      singleQuestion.subType === 'smiley' ? null : (
        <SurveyFooter
          surveyColor={survey.surveyProperty.hexCode}
          isFirstPage={pageIndex === 0}
          isLastPage={pageIndex === survey.pageOrder.length - 1}
          onPrevPage={onPrevPageHandler}
          onNextPage={onNextPageHandler}
          backgroundColor={backgroundColor}
        />
      )}
    </>
  );

  return (
    <View style={[GlobalStyle.flex1, { backgroundColor }]}>
      {themeOption === THEME_OPTION.CLASSIC ? classicLayout : newLayout}
    </View>
  );
};

const SurveyScreenLayoutWrapper = (props: Props) => {
  return (
    <SurveyPageProvider>
      <SurveyScreenLayout {...props} />
    </SurveyPageProvider>
  );
};

export default SurveyScreenLayoutWrapper;

const noop = () => undefined;
SurveyScreenLayout.defaultProps = {
  pageIndex: 0,
  onSubmit: noop,
  onNextPage: noop,
  onPrevPage: noop,
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 30,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 30,
  },

  // where the questions and submit/page buttons go
  bodyContent: {
    width: '100%',
    flex: 1,
    maxWidth: 648,
  },
});
