import * as React from 'react';
import { StatusBar } from 'react-native';
import { useTheme, COLOR_SCHEMES } from '@dropthought/react-native-ui';
import { useSurvey } from './contexts/survey';
import SurveyStackNavigator from './navigation/SurveyStack';

const SurveyStackContainer = props => {
  const {
    colorScheme
  } = useTheme();
  const survey = useSurvey();
  const themeColor = survey.surveyProperty.hexCode;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatusBar, {
    backgroundColor: themeColor,
    barStyle: colorScheme === COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
  }), /*#__PURE__*/React.createElement(SurveyStackNavigator, props));
};

export default SurveyStackContainer;
//# sourceMappingURL=SurveyStackContainer.js.map