import * as React from 'react';
import { StatusBar } from 'react-native';
import { useTheme, COLOR_SCHEMES } from '@dropthought/react-native-ui/src';
import { useSurvey } from './contexts/survey';
import SurveyStackNavigator from './navigation/SurveyStack';

/**
 * @param {{preview: boolean}} param0
 */
const SurveyStackContainer = ({
  preview = false
}) => {
  const {
    colorScheme
  } = useTheme();
  const survey = useSurvey();
  const themeColor = survey.surveyProperty.hexCode;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatusBar, {
    backgroundColor: themeColor,
    barStyle: colorScheme === COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
  }), /*#__PURE__*/React.createElement(SurveyStackNavigator, {
    preview: preview
  }));
};
export default SurveyStackContainer;
//# sourceMappingURL=SurveyStackContainer.js.map