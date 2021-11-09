import * as React from 'react';
import {
  ScrollView as RNScrollView,
  StyleSheet,
  Platform,
  View,
  findNodeHandle,
} from 'react-native';

import { SurveyPageProvider } from '../contexts/survey-page';
import QuestionContainer from './QuestionContainer';
import DefaultSurveyProgressBar from './SurveyProgressBar';
import SurveyFooter from './SurveyFooter';
import DefaultSurveyPageIndicator from '../components/SurveyPageIndicator';
import { KeyboardAvoidingScrollView } from '../components/KeyboardAvoidingView';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';
import type { Survey, SurveyFeedback } from 'src/data';

export const SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1,
};

const ScrollView =
  Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

type Props = {
  pageIndex: number; //current page index (start from 0)
  survey: Survey;
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
  const { backgroundColor } = useTheme();
  const {
    pageIndex = 0,
    survey,
    SurveyPageIndicator = DefaultSurveyPageIndicator,
    SurveyProgressBar = DefaultSurveyProgressBar,
    surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom,
  } = props;
  const scrollViewRef = React.useRef<RNScrollView>(null);

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

  const questions = survey.pages[pageIndex].questions.map((question) => {
    return (
      <QuestionContainer
        key={question.questionId}
        anonymous={survey.anonymous}
        question={question}
        validationStarted={validationStarted}
        themeColor={survey.surveyProperty.hexCode}
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

  return (
    <View style={[GlobalStyle.flex1, { backgroundColor }]}>
      <SurveyPageIndicator
        pageIndex={pageIndex}
        survey={survey}
        rtl={i18n.dir() === 'rtl'}
      />
      {/* @ts-ignore */}
      <ScrollView
        ref={scrollViewRef}
        style={[styles.scrollView, { backgroundColor }]}
        extraAvoidingSpace={30}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <View style={styles.bodyContent}>
          {questions}
          {/* @ts-ignore */}
          <SurveyFooter
            {...props}
            survey={survey}
            onValidationFailed={onValidationFailedHandler}
            onValidationStart={onValidationStartHandler}
          />
          {surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody &&
            surveyProgressBar}
        </View>
      </ScrollView>
      {surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom &&
        surveyProgressBar}
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
