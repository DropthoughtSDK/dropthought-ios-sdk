import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SurveyContextProvider } from './contexts/survey/SurveyContext';
import { CustomPropsContextProvider } from './contexts/custom-props/CustomPropsContext';
import SurveyStackContainer from './SurveyStackContainer';
import { FeedbackProvider } from '@dropthought/react-native-ui/src/contexts/feedback/FeedbackProvider';

/**
 * @param {SDKEntryProps} props
 */
export default function SDKEntry(props) {
  return (
    <SafeAreaProvider>
      <FeedbackProvider>
        <CustomPropsContextProvider {...props}>
          <SurveyContextProvider {...props}>
            <SurveyStackContainer preview={props.preview} />
          </SurveyContextProvider>
        </CustomPropsContextProvider>
      </FeedbackProvider>
    </SafeAreaProvider>
  );
}

/**
 * @typedef {import('./SDKEntry').SDKEntryProps} SDKEntryProps
 */
