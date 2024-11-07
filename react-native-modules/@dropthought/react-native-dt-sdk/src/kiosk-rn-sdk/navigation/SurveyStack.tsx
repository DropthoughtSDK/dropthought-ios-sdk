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
import type { SurveyFeedback } from '@dropthought/react-native-ui';
import type { QuestionType } from '@dropthought/react-native-ui';
import { useAsync } from 'react-async';
// @ts-ignore
import { useMetadata } from '../contexts/custom-props/CustomPropsContext';
// @ts-ignore
import StartScreen from '../screens/StartScreen';
// @ts-ignore
import EndScreen from '../screens/EndScreen';
// @ts-ignore
import ErrorHintScreen from '../screens/ErrorHintScreen';
// @ts-ignore
import { useSurveyContext } from '../contexts/survey/SurveyContext';
// @ts-ignore
import { submitFeedback, finalizeSubmitedFeedback } from '../../lib/Feedback';
import ScreenWrapper from './ScreenWrapper';
// @ts-ignore
import Header from './Header';
// @ts-ignore
import { fromJSToAPIDateStr } from '../../lib/DateTimerParser';
// @ts-ignore
import { uploadFile } from '../../lib/UploadFile';
// @ts-ignore
import type { FormData } from '../../lib/UploadFileAPI';
import type { AxiosRequestConfig } from 'axios';

// @ts-ignore
import { postPollChoice } from '../../lib/Poll';

type StackProps = {
  preview: boolean;
};

type PollChoiceData = {
  questionId: string;
  choice?: string;
  isOther: boolean;
};

const noData = (a: any) => isNil(a) || isEmpty(a);

const Stack: React.FunctionComponent<StackProps> = ({ preview }) => {
  const { survey, onClose } = useSurveyContext();
  const themeColor = survey.surveyProperty.hexCode;
  const [visiblePageIds, setVisiblePageIds] = useState<string[]>([]);
  const [endScreenvisible, setEndScreenvisible] = useState(false);
  const [surveyFeedback, setSurveyFeedback] = useState<
    SurveyFeedback | undefined
  >(undefined);
  const [error, setError] = useState<Error | undefined>();
  const metadata = useMetadata();
  const { run, isPending: loading } = useAsync({
    // @ts-ignore
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
        // @ts-ignore
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
    (feedback: SurveyFeedback) => {
      if (preview) {
        setEndScreenvisible(true);
      } else {
        const { timeZone } = NativeModules.DtSdk.getConstants();
        const finalFeedbacks = finalizeSubmitedFeedback(
          feedback.feedbacks,
          survey
        );

        feedback.feedbacks = finalFeedbacks;
        setSurveyFeedback(feedback);
        run({
          ...feedback,
          metadata,
          createdTime: fromJSToAPIDateStr(Date.now()),
          timeZone,
        });
      }
    },
    [metadata, preview, run, survey]
  );

  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (
    file: FormData,
    questionType: QuestionType,
    requestConfig?: AxiosRequestConfig
  ) => {
    if (file) {
      setIsUploading(true);
      try {
        const { url } = await uploadFile(file, questionType, requestConfig);
        setIsUploading(false);
        return url;
      } catch (reason) {
        setIsUploading(false);
        return reason;
      }
    } else {
      return undefined;
    }
  };

  const [isPostingPollChoice, setIsPostingPollChoice] = useState(false);
  const handlePostingPollChoice = async (data: PollChoiceData) => {
    setIsPostingPollChoice(true);
    try {
      const response = await postPollChoice({
        programToken: survey.token,
        ...data,
      });
      setIsPostingPollChoice(false);
      return response.result;
    } catch (reason) {
      setIsPostingPollChoice(false);
      return reason;
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
          rtl={survey.language === 'ar'}
        >
          <StartScreen onStart={handleStart} onClose={onClose} />
        </ScreenWrapper>
        {survey.pageOrder.map((pageId: string, pageIndex: number) => {
          return (
            <ScreenWrapper
              key={pageId}
              visible={visiblePageIds.includes(pageId)}
              isOnTop={visiblePageIds[visiblePageIds.length - 1] === pageId}
              rtl={survey.language === 'ar'}
            >
              <SurveyScreenLayout
                // @ts-ignore
                survey={survey}
                pageIndex={pageIndex}
                onClose={onClose}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                onSubmit={handleSubmit}
                onUpload={handleUpload}
                isUploading={isUploading}
                onPostPollChoice={handlePostingPollChoice}
                isPostingPollChoice={isPostingPollChoice}
                preview={preview}
              />
            </ScreenWrapper>
          );
        })}
        <ScreenWrapper
          visible={endScreenvisible}
          isOnTop={endScreenvisible}
          rtl={survey.language === 'ar'}
        >
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
      <ErrorHintScreen onClose={onClose}>
        <PlaceholderScreen
          imageType={PlaceholderImageTypes.ProgramUnavailable}
          message={i18n.t('start-survey:placeholder-message')}
        />
      </ErrorHintScreen>
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
