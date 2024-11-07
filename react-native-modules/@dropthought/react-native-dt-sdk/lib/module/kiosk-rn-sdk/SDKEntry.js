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
  return /*#__PURE__*/React.createElement(SafeAreaProvider, null, /*#__PURE__*/React.createElement(FeedbackProvider, null, /*#__PURE__*/React.createElement(CustomPropsContextProvider, props, /*#__PURE__*/React.createElement(SurveyContextProvider, props, /*#__PURE__*/React.createElement(SurveyStackContainer, {
    preview: props.preview
  })))));
}

/**
 * @typedef {import('./SDKEntry').SDKEntryProps} SDKEntryProps
 */
//# sourceMappingURL=SDKEntry.js.map