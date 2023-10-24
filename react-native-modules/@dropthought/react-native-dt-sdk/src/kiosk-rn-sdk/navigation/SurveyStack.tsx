import React, { useCallback, useState } from 'react';
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
import { uploadPicture } from '../../lib/UploadPicture';
import type { ImageFormData } from '../../lib/UploadFileAPI';

type StackProps = {
  preview: boolean;
};

const noData = (a: any) => isNil(a) || isEmpty(a);

const Stack: React.FunctionComponent<StackProps> = ({ preview }) => {
  const { survey, onClose } = useSurveyContext();
  const themeColor = survey.surveyProperty.hexCode;
  const [visiblePageIds, setVisiblePageIds] = useState([]);
  const [endScreenvisible, setEndScreenvisible] = useState(false);
  const [surveyFeedback, setSurveyFeedback] = useState(undefined);
  const [error, setError] = useState<Error | undefined>();
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

  const handleNextPage = useCallback(
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

  const handleStart = useCallback(() => {
    handleNextPage(0);
  }, [handleNextPage]);

  const handlePrevPage = useCallback(() => {
    setVisiblePageIds((prevPageIds) => prevPageIds.slice(0, -1));
  }, []);

  const handleSubmit = useCallback(
    (feedback) => {
      if (preview) {
        setEndScreenvisible(true);
      } else {
        const { timeZone } = NativeModules.DtSdk.getConstants();
        setSurveyFeedback(feedback);
        run({
          ...feedback,
          metadata,
          createdTime: fromJSToAPIDateStr(Date.now()),
          timeZone,
        });
      }
    },
    [metadata, preview, run]
  );

  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (file: ImageFormData) => {
    if (file) {
      setIsUploading(true);
      try {
        const { url } = await uploadPicture(file);
        setIsUploading(false);
        return url;
      } catch (reason) {
        setIsUploading(false);
        return undefined;
      }
    } else {
      return undefined;
    }
  };

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
                onUpload={handleUpload}
                isUploading={isUploading}
              />
            </ScreenWrapper>
          );
        })}
        <ScreenWrapper visible={endScreenvisible} isOnTop={endScreenvisible}>
          <EndScreen
            error={error}
            surveyFeedback={surveyFeedback}
            onClose={onClose}
          />
        </ScreenWrapper>
      </View>
      <ActivityIndicatorMask loading={loading} />
    </View>
  );
};

type SurveyStackProps = {
  preview: boolean;
};

const SurveyStack: React.FunctionComponent<SurveyStackProps> = ({
  preview,
}) => {
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
  return <Stack preview={preview} />;
};

export default SurveyStack;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});
