import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KioskProvider } from '@dropthought/react-native-ui';
import { SurveyContextProvider } from './contexts/survey';
import { CustomPropsContextProvider } from './contexts/custom-props';
import SurveyStackContainer from './SurveyStackContainer';
/** @typedef {"system" | "light" | "dark"} ThemeType */

/**
 * @typedef {object} SDKEntryOwnProps
 * @property {string} apiKey
 * @property {string} surveyId
 * @property {string=} defaultLanguage if not provided, default is "en"
 * @property {string=} baseURL if not provided, default is ...
 * @property {()=>void=} onClose when the close icon is pressed in the header
 * @property {ThemeType=} theme
 * @property {string=} fontColor
 * @property {string=} backgroundColor
 */

/**
 * @typedef {import('./contexts/custom-props').CustomProps & SDKEntryOwnProps} SDKEntryProps
 */

/**
 * @param {SDKEntryProps} props
 */

export default function SDKEntry({
  theme,
  fontColor,
  backgroundColor,
  ...props
}) {
  return /*#__PURE__*/React.createElement(SafeAreaProvider, null, /*#__PURE__*/React.createElement(KioskProvider, {
    theme: theme,
    fontColor: fontColor,
    backgroundColor: backgroundColor
  }, /*#__PURE__*/React.createElement(CustomPropsContextProvider, props, /*#__PURE__*/React.createElement(SurveyContextProvider, props, /*#__PURE__*/React.createElement(SurveyStackContainer, null)))));
}
//# sourceMappingURL=SDKEntry.js.map