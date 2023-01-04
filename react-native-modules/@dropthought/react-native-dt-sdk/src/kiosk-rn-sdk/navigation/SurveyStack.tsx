import * as React from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import { isEmpty, isNil } from 'ramda';
import {
  PlaceholderImageTypes,
  PlaceholderScreen,
  i18n,
  SurveyScreenLayout,
  ActivityIndicatorMask,
} from '@dropthought/react-native-ui';
import { useAsync } from 'react-async';
import { useMetadata } from '../contexts/custom-props';
import StartScreen from '../screens/StartScreen';
import EndScreen from '../screens/EndScreen';
import FakeScreen from '../screens/FakeScreen';
import { useSurveyContext } from '../contexts/survey';
import { submitFeedback } from '../../lib/Feedback';
import ScreenWrapper from './ScreenWrapper';
import Header from './Header';
import { fromJSToAPIDateStr } from '../../lib/DateTimerParser';
import type { Survey } from '../../data';

type StackProps = {
  survey: Survey;
};

const noData = (a: any) => isNil(a) || isEmpty(a);

const Stack: React.FunctionComponent<StackProps> = ({ survey }) => {
  const { onClose } = useSurveyContext();
  const themeColor = survey.surveyProperty.hexCode;
  const [visiblePageIds, setVisiblePageIds] = React.useState([]);
  const [endScreenvisible, setEndScreenvisible] = React.useState(false);
  const [surveyFeedback, setSurveyFeedback] = React.useState(undefined);
  const [error, setError] = React.useState<Error | undefined>();
  const metadata = useMetadata();
  const { run, isPending: loading } = useAsync({
    deferFn: submitFeedback,
    onResolve: () => {
      setEndScreenvisible(true);
    },
    onReject: (rejectedError) => {
      setError(rejectedError);
      setEndScreenvisible(true);
    },
  });

  const handleNextPage = React.useCallback(
    (nextPageIndex) => {
      if (nextPageIndex < survey.pageOrder.length) {
        setVisiblePageIds((prevPageIds) => {
          const nextPageId = survey.pageOrder[nextPageIndex];
          return [
            ...prevPageIds.filter(
              (prevPageId: string) => prevPageId !== nextPageId
            ),
            nextPageId,
          ];
        });
      }
    },
    [survey.pageOrder]
  );

  const handleStart = React.useCallback(() => {
    handleNextPage(0);
  }, [handleNextPage]);

  const handlePrevPage = React.useCallback(() => {
    setVisiblePageIds((prevPageIds) => prevPageIds.slice(0, -1));
  }, []);

  const handleSubmit = React.useCallback(
    (feedback) => {
      const { timeZone } = NativeModules.DtSdk.getConstants();
      setSurveyFeedback(feedback);
      run({
        ...feedback,
        metadata,
        createdTime: fromJSToAPIDateStr(Date.now()),
        timeZone,
      });
    },
    [metadata, run]
  );

  return (
    <View style={styles.flexOne}>
      <Header
        title={survey.surveyName}
        onClose={onClose}
        themeColor={themeColor}
      />
      <View style={styles.flexOne}>
        <ScreenWrapper
          visible
          isOnTop={!endScreenvisible && visiblePageIds.length === 0}
        >
          <StartScreen onStart={handleStart} onClose={onClose} />
        </ScreenWrapper>
        {survey.pageOrder.map((pageId: string, pageIndex: number) => {
          return (
            <ScreenWrapper
              key={pageId}
              visible={visiblePageIds.includes(pageId)}
              isOnTop={visiblePageIds[visiblePageIds.length - 1] === pageId}
            >
              <SurveyScreenLayout
                survey={survey}
                pageIndex={pageIndex}
                onClose={onClose}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                onSubmit={handleSubmit}
              />
            </ScreenWrapper>
          );
        })}
        <ScreenWrapper visible={endScreenvisible} isOnTop={endScreenvisible}>
          <EndScreen error={error} surveyFeedback={surveyFeedback} />
        </ScreenWrapper>
      </View>
      <ActivityIndicatorMask loading={loading} />
    </View>
  );
};

type SurveyStackProps = {
  survey: Survey;
};

const SurveyStack: React.FunctionComponent<SurveyStackProps> = () => {
  const { survey, onClose } = useSurveyContext();
  // check if survey data is valid
  if (
    noData(survey.pages) ||
    noData(survey.surveyProperty) ||
    noData(survey.surveyStartDate) ||
    noData(survey.surveyEndDate)
  ) {
    // need to render placeholder
    return (
      <FakeScreen onClose={onClose}>
        <PlaceholderScreen
          imageType={PlaceholderImageTypes.ProgramUnavailable}
          message={i18n.t('start-survey:placeholder-message')}
        />
      </FakeScreen>
    );
  }
  return <Stack survey={survey} />;
};

export default SurveyStack;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});
