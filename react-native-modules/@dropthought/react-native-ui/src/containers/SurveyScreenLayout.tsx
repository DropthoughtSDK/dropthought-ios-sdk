import React, { useMemo } from 'react';
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
// @ts-ignore
import { KeyboardAvoidingScrollView } from '../components/KeyboardAvoidingView';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { THEME_OPTION, useTheme } from '../contexts/theme';
import type { Survey, SurveyFeedback, Page, Feedback } from '../data';
import { questionFeedbackValidator } from '../utils/data';
// @ts-ignore
import { nextPage } from '../dt-common';
// @ts-ignore
import type { onUploadType } from '../dt-common';
import {
  useFeedbackDispatch,
  useFeedbackState,
  removeSingleFeedback,
} from '../contexts/feedback';
import { useSurveyPageContext } from '../contexts/survey-page';
import SurveyHeader from './SurveyHeader';
import fileUploadValidator from '../validators/fileUploadValidator';
import type { ThemeContextProps } from '../contexts/theme/ThemeContext';
import { useDisplayLogic } from '../hooks/displaylogic';

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
  feedbackState: FeedbackReducerState,
  theme: ThemeContextProps,
  dictionary: {
    [questionId: string]: boolean;
  }
): string | undefined => {
  let invalidQuestionId;
  for (const question of page.questions) {
    const feedback = feedbackState.feedbacksMap[question.questionId];
    // this line is for handle mandatory question if the question is been displayed.
    if (dictionary[question.questionId]) {
      if (
        (question.mandatory && feedback === undefined) ||
        (question.optional && feedback === undefined)
      ) {
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
const getFeedbacks = (feedbackState: FeedbackReducerState): Feedback[] => {
  return feedbackState.answeredQuestionIds.map(
    (qid: string) => feedbackState.feedbacksMap[qid]
  );
};

export interface PollResult {
  [key: string]: number;
}

type PollChoiceData = {
  questionId: string;
  choice?: string;
  isOther: boolean;
};

export type onPostPollChoiceType = (
  data: PollChoiceData
) => Promise<PollResult | undefined>;

interface Props {
  pageIndex: number; //current page index (start from 0)
  survey: Survey;
  onClose?: () => void;
  onSubmit: (surveyFeedback: SurveyFeedback) => void;
  onNextPage: (nextPageIndex: number) => void;
  onPrevPage?: () => void;
  onPageEnter?: () => void;
  onPageLeave?: () => void;
  onFeedback?: () => void;
  onUpload?: onUploadType;
  isUploading?: boolean;
  onPostPollChoice?: onPostPollChoiceType;
  isPostingPollChoice?: boolean;
  SurveyProgressBar?: any;
  surveyProgressBarPosition?: number;
  SurveyPageIndicator?: any;
  preview: boolean;
}

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
  preview,
}: Props) => {
  // need add filter survey for new EUX skiplogic and displaylogic here
  const theme = useTheme();
  const { hexCode, themeOption, backgroundColor, colorScheme } = theme;
  const isClassicTheme =
    themeOption === THEME_OPTION.CLASSIC ||
    themeOption === THEME_OPTION.BIJLIRIDE;

  const scrollViewRef = React.useRef<RNScrollView>(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  const currentPage = survey.pages[pageIndex];
  const singleQuestion = currentPage?.questions[0];

  // when validation start, set the state
  const [validationStarted, setValidationStarted] = React.useState(false);
  const onValidationStartHandler = React.useCallback(() => {
    setValidationStarted(true);
  }, []);

  // when validation failed, scroll to the ref
  const onValidationFailedHandler = React.useCallback((targetRef: View) => {
    if (targetRef && scrollViewRef.current) {
      targetRef.measureLayout(
        // @ts-ignore
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
    const isValid = validatePrevPageFeedbacks();
    if (isValid) {
      onPrevPage && onPrevPage();
    }
  };

  const feedbackState = useFeedbackState();
  const { mandatoryQuestionTitleRefs } = useSurveyPageContext();

  const feedbackDispatch = useFeedbackDispatch();
  const removeSingleFeedbackHandler = (questionId: string) => {
    removeSingleFeedback(feedbackDispatch, questionId);
  };
  const feedbacksMap = feedbackState?.feedbacksMap;
  const feedbacks = React.useMemo(
    () => (feedbacksMap ? Object.values(feedbacksMap) : []),
    [feedbacksMap]
  );
  const { displayDictionary, getDisplayStatusForPage } = useDisplayLogic({
    survey,
    feedbacks,
    removeSingleFeedbackHandler,
  });

  const surveyId = survey.surveyId;

  // check if feedbacks are valid
  const validatePageFeedbacks = React.useCallback(() => {
    if (currentPage) {
      onValidationStartHandler();
      const invalidQuestionId = firstInvalidQuestionId(
        currentPage,
        feedbackState,
        theme,
        displayDictionary
      );
      // if there's an invalid question, call onValidationFailed
      if (invalidQuestionId)
        onValidationFailedHandler(
          mandatoryQuestionTitleRefs[invalidQuestionId]
        );
      return !invalidQuestionId;
    } else {
      return true;
    }
  }, [
    onValidationStartHandler,
    displayDictionary,
    currentPage,
    feedbackState,
    onValidationFailedHandler,
    mandatoryQuestionTitleRefs,
    theme,
  ]);

  const validatePrevPageFeedbacks = React.useCallback(() => {
    if (currentPage) {
      for (const question of currentPage.questions) {
        const feedback = feedbackState.feedbacksMap[question.questionId];
        const allFeedbackIsUploadedValidator =
          question.type === 'file' && feedback && feedback.answers
            ? fileUploadValidator(question, feedback, colorScheme)
            : true;
        if (!allFeedbackIsUploadedValidator)
          return allFeedbackIsUploadedValidator;
      }
    }
    return true;
  }, [currentPage, feedbackState, colorScheme]);

  const nextPageIndex = useMemo(() => {
    // calculate by skip logic
    let next: number = nextPage(
      pageIndex,
      getFeedbacks(feedbackState),
      survey,
      themeOption
    );
    // calculate by display logic
    const getNextValidPageIndexByDisplayLogic = (): number => {
      const page = survey.pages[next];
      if (page && next >= 0) {
        const displayStatus = getDisplayStatusForPage(page);
        if (displayStatus.every((value) => value === false)) {
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
          feedbacks: getFeedbacks(feedbackState),
        });
      } else {
        onNextPage(nextPageIndex);
      }
    }
  }, [
    validatePageFeedbacks,
    feedbackState,
    onSubmit,
    surveyId,
    onNextPage,
    nextPageIndex,
  ]);

  const classicQuestions = currentPage?.questions.map((question) => {
    const allowToDisplay = displayDictionary[question.questionId];
    return allowToDisplay ? (
      <ClassicQuestionContainer
        key={question.questionId}
        mandatoryErrorMessage={survey.mandatoryErrorMessage}
        anonymous={survey.anonymous}
        question={question}
        survey={survey}
        validationStarted={validationStarted}
        themeColor={hexCode}
        onDragGrant={() => setScrollEnabled(false)}
        onDragEnd={() => setScrollEnabled(true)}
        onUpload={onUpload}
        isUploading={isUploading}
        onPostPollChoice={onPostPollChoice}
        isPostingPollChoice={isPostingPollChoice}
        preview={preview}
      />
    ) : null;
  });

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
          {classicQuestions}
          <ClassicSurveyFooter
            survey={survey}
            pageIndex={pageIndex}
            isLast={
              pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1
            }
            onPrevPage={onPrevPageHandler}
            onNextPage={onNextPageHandler}
          />
          {surveyProgressBarPosition ===
            SurveyProgressBarPosition.BelowBody && (
            <SurveyProgressBar displayDictionary={displayDictionary} />
          )}
        </View>
      </ScrollView>
      {surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom && (
        <SurveyProgressBar displayDictionary={displayDictionary} />
      )}
    </>
  );

  const onCloseHandler = () => {
    onClose && onClose();
  };

  // Can rename this if have better name
  const newLayout = singleQuestion && (
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
        mandatoryErrorMessage={survey.mandatoryErrorMessage}
        anonymous={survey.anonymous}
        question={singleQuestion}
        validationStarted={validationStarted}
        themeColor={hexCode}
        onClose={onCloseHandler}
        onPrevPage={onPrevPageHandler}
        onNextPage={onNextPageHandler}
        onUpload={onUpload}
        isUploading={isUploading}
        onPostPollChoice={onPostPollChoice}
        isPostingPollChoice={isPostingPollChoice}
        survey={survey}
        pageIndex={pageIndex}
        themeOption={themeOption}
        preview={preview}
        isLastPage={
          pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1
        }
      />
      {singleQuestion.type === 'rating' &&
      singleQuestion.subType === 'smiley' ? null : (
        <SurveyFooter
          submitSurvey={survey.submitSurvey}
          surveyColor={hexCode}
          isFirstPage={pageIndex === 0}
          isLastPage={
            pageIndex === survey.pageOrder.length - 1 || nextPageIndex === -1
          }
          onPrevPage={onPrevPageHandler}
          onNextPage={onNextPageHandler}
          backgroundColor={backgroundColor}
        />
      )}
    </>
  );

  return (
    <SurveyPageProvider>
      <View style={[GlobalStyle.flex1, { backgroundColor }]}>
        {isClassicTheme ? classicLayout : newLayout}
      </View>
    </SurveyPageProvider>
  );
};

export default SurveyScreenLayout;

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
